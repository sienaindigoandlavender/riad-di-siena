import { NextResponse } from "next/server";
import {
  getTableData,
  getAllSettings,
  convertDriveUrl,
} from "@/lib/supabase";
import { getLegalPageContent, getNexusContentSites } from "@/lib/nexus";

export const revalidate = 0;

// ============================================================
// Table mapping: URL slug → Supabase table name
// ============================================================
const TABLE_MAP: Record<string, string> = {
  "amenities": "amenities",
  "amenities-hero": "amenities_hero",
  "beyond-the-walls": "beyond_the_walls",
  "beyond-the-walls-hero": "beyond_the_walls_hero",
  "booking-conditions": "booking_conditions",
  "desert-content": "desert_content",
  "desert-gallery": "desert_gallery",
  "desert-hero": "desert_hero",
  "desert-tents": "desert_tents",
  "directions": "directions",
  "directions-settings": "directions_settings",
  "disclaimer": "disclaimer",
  "douaria-content": "douaria_content",
  "douaria-gallery": "douaria_gallery",
  "douaria-hero": "douaria_hero",
  "douaria-rooms": "douaria_rooms",
  "faq": "faq",
  "farm-content": "farm_content",
  "farm-hero": "farm_hero",
  "farm-produce": "farm_produce",
  "home": "home",
  "house-rules": "house_rules",
  "journeys": "journeys_page",
  "kasbah-content": "kasbah_content",
  "kasbah-experience": "kasbah_experience",
  "kasbah-gallery": "kasbah_gallery",
  "kasbah-hero": "kasbah_hero",
  "philosophy": "philosophy",
  "privacy": "privacy_policy",
  "rooms": "rooms",
  "rooms-gallery": "rooms_gallery",
  "rooms-hero": "rooms_hero",
  "settings": "settings",
  "terms": "terms",
  "testimonials": "testimonials",
  "the-riad": "the_riad",
  // Nexus sheets (still on Google Sheets)
  "nexus-footer": "__nexus__",
  "nexus-legal": "__nexus__",
};

// Fields containing Google Drive image URLs that need conversion
const IMAGE_FIELDS = ["image_url"];

function processImageUrls(obj: Record<string, any>): Record<string, any> {
  const processed = { ...obj };
  for (const field of IMAGE_FIELDS) {
    if (processed[field]) {
      processed[field] = convertDriveUrl(processed[field]);
    }
  }
  return processed;
}

/**
 * Remap Supabase snake_case keys to the PascalCase keys the frontend expects.
 * The frontend fetches `/api/sheets/rooms` and reads `Room_ID`, `Image_URL`, etc.
 */
function remapKeys(obj: Record<string, any>): Record<string, any> {
  const MAP: Record<string, string> = {
    room_id: "Room_ID", name: "Name", description: "Description",
    price_eur: "Price_EUR", features: "Features", image_url: "Image_URL",
    widget_id: "Widget_ID", ical_url: "iCal_URL", order: "Order",
    bookable: "Bookable", section: "Section", title: "Title",
    subtitle: "Subtitle", body: "Body", button_text: "Button_Text",
    button_link: "Button_Link", content: "Content", question: "Question",
    answer: "Answer", amenity_id: "Amenity_ID",
    testimonial_id: "Testimonial_ID", guest_name: "Guest_Name",
    quote: "Quote", source: "Source", date: "Date", featured: "Featured",
    property_id: "Property_ID", tagline: "Tagline", link: "Link",
    intro: "Intro", location: "Location", paragraph: "Paragraph",
    package_id: "Package_ID", extra_person_eur: "Extra_Person_EUR",
    duration: "Duration", includes: "Includes", min_guests: "Min_Guests",
    tent_id: "Tent_ID", level: "Level", produce_id: "Produce_ID",
    season: "Season", image_id: "Image_ID", caption: "Caption",
    step_number: "Step_Number", building: "Building",
    caption_fr: "Caption_FR", caption_es: "Caption_ES",
    caption_it: "Caption_IT", caption_pt: "Caption_PT",
    caption_ar: "Caption_AR",
    key: "Key", value: "Value",
    en: "EN", fr: "FR", es: "ES", it: "IT", pt: "PT", ar: "AR",
    category: "Category", answer_fr: "Answer_FR", answer_es: "Answer_ES",
    answer_it: "Answer_IT", answer_pt: "Answer_PT", answer_ar: "Answer_AR",
    keywords: "Keywords",
    booking_id: "Booking_ID", timestamp: "Timestamp", email: "Email",
    phone: "Phone", check_in: "Check_In", check_out: "Check_Out",
    guests: "Guests", room_preference: "Room_Preference",
    message: "Message", status: "Status",
  };

  const result: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === "id") continue; // Skip Supabase auto-increment id
    const mappedKey = MAP[k] || k;
    result[mappedKey] = v;
  }
  return result;
}

function toFrontend(obj: Record<string, any>): Record<string, any> {
  return remapKeys(processImageUrls(obj));
}

// ============================================================
// Route handler
// ============================================================

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sheet: string }> }
) {
  try {
    const { sheet } = await params;
    const table = TABLE_MAP[sheet];

    if (!table) {
      return NextResponse.json({ error: "Unknown sheet" }, { status: 404 });
    }

    // Nexus sheets still go through Google Sheets
    if (sheet.startsWith("nexus-")) {
      return handleNexusSheet(request, sheet);
    }

    // Special handlers for sheets with custom response shapes
    switch (sheet) {
      case "settings":
        return handleSettings();
      case "rooms":
        return handleRooms("rooms");
      case "douaria-rooms":
        return handleRooms("douaria_rooms");
      case "the-riad":
        return handleSectioned("the_riad");
      case "home":
        return handleSectioned("home");
      case "philosophy":
        return handleSectioned("philosophy");
      case "directions":
        return handleDirections();
      default:
        return handleGeneric(sheet, table);
    }
  } catch (error: any) {
    console.error("API sheets error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ============================================================
// Handlers — each returns the same JSON shape as the old Sheets version
// ============================================================

async function handleGeneric(sheet: string, table: string) {
  const data = await getTableData(table, "order");
  const processed = data.map(toFrontend);

  // Return first item for "hero" sheets (single-object response)
  if (sheet.includes("hero")) {
    return NextResponse.json(processed[0] || {});
  }

  return NextResponse.json(processed);
}

async function handleSettings() {
  // Frontend expects flat { key: value } object
  const settings = await getAllSettings();
  return NextResponse.json(settings);
}

async function handleSectioned(table: string) {
  // Frontend expects { sectionName: { Section, Title, ... }, ... }
  const data = await getTableData(table, "order");
  const sections: Record<string, any> = {};
  data.forEach((item: any) => {
    if (item.section) {
      sections[item.section] = toFrontend(item);
    }
  });
  return NextResponse.json(sections);
}

async function handleRooms(table: string) {
  const data = await getTableData(table, "order");
  const processed = data.map((room: any) => {
    const mapped = toFrontend(room);
    // Split features string into array (frontend expects this)
    mapped.features = room.features
      ? room.features.split(",").map((f: string) => f.trim())
      : [];
    return mapped;
  });
  return NextResponse.json(processed);
}

async function handleDirections() {
  const data = await getTableData("directions");
  const processed = data.map(toFrontend);

  // Group by building (frontend expects { main: [...], annex: [...] })
  const byBuilding: Record<string, any[]> = {};
  processed.forEach((d: any) => {
    const building = d.Building || "main";
    if (!byBuilding[building]) byBuilding[building] = [];
    byBuilding[building].push(d);
  });

  Object.keys(byBuilding).forEach((building) => {
    byBuilding[building].sort(
      (a: any, b: any) =>
        parseInt(a.Step_Number || "0") - parseInt(b.Step_Number || "0")
    );
  });

  return NextResponse.json(byBuilding);
}

// ============================================================
// Nexus handlers (Supabase)
// ============================================================

async function handleNexusSheet(request: Request, sheet: string) {
  if (sheet === "nexus-footer") {
    // Content sites for the footer network
    const contentSites = await getNexusContentSites();
    return NextResponse.json({
      success: true,
      contentSites: contentSites.map((s) => ({
        label: s.site_label,
        url: s.site_url,
      })),
    });
  }

  if (sheet === "nexus-legal") {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json({ error: "page parameter required" }, { status: 400 });
    }

    const pageContent = await getLegalPageContent(page);

    if (pageContent.sections.length === 0) {
      return NextResponse.json({ error: "Page not found" });
    }

    return NextResponse.json(pageContent);
  }

  return NextResponse.json({ error: "Unknown Nexus sheet" }, { status: 404 });
}
