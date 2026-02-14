import { getList } from "@/lib/data";
import FAQClient from "./FAQClient";

export default async function FAQPage() {
  const faqItems = await getList("faq");

  // Generate FAQ Schema server-side so Google can see it
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item: any) => ({
      "@type": "Question",
      name: item.Question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.Answer,
      },
    })),
  };

  return (
    <>
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <FAQClient faqItems={faqItems} />
    </>
  );
}
