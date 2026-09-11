import { NextRequest, NextResponse } from "next/server";
import { fetchAndParseIcal } from "@/lib/ical";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// Kept for backward-compat / direct feed inspection.
// The booking modal now uses /api/availability (which merges all channels
// server-side), but this endpoint still serves a single parsed feed on demand.
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "No URL provided", bookedDates: [], debug: { message: "Missing url parameter" } },
      { status: 400 }
    );
  }

  const { bookedDates, error } = await fetchAndParseIcal(url);

  return NextResponse.json({
    bookedDates,
    error,
    debug: {
      parsedBookings: bookedDates.length,
      source: url.includes("airbnb") ? "airbnb" : url.includes("booking") ? "booking.com" : "unknown",
    },
  });
}
