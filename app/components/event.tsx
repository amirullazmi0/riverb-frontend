const events = [
     { date: "14 Jun", venue: "Jakarta Live Room", city: "Jakarta" },
     { date: "28 Jun", venue: "South City Session", city: "Tangerang" },
     { date: "12 Jul", venue: "Indie Weekend", city: "Bandung" },
];

export default function Event() {
     return (
          <section id="events" className="bg-[#050505] text-[#f5f7fb]">
               <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
                    <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
                         <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9ec9ec]">
                                   Shows
                              </p>
                              <h2 className="mt-5 text-4xl font-black uppercase leading-none md:text-6xl">
                                   Live
                                   <br />
                                   dates
                              </h2>
                         </div>
                         <div className="border-t border-white/20">
                              {events.map(event => (
                                   <div
                                        className="grid gap-3 border-b border-white/20 py-6 md:grid-cols-[120px_1fr_120px] md:items-center"
                                        key={`${event.date}-${event.venue}`}
                                   >
                                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffca16]">
                                             {event.date}
                                        </p>
                                        <p className="text-2xl font-semibold">{event.venue}</p>
                                        <p className="text-sm uppercase tracking-[0.18em] text-[#9ec9ec] md:text-right">
                                             {event.city}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
}
