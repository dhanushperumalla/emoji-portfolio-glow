import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
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
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Hi, I'm{" "}
              <span className="gradient-text">
                Dhanush
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto">
              Full-Stack & AI Developer passionate about creating amazing digital experiences with AI
            </p>
          </div>
          <div className="flex justify-center mb-6">
          <div className="px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-2 shadow-md text-base text-gray-200 font-medium"
              style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.15)' }}>
            Winner in oTTomator Live Agent Studio Hackathon
            <span className="ml-2 text-lg">🏆</span>
          </div>
        </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-50">
            <ButtonColorful 
              label="View My Work"
              onClick={handleViewWorkClick}
              className="px-8 py-6 text-lg"
            />
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-neutral-600 hover:border-primary text-neutral-300 hover:text-white">
              <a href="/Resume.pdf" download>Download CV</a>
            </Button>
          </div>
          
          <div className="pt-8">
            <ArrowDown className="w-6 h-6 mx-auto animate-bounce text-neutral-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
