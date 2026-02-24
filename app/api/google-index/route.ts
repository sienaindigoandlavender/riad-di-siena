import { NextRequest, NextResponse } from "next/server";

/**
 * Google Indexing API for Riad di Siena
 * Quota: 200 URL notifications per day
 *
 * Env vars needed:
 *   GOOGLE_INDEXING_CLIENT_EMAIL
 *   GOOGLE_INDEXING_PRIVATE_KEY
 *   GOOGLE_INDEX_SECRET
 *
 * Usage:
 *   GET  /api/google-index         → preview URLs
 *   POST /api/google-index         → submit live pages
 *   POST ?mode=redirects           → submit old WordPress URLs
 *   POST ?mode=all                 → both
 */

const BASE_URL = "https://www.riaddisiena.com";
const GOOGLE_INDEXING_ENDPOINT =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

const STATIC_PAGES = [
  "",
  "/rooms",
  "/the-riad",
  "/the-douaria",
  "/journeys",
  "/contact",
  "/the-kasbah",
  "/the-desert-camp",
  "/beyond-the-walls",
  "/directions",
  "/the-farm",
  "/philosophy",
  "/amenities",
  "/about",
  "/faq",
  "/house-rules",
  "/booking-conditions",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/intellectual-property",
];

const REDIRECT_PATHS = [
  "/jewel-box",
  "/joy",
  "/tresor-cache",
  "/our-philosophy",
  "/about-the-riad",
  "/spanish-the-annex",
  "/terms-and-conditions",
  "/it/guide",
];

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY"
    );
  }

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: GOOGLE_TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${unsignedToken}.${signature}`;

  const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function submitUrl(
  accessToken: string,
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<{ url: string; success: boolean; status?: number; error?: string }> {
  try {
    const res = await fetch(GOOGLE_INDEXING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, type }),
    });

    if (res.ok) {
      return { url, success: true, status: res.status };
    }

    const errText = await res.text();
    return { url, success: false, status: res.status, error: errText };
  } catch (e) {
    return {
      url,
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export async function GET() {
  const liveUrls = STATIC_PAGES.map((p) => `${BASE_URL}${p}`);
  const redirectUrls = REDIRECT_PATHS.map((p) => `${BASE_URL}${p}`);

  return NextResponse.json({
    status: "ready",
    note: "POST to submit. ?mode=live (default), ?mode=redirects, ?mode=all",
    quota: "200 URL notifications per day",
    counts: {
      live: liveUrls.length,
      redirects: redirectUrls.length,
      total: liveUrls.length + redirectUrls.length,
    },
    liveUrls,
    redirectUrls,
  });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.GOOGLE_INDEX_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "live";
  const limit = parseInt(searchParams.get("limit") || "200", 10);

  let body: { urls?: string[]; type?: string } = {};
  try {
    body = await request.json().catch(() => ({}));
  } catch {
    body = {};
  }

  const notificationType: "URL_UPDATED" | "URL_DELETED" =
    body.type === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED";

  let urlsToSubmit: string[];

  if (body.urls && Array.isArray(body.urls) && body.urls.length > 0) {
    urlsToSubmit = body.urls;
  } else {
    const liveUrls = STATIC_PAGES.map((p) => `${BASE_URL}${p}`);
    const redirectUrls = REDIRECT_PATHS.map((p) => `${BASE_URL}${p}`);

    switch (mode) {
      case "redirects":
        urlsToSubmit = redirectUrls;
        break;
      case "all":
        urlsToSubmit = [...liveUrls, ...redirectUrls];
        break;
      case "live":
      default:
        urlsToSubmit = liveUrls;
        break;
    }
  }

  const cappedUrls = urlsToSubmit.slice(0, Math.min(limit, 200));

  let accessToken: string;
  try {
    accessToken = await getAccessToken();
  } catch (e) {
    return NextResponse.json(
      {
        error: "Failed to authenticate with Google",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }

  const results: Awaited<ReturnType<typeof submitUrl>>[] = [];
  let successCount = 0;
  let failCount = 0;
  let quotaExceeded = false;

  for (const url of cappedUrls) {
    if (quotaExceeded) break;

    const result = await submitUrl(accessToken, url, notificationType);
    results.push(result);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
      if (result.status === 429) {
        quotaExceeded = true;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return NextResponse.json({
    success: !quotaExceeded,
    mode,
    type: notificationType,
    submitted: successCount,
    failed: failCount,
    quotaExceeded,
    totalAvailable: urlsToSubmit.length,
    capped: cappedUrls.length,
    results,
  });
}
