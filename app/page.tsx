import { site } from "@/lib/content";
import { publicFileExists } from "@/lib/assets";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Showcase } from "@/components/Showcase";
import { Projects } from "@/components/Projects";
import { SecurityLab } from "@/components/SecurityLab";
import { Stack } from "@/components/Stack";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero hasCv={publicFileExists("Edwin-Safo-CV.pdf")} cvHref={site.cv} />
        <Marquee />
        <Showcase />
        <Projects />
        <SecurityLab />
        <Stack />
        <About />
        <Experience />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
