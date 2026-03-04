import { NextResponse } from "next/server";
import { getTableData, insertRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rawBookings = await getTableData("bookings");
    
    const bookings = rawBookings.map((row: any) => {
      // If there's a booking_data column with JSON, parse it and merge
      if (row.booking_data) {
        try {
          const bookingData = JSON.parse(row.booking_data);
          return {
            Booking_ID: row.booking_id,
            Timestamp: row.timestamp,
            ...bookingData,
          };
        } catch {
          // Fall through to manual mapping
        }
      }
      
      return {
        Booking_ID: row.booking_id || row.Booking_ID,
        Timestamp: row.timestamp || row.Timestamp,
        firstName: row.first_name || row.firstName || "",
        lastName: row.last_name || row.lastName || "",
        email: row.email || row.Email || "",
        phone: row.phone || row.Phone || "",
        checkIn: row.check_in || row.checkIn || "",
        checkOut: row.check_out || row.checkOut || "",
        guests: row.guests || row.Guests || "",
        total: row.total || row.Total || "",
        paypalStatus: row.paypal_status || row.paypalStatus || row.status || "PENDING",
        paypalOrderId: row.paypal_order_id || row.paypalOrderId || "",
        room: row.room || row.Room || "",
        property: row.property || row.Property || "Riad di Siena",
        source: row.source || row.Source || "",
        notes: row.notes || row.Notes || "",
        // Also pass through the original message/room_preference for old-format bookings
        message: row.message || row.Message || "",
        name: row.name || row.Name || "",
        room_preference: row.room_preference || row.Room_Preference || "",
      };
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ bookings: [], error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const bookingData = {
      property: data.property || "",
      room: data.room || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      checkIn: data.checkIn || "",
      checkOut: data.checkOut || "",
      guests: data.guests || 1,
      total: data.total || 0,
      paypalStatus: data.paypalStatus || "COMPLETED",
      source: data.source || "manual",
      notes: data.notes || "",
    };

    const success = await insertRow("bookings", {
      booking_id: data.Booking_ID || `MANUAL-${Date.now()}`,
      timestamp: data.Timestamp || new Date().toISOString(),
      booking_data: JSON.stringify(bookingData),
    });

    if (success) {
      return NextResponse.json({ success: true, booking_id: data.Booking_ID });
    }
    return NextResponse.json({ error: "Failed to add booking" }, { status: 500 });
  } catch (error) {
    console.error("Failed to add booking:", error);
    return NextResponse.json({ error: "Failed to add booking" }, { status: 500 });
  }
}
