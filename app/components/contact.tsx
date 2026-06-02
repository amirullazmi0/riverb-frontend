export default function Contact() {
  return (
    <footer id="contact" className="bg-[#d7e6f5] text-[#050505]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0c70b8]">
            Contact
          </p>
          <h2 className="mt-5 text-5xl font-black uppercase leading-none md:text-7xl">
            Book
            <br />
            riverb.id
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-xl font-semibold leading-8">
            For bookings, collaborations, press, and live session inquiries.
          </p>
          <div className="mt-8 grid gap-4 text-sm uppercase tracking-[0.18em]">
            <a className="font-bold underline underline-offset-4" href="mailto:booking@riverb.id">
              booking@riverb.id
            </a>
            <a className="font-bold underline underline-offset-4" href="https://instagram.com/riverb.id">
              instagram.com/riverb.id
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#050505]/20 px-5 py-5 text-center text-xs uppercase tracking-[0.24em] md:px-8">
        riverb.id / river runs loud
      </div>
    </footer>
  );
}
