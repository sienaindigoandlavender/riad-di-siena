import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBookingEmails } from "@/lib/email";

export const revalidate = 0;

export async function POST(request: Request) {
  try {
    // master_guests now lives in the same Supabase project
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();

    const bookingId = `RDS-${Date.now()}`;
    const now = new Date().toISOString();

    const {
      firstName, lastName, email, phone, message, guests,
      total, room, roomId, checkIn, checkOut, nights,
      property, tent, tentId, tentLevel, experience, experienceId,
      paypalOrderId, paypalStatus,
      name, roomPreference, itemName, totalEUR, paypalTransactionId,
      adults, children, philosophyAcknowledged, disclaimerAcknowledged,
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

    // ── 1. INSERT into master_guests ─────────────────
    const { error: dbError } = await supabase.from("master_guests").insert({
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
      philosophy_acknowledged: philosophyAcknowledged === true,
      disclaimer_acknowledged: disclaimerAcknowledged === true,
      created_at: now,
      updated_at: now,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
      return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
    }

    // ── 2. Send confirmation emails directly via Resend ─────────────
    // Guest confirmation + owner notification to happy@riaddisiena.com.
    // Booking is already saved; email failure is logged loudly but does not
    // lose the booking.
    let emailSent = false;
    let emailError: string | null = null;
    try {
      const emailResult = await sendBookingEmails({
        bookingId,
        firstName: guestFirstName,
        lastName: guestLastName,
        email: email || "",
        phone: phone || "",
        property: propertyName,
        room: accommodationName,
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        nights: parseInt(String(nights)) || 1,
        guests: parseInt(String(guests || adults)) || 1,
        total: parseFloat(String(finalTotal)) || 0,
        paypalOrderId: finalPaypalId,
        message: message || "",
      });
      const guestErr = (emailResult?.guest as { error?: unknown })?.error;
      const ownerErr = (emailResult?.owner as { error?: unknown })?.error;
      if (guestErr || ownerErr) {
        emailError = JSON.stringify({ guestErr, ownerErr });
        console.error("BOOKING EMAIL PARTIAL FAILURE:", bookingId, emailError);
      } else {
        emailSent = true;
      }
    } catch (mailErr) {
      emailError = mailErr instanceof Error ? mailErr.message : String(mailErr);
      console.error("BOOKING EMAIL FAILED — booking saved but NOT emailed:", bookingId, emailError);
    }

    // ── 3. Return success (booking saved) with email status ─────────
    return NextResponse.json({ success: true, bookingId, emailSent, emailError });

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
