import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

const MAKE_WEBHOOK_URL = process.env.MAKE_BOOKING_WEBHOOK_URL || "";

export async function POST(request: Request) {
  try {
    // Create ops client at request time (env vars not available at build time)
    const opsUrl = process.env.OPS_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const opsKey = process.env.OPS_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const opsClient = createClient(opsUrl, opsKey);

    const body = await request.json();

    const bookingId = `RDS-${Date.now()}`;
    const now = new Date().toISOString();

    const {
      firstName, lastName, email, phone, message, guests,
      total, room, roomId, checkIn, checkOut, nights,
      property, tent, tentId, tentLevel, experience, experienceId,
      paypalOrderId, paypalStatus,
      name, roomPreference, itemName, totalEUR, paypalTransactionId,
      adults, children,
    } = body;

    const guestFirstName = firstName || name?.split(" ")[0] || "";
    const guestLastName = lastName || name?.split(" ").slice(1).join(" ") || "";
    const propertyName = property || "Riad di Siena";
    const accommodationName = room || tent || experience || roomPreference || itemName || "";
    const finalTotal = total || totalEUR || 0;
    const finalPaypalId = paypalOrderId || paypalTransactionId || "";
    const finalPaypalStatus = paypalStatus || (paypalTransactionId ? "COMPLETED" : "PENDING");

    // Only store confirmed payments
    if (finalPaypalStatus !== "COMPLETED") {
      return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 });
    }

    // ── 1. INSERT into ops Supabase master_guests ─────────────────
    const { error: dbError } = await opsClient.from("master_guests").insert({
      booking_id: bookingId,
      source: "Website",
      status: "confirmed",
      first_name: guestFirstName,
      last_name: guestLastName,
      email: email || "",
      phone: phone || "",
      property: propertyName,
      room: accommodationName,
      check_in: checkIn || null,
      check_out: checkOut || null,
      nights: parseInt(String(nights)) || null,
      guests: parseInt(String(guests || adults)) || null,
      adults: parseInt(String(adults || guests)) || null,
      children: parseInt(String(children)) || 0,
      total_eur: parseFloat(String(finalTotal)) || null,
      special_requests: [
        message || "",
        finalPaypalId ? `PayPal: ${finalPaypalId}` : "",
      ].filter(Boolean).join(" | "),
      created_at: now,
      updated_at: now,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
      return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
    }

    // ── 2. POST to Make.com webhook (triggers confirmation emails) ──
    if (MAKE_WEBHOOK_URL) {
      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booking_id: bookingId,
            source: "Website",
            status: "confirmed",
            first_name: guestFirstName,
            last_name: guestLastName,
            email: email || "",
            phone: phone || "",
            property: propertyName,
            room: accommodationName,
            check_in: checkIn || "",
            check_out: checkOut || "",
            nights: nights || 1,
            guests: guests || adults || 1,
            total_eur: finalTotal,
            special_requests: message || "",
            paypal_order_id: finalPaypalId,
            created_at: now,
          }),
        });
      } catch (webhookErr) {
        console.error("Make.com webhook failed (non-blocking):", webhookErr);
      }
    }

    // ── 3. Return success ──────────────────────────────────────────
    return NextResponse.json({ success: true, bookingId });

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
