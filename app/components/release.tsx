import BandCarousel from "@/app/components/band-carousel";

const releases = [
     {
          title: "River Current",
          type: "Single",
          year: "2026",
     },
     {
          title: "North Bridge Session",
          type: "Live",
          year: "2025",
     },
     {
          title: "Late City Hymn",
          type: "EP",
          year: "2025",
     },
];

export default function Release() {
     return (
          <section id="profile" className="border-b border-[#050505]/20 bg-[#f5f7fb]">
               <div className="mx-auto grid max-w-7xl gap-0 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
                    <div className="border-b border-[#050505]/20 pb-8 md:border-b-0 md:border-r md:pr-10">
                         <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0c70b8]">
                              Profile
                         </p>
                         <h2 className="mt-5 text-4xl font-black uppercase leading-none text-[#050505] md:text-6xl">
                              RiverB
                              <br />
                              sounds
                         </h2>
                    </div>
                    <div className="pt-8 md:pl-10 md:pt-0">
                         <p className="max-w-3xl text-2xl font-semibold leading-tight text-[#050505] md:text-4xl">
                              A four-piece band shaping sharp, warm, and direct music from the
                              rhythm of the city.
                         </p>
                         <p className="mt-6 max-w-3xl text-base leading-8 text-[#4d5863]">
                              The site direction follows RiverB&apos;s mark: high-contrast black,
                              signal yellow, deep tunnel blues, and photography as the strongest
                              first signal.
                         </p>
                    </div>
               </div>

               <div id="releases" className="mx-auto max-w-7xl px-5 pb-0 md:px-8 md:pb-24">
                    <div className="border-y border-[#050505]/20 py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#050505]">
                         Latest releases
                    </div>
                    <div className="grid md:grid-cols-3">
                         {releases.map(release => (
                              <article
                                   className="border-b border-[#050505]/20 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                                   key={release.title}
                              >
                                   <p className="text-xs uppercase tracking-[0.2em] text-[#0c70b8]">
                                        {release.type} / {release.year}
                                   </p>
                                   <h3 className="mt-3 text-2xl font-black uppercase text-[#050505]">
                                        {release.title}
                                   </h3>
                                   <a
                                        className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#050505] underline decoration-[#ffca16] underline-offset-4"
                                        href="#contact"
                                   >
                                        Stream soon
                                   </a>
                              </article>
                         ))}
                    </div>

                    <div className="-mx-5 grid border-b border-[#050505]/20 border-t border-[#050505]/20 md:mx-0 md:grid-cols-2">
                         <div className="">
                              <BandCarousel />
                         </div>
                         <div className="relative aspect-square overflow-hidden bg-[#050505] text-[#c7c9cc]">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(12,112,184,0.38),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,202,22,0.16),transparent_28%)]" />
                              <div className="relative flex h-full w-full flex-col justify-evenly py-4">
                                   {["top", "middle", "bottom"].map((position, index) => (
                                        <div
                                             className={`overflow-hidden py-1 ${
                                                  index === 0
                                                       ? "-rotate-3"
                                                       : index === 1
                                                         ? "rotate-2"
                                                         : "-rotate-2"
                                             }`}
                                             key={position}
                                        >
                                             <div
                                                  className={`flex w-max -skew-x-12 gap-8 text-[5.4rem] font-black uppercase italic leading-[0.78] tracking-[-0.1em] text-[#c7c9cc] sm:text-[7rem] md:text-[8.5rem] lg:text-[10rem] ${
                                                       index === 1
                                                            ? "animate-[riverb-marquee-reverse_16s_linear_infinite]"
                                                            : "animate-[riverb-marquee_14s_linear_infinite]"
                                                  }`}
                                             >
                                                  <span>RIVERB</span>
                                                  <span>RIVERB</span>
                                                  <span>RIVERB</span>
                                                  <span>RIVERB</span>
                                                  <span>RIVERB</span>
                                                  <span>RIVERB</span>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
