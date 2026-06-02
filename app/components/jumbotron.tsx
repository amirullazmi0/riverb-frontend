import BrandLogo from "@/app/components/brand-logo";

export default function Jumbotron() {
     return (
          <section id="home" className="relative min-h-screen overflow-hidden bg-[#050505]">
               <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center opacity-75"
                    style={{ backgroundImage: "url('/images/riverb-jumbotron.jpeg')" }}
               />
               <div className="absolute inset-0 bg-linear-to-b from-[#050505]/30 via-[#071c2d]/35 to-[#050505]/80" />
               <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#050505] to-transparent" />

               <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-10 pt-28 text-white md:px-8 md:pb-14">
                    <div className="mb-8">
                         <BrandLogo />
                    </div>
                    <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#d7e6f5]">
                         <span className="h-px w-10 bg-[#ffca16]" />
                         band profile
                    </div>
                    <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.88] tracking-normal md:text-8xl lg:text-9xl">
                         River runs loud
                    </h1>
                    <div className="mt-8 grid gap-8 border-t border-white/25 pt-6 md:grid-cols-[1.2fr_0.8fr]">
                         <p className="max-w-2xl text-base leading-7 text-[#d7e6f5] md:text-lg">
                              riverb.id is a band profile built around honest live energy, city-bred
                              stories, and songs made to move with the crowd.
                         </p>
                         <div className="flex flex-wrap items-center gap-3 md:justify-end">
                              <a
                                   className="rounded-full bg-[#ffca16] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:bg-white"
                                   href="#releases"
                              >
                                   Listen now
                              </a>
                              <a
                                   className="rounded-full border border-white/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-white hover:text-[#050505]"
                                   href="#profile"
                              >
                                   Band profile
                              </a>
                         </div>
                    </div>
               </div>
          </section>
     );
}
