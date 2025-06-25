
import React, { useState, useEffect } from 'react';
import { InteractiveMenu, InteractiveMenuItem } from "@/components/ui/modern-mobile-menu";
import { Home, User, Briefcase, FileText } from 'lucide-react';

const MobileNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll-based active state
  useEffect(() => {
    const sections = ['home', 'skills', 'projects', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sectionElements.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
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
        <User 
          className={className} 
          onClick={() => scrollToSection('skills')}
        />
      )
    },
    { 
      label: 'Projects', 
      icon: ({ className }) => (
        <Briefcase 
          className={className} 
          onClick={() => scrollToSection('projects')}
        />
      )
    },
    { 
      label: 'Contact', 
      icon: ({ className }) => (
        <FileText 
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
