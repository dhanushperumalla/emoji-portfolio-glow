
import React, { useState, useEffect } from 'react';
import { InteractiveMenu, InteractiveMenuItem } from "@/components/ui/modern-mobile-menu";
import { Home, Briefcase, Calendar, Settings } from 'lucide-react';

const MobileNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const portfolioMenuItems: InteractiveMenuItem[] = [
    { 
      label: 'Home', 
      icon: ({ className }) => (
        <Home 
          className={className} 
          onClick={() => scrollToSection('home')}
        />
      )
    },
    { 
      label: 'Skills', 
      icon: ({ className }) => (
        <Briefcase 
          className={className} 
          onClick={() => scrollToSection('skills')}
        />
      )
    },
    { 
      label: 'Projects', 
      icon: ({ className }) => (
        <Calendar 
          className={className} 
          onClick={() => scrollToSection('projects')}
        />
      )
    },
    { 
      label: 'Contact', 
      icon: ({ className }) => (
        <Settings 
          className={className} 
          onClick={() => scrollToSection('contact')}
        />
      )
    },
  ];

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4 md:hidden">
      <InteractiveMenu 
        items={portfolioMenuItems} 
        accentColor="var(--primary)" 
      />
    </div>
  );
};

export default MobileNavigation;
