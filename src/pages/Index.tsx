
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/MobileNavigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { Home, User, Briefcase, FileText } from "lucide-react";

const Index = () => {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Skills', url: '#skills', icon: User },
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
