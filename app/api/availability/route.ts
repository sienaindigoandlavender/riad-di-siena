import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchAndParseIcal, BookedRange } from "@/lib/ical";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Single source of truth for a room's availability.
 * Merges every channel that can block a date:
 *   1. Booking.com iCal feed   (rooms.ical_url / douaria_rooms.ical_url)
 *   2. Airbnb iCal feed        (rooms.ical_url_airbnb / douaria_rooms.ical_url_airbnb)
 *   3. Direct website bookings (master_guests)
 * Returns one deduplicated list of booked ranges.
 */
export async function GET(request: NextRequest) {
  const room = request.nextUrl.searchParams.get("room") || "";
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const allRanges: BookedRange[] = [];

  try {
    // 1 & 2. Look up this room's OTA feed URLs (both tables, by name)
    if (room) {
      const [riadRes, douariaRes] = await Promise.all([
        supabase.from("rooms").select("ical_url, ical_url_airbnb").eq("name", room).maybeSingle(),
        supabase.from("douaria_rooms").select("ical_url, ical_url_airbnb").eq("name", room).maybeSingle(),
      ]);

      const roomRow = riadRes.data || douariaRes.data;
      const feedUrls: string[] = [];
      if (roomRow?.ical_url) feedUrls.push(roomRow.ical_url);
      if (roomRow?.ical_url_airbnb) feedUrls.push(roomRow.ical_url_airbnb);

      const feedResults = await Promise.all(feedUrls.map((u) => fetchAndParseIcal(u)));
      for (const r of feedResults) {
        allRanges.push(...r.bookedDates);
      }
    }

    // 3. Direct website bookings from master_guests
    const today = new Date().toISOString().split("T")[0];
    let query = supabase
      .from("master_guests")
      .select("check_in, check_out, room")
      .gte("check_out", today)
      .not("status", "in", '("cancelled","blocked")');
    if (room) query = query.eq("room", room);

    const { data: directData, error: directError } = await query;
    if (directError) {
      console.error("Availability direct-booking query error:", directError.message);
    } else {
      for (const b of directData || []) {
        if (b.check_in && b.check_out) {
          allRanges.push({ start: b.check_in, end: b.check_out, summary: `Direct - ${b.room || ""}` });
        }
      }
    }

    const seen = new Set<string>();
    const bookedDates = allRanges.filter((r) => {
      const key = `${r.start}|${r.end}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json({ bookedDates });
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json({ bookedDates: allRanges });
  }
}
