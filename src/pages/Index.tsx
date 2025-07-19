
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/MobileNavigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { Home, User, Briefcase, FileText, Award } from "lucide-react";

const Index = () => {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Skills', url: '#skills', icon: User },
    { name: 'Certifications', url: '#certifications', icon: Award },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact', url: '#contact', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <NavBar items={navItems} />
      </div>
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="certifications">
          <Certifications />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <MobileNavigation />
      <PortfolioChatbot />
    </div>
  );
};

export default Index;
