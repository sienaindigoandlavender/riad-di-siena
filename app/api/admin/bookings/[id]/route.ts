import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = ["confirmed", "pending", "cancelled", "blocked"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const bookingId = params.id;

    if (!bookingId) {
      return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }

    const updates: Record<string, any> = {};

    if (typeof body.status === "string") {
      const status = body.status.toLowerCase();
      if (!ALLOWED_STATUSES.includes(status as typeof ALLOWED_STATUSES[number])) {
        return NextResponse.json(
          { error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}` },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updatable fields provided" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("booking_id", bookingId)
      .select()
      .single();

    if (error) {
      // Row may have been migrated to master_guests — try that table too
      const { error: mgError } = await supabase
        .from("master_guests")
        .update(updates)
        .eq("booking_id", bookingId);

      if (mgError) {
        console.error("Supabase update failed in bookings and master_guests:", error.message, mgError.message);
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, source: "master_guests" });
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
