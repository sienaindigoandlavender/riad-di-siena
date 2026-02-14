import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  const room = request.nextUrl.searchParams.get("room") || "";

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get all confirmed/active bookings with check_in in the future or currently hosting
    const today = new Date().toISOString().split("T")[0];

    let query = supabase
      .from("master_guests")
      .select("check_in, check_out, room, property")
      .gte("check_out", today) // only future or current stays
      .not("status", "in", '("cancelled","blocked")'); // exclude cancelled

    // Filter by room if provided
    if (room) {
      query = query.eq("room", room);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Availability query error:", error.message);
      return NextResponse.json({ bookedDates: [] });
    }

    // Convert to same format as iCal: array of { start, end }
    const bookedDates = (data || [])
      .filter((b: { check_in: string | null; check_out: string | null }) => b.check_in && b.check_out)
      .map((b: { check_in: string; check_out: string; room: string | null }) => ({
        start: b.check_in,
        end: b.check_out,
        summary: `Website booking - ${b.room || ""}`,
      }));

    return NextResponse.json({ bookedDates });
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json({ bookedDates: [] });
  }
}
