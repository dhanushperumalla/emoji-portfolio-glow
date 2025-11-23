
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onItemClick?: (url: string) => void
}

export function NavBar({ items, className, onItemClick }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll direction for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Intersection Observer for scroll-based active state
  useEffect(() => {
    const sections = items.map(item => {
      const sectionId = item.url.replace('#', '')
      return {
        element: document.getElementById(sectionId),
        name: item.name,
        id: sectionId
      }
    }).filter(section => section.element !== null)

    console.log('Found sections:', sections.map(s => s.id))

    if (sections.length === 0) {
      console.log('No sections found for navigation')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Process all entries to find the most visible section
        let maxVisibility = 0
        let mostVisibleSection = null

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio
            mostVisibleSection = entry.target.id
          }
        })

        if (mostVisibleSection) {
          const matchingItem = items.find(item => item.url === `#${mostVisibleSection}`)
          
          if (matchingItem && matchingItem.name !== activeTab) {
            console.log('Setting active section to:', matchingItem.name)
            setActiveTab(matchingItem.name)
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5], // More responsive thresholds
        rootMargin: '-80px 0px -20% 0px' // Better detection area
      }
    )

    sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element)
      }
    })

    return () => {
      sections.forEach(section => {
        if (section.element) {
          observer.unobserve(section.element)
        }
      })
    }
  }, [items, activeTab])

  const handleItemClick = (item: NavItem) => {
    console.log('Navigation clicked:', item.name)
    setActiveTab(item.name)
    
    if (onItemClick) {
      onItemClick(item.url)
    } else {
      // Smooth scroll to section with proper offset
      const element = document.querySelector(item.url)
      if (element) {
        const navbarHeight = 100 // Account for navbar + padding
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - navbarHeight
        
        window.scrollTo({
          top: Math.max(0, offsetPosition), // Prevent negative scroll
          behavior: 'smooth'
        })
      } else {
        console.warn(`Element not found for selector: ${item.url}`)
      }
    }
  }

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none flex justify-center",
        className,
      )}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
