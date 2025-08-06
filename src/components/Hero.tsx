import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Spotlight, GridBackground } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

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
      
      <div className="container mx-auto px-4 z-10 relative h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in max-w-2xl lg:max-w-none">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Hi, I'm{" "}
                <span className="gradient-text">
                  Dhanush
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-xl mx-auto lg:mx-0">
                Full-Stack & AI Developer passionate about creating amazing digital experiences with AI
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mb-4 lg:mb-6">
              <div className="px-4 lg:px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-2 shadow-md text-sm lg:text-base text-gray-200 font-medium"
                  style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.15)' }}>
                Winner in oTTomator Live Agent Studio Hackathon
                <span className="ml-2 text-lg">🏆</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center relative z-50">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg w-full sm:w-auto">
                <a href="#projects">View My Work</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg border-neutral-600 hover:border-primary text-neutral-300 hover:text-white w-full sm:w-auto">
                <a href="/Resume.pdf" download>Download CV</a>
              </Button>
            </div>
            <div className="pt-6 lg:pt-8 flex justify-center lg:justify-center">
              <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce text-neutral-400" />
            </div>
          </div>

          {/* Right content - 3D Robot - Desktop only */}
          <div className="hidden lg:block flex-1 relative h-[600px] w-full max-w-none">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
