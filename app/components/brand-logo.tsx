import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Image
      alt="RiverB"
      className={`block object-contain ${
        compact ? "h-9 w-auto" : "h-auto w-[min(78vw,720px)]"
      }`}
      height={3000}
      priority={!compact}
      src="/images/riverb-logo.png"
      width={3000}
    />
  );
}
