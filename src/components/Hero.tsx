import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Spotlight, GridBackground } from "@/components/ui/spotlight";

const Hero = () => {
  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black/[0.96]">
      {/* New Spotlight and Grid Background */}
      <GridBackground />
      <Spotlight />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center space-y-12 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-400 tracking-tight">
              Hi, I'm{" "}
              <span className="gradient-text drop-shadow-2xl">
                Dhanush
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
              Full-Stack & AI Developer passionate about creating 
              <span className="text-primary font-medium"> amazing digital experiences</span> with AI
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="group px-8 py-4 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl text-lg text-primary-foreground font-semibold hover:scale-105 transition-all duration-300 hover:shadow-primary/20 hover:bg-primary/20 cursor-default">
              <span className="relative">
                Winner in oTTomator Live Agent Studio Hackathon
                <span className="absolute -inset-1 bg-primary/20 blur-sm -z-10 group-hover:bg-primary/30 transition-all duration-300"></span>
              </span>
              <span className="text-2xl animate-float">🏆</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-50">
            <Button asChild variant="premium" size="lg" className="min-w-[200px] font-bold">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="glass" size="lg" className="min-w-[200px] font-bold">
              <a href="/Resume.pdf" download>Download CV</a>
            </Button>
          </div>
          
          <div className="pt-12">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium tracking-wider uppercase">Explore</span>
              <ArrowDown className="w-6 h-6 animate-bounce text-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
