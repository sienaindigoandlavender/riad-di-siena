import Link from "next/link";

/**
 * The Kinfolk tile, ported from the Slow Morocco repo.
 * Portrait 3:4 image, small uppercase kicker, quiet title, sub-line.
 * (Cloudinary helper dropped — Riad images are direct Supabase URLs.)
 */
export default function KinfolkTile({
  href, image, kicker, title, sub, badge,
}: {
  href: string;
  image?: string | null;
  kicker?: string;
  title: string;
  sub?: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        )}
        {badge && (
          <div className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase text-[#0a0a0a]">
            {badge}
          </div>
        )}
      </div>
      {kicker && (
        <span className="text-[10px] text-[#0a0a0a]/55 tracking-[0.1em] uppercase block mb-1">
          {kicker}
        </span>
      )}
      <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors leading-snug">
        {title}
      </h3>
      {sub && <p className="text-[12px] text-[#0a0a0a]/55 mt-1 mb-0 leading-relaxed">{sub}</p>}
    </Link>
  );
}
