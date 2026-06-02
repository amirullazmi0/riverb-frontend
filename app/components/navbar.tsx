import BrandLogo from "@/app/components/brand-logo";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Releases", href: "#releases" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#050505]/85 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home">
          <BrandLogo compact />
        </a>
        <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] md:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-[#ffca16]" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <a
          className="rounded-full border border-white/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-[#ffca16] hover:text-[#050505]"
          href="#contact"
        >
          Booking
        </a>
      </nav>
    </header>
  );
}
