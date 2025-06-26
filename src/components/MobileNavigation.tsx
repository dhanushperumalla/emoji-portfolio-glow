import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, FileText, Menu, X } from 'lucide-react';
const MobileNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });
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
      element.scrollIntoView({
        behavior: "smooth"
      });
      setMenuOpen(false);
    }
  };
  const navItems = [{
    label: 'Home',
    icon: Home,
    section: 'home'
  }, {
    label: 'Skills',
    icon: User,
    section: 'skills'
  }, {
    label: 'Projects',
    icon: Briefcase,
    section: 'projects'
  }, {
    label: 'Contact',
    icon: FileText,
    section: 'contact'
  }];
  if (!isMobile) return null;
  return <>
      {/* Hamburger Icon */}
      <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" style={{
      display: menuOpen ? 'none' : 'block'
    }} className="fixed top-4 right-4 z-50 p-2 rounded-full border border-border shadow-md md:hidden text-center bg-transparent">
        <Menu size={28} />
      </button>
      {/* Overlay and Drawer */}
      {menuOpen && <div className="fixed inset-0 z-50 flex justify-end bg-black/40 md:hidden">
          <div className="bg-card w-64 h-full shadow-lg p-6 flex flex-col relative animate-slide-in-right">
            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
              <X size={24} />
            </button>
            <nav className="mt-12 flex flex-col gap-6">
              {navItems.map(({
            label,
            icon: Icon,
            section
          }) => <button key={section} className={`flex items-center gap-3 text-lg font-medium px-2 py-2 rounded-md transition-colors ${activeSection === section ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`} onClick={() => scrollToSection(section)}>
                  <Icon className="w-6 h-6" />
                  {label}
                </button>)}
            </nav>
          </div>
        </div>}
    </>;
};
export default MobileNavigation;