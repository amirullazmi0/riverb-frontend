import Contact from "@/app/components/contact";
import Event from "@/app/components/event";
import Jumbotron from "@/app/components/jumbotron";
import Navbar from "@/app/components/navbar";
import Release from "@/app/components/release";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <Jumbotron />
        <Release />
        <Event />
        <Contact />
      </main>
    </>
  );
}
