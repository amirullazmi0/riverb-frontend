type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span
      aria-label="RiverB"
      className={`inline-flex -skew-x-12 items-center bg-[#050505] px-3 py-1 font-black uppercase italic leading-none text-[#ffca16] shadow-[inset_8px_0_0_#ffca16] ${
        compact ? "text-xl tracking-[-0.08em]" : "text-4xl tracking-[-0.1em]"
      }`}
    >
      RIVERB
    </span>
  );
}
