import { NextResponse } from "next/server";
import { getTableData } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface TrainingItem {
  category: string;
  question: string;
  answer: string;
  answer_fr?: string;
  answer_es?: string;
  answer_it?: string;
  answer_pt?: string;
  answer_ar?: string;
  keywords: string;
  order: number;
}

interface ChatRequest {
  message: string;
  language?: string;
  history?: { role: string; content: string }[];
}

function getLocalizedAnswer(item: TrainingItem, language: string): string {
  switch (language) {
    case "fr": return item.answer_fr || item.answer;
    case "es": return item.answer_es || item.answer;
    case "it": return item.answer_it || item.answer;
    case "pt": return item.answer_pt || item.answer;
    case "ar": return item.answer_ar || item.answer;
    default: return item.answer;
  }
}

function findBestMatch(query: string, training: TrainingItem[]): TrainingItem | null {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  let bestMatch: TrainingItem | null = null;
  let bestScore = 0;

  for (const item of training) {
    let score = 0;
    
    if (item.keywords) {
      const keywords = item.keywords.toLowerCase().split(",").map(k => k.trim());
      for (const keyword of keywords) {
        if (queryLower.includes(keyword)) score += 3;
      }
    }
    
    if (item.question) {
      const questionWords = item.question.toLowerCase().split(/\s+/);
      for (const word of queryWords) {
        if (word.length > 2 && questionWords.some(qw => qw.includes(word) || word.includes(qw))) {
          score += 1;
        }
      }
    }
    
    if (item.category && queryLower.includes(item.category.toLowerCase())) {
      score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestScore >= 2 ? bestMatch : null;
}

export async function GET() {
  try {
    const training = await getTableData<TrainingItem>("chatbot_training", "order");
    return NextResponse.json({ training });
  } catch (error) {
    console.error("Error fetching chatbot training:", error);
    return NextResponse.json({ training: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { message, language = "en" }: ChatRequest = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const training = await getTableData<TrainingItem>("chatbot_training", "order");
    
    const greetingItem = training.find(t => t.category?.toLowerCase() === "greeting");
    
    const greetingWords = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "salaam", "bonjour", "hola", "ciao", "olá", "مرحبا", "السلام عليكم"];
    const isGreeting = greetingWords.some(g => message.toLowerCase().trim().startsWith(g));
    
    if (isGreeting && greetingItem) {
      return NextResponse.json({ 
        response: getLocalizedAnswer(greetingItem, language),
        category: "greeting"
      });
    }

    const match = findBestMatch(message, training.filter(t => t.category?.toLowerCase() !== "system"));
    
    if (match) {
      return NextResponse.json({ 
        response: getLocalizedAnswer(match, language),
        category: match.category,
        matched_question: match.question
      });
    }

    const fallbackItem = training.find(t => t.category?.toLowerCase() === "fallback");
    const fallbackResponse = fallbackItem 
      ? getLocalizedAnswer(fallbackItem, language)
      : "I'd be happy to help you with that. For specific inquiries about rooms, availability, or bookings, please reach out to us directly through our contact page or WhatsApp. Is there anything else about Riad di Siena I can help you with?";

    return NextResponse.json({ 
      response: fallbackResponse,
      category: "fallback"
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ 
      response: "I apologize, but I'm having trouble right now. Please try again or contact us directly.",
      error: true 
    }, { status: 500 });
  }
}
