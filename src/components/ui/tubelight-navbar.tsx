"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}
interface NavBarProps {
  items: NavItem[];
  className?: string;
  onItemClick?: (url: string) => void;
}
export function NavBar({
  items,
  className,
  onItemClick
}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for scroll-based active state
  useEffect(() => {
    const sections = items.map(item => {
      const sectionId = item.url.replace('#', '');
      return document.getElementById(sectionId);
    }).filter(Boolean);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matchingItem = items.find(item => item.url === `#${sectionId}`);
          if (matchingItem) {
            setActiveTab(matchingItem.name);
          }
        }
      });
    }, {
      threshold: 0.3,
      // Trigger when 30% of the section is visible
      rootMargin: '-20% 0px -20% 0px' // Adjust the trigger area
    });
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [items]);
  const handleItemClick = (item: NavItem) => {
    setActiveTab(item.name);
    if (onItemClick) {
      onItemClick(item.url);
    } else {
      // Smooth scroll to section
      const element = document.querySelector(item.url);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
  return <div className={cn("fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none", className)}>
      
    </div>;
}