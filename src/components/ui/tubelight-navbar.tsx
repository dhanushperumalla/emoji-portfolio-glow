
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
        // Only process entries that are intersecting
        const intersectingEntries = entries.filter(entry => entry.isIntersecting)
        
        if (intersectingEntries.length === 0) return

        // Find the entry with the highest intersection ratio among intersecting entries
        const topEntry = intersectingEntries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev
        })

        const activeSection = topEntry.target.id
        const matchingItem = items.find(item => item.url === `#${activeSection}`)
        
        if (matchingItem && matchingItem.name !== activeTab) {
          console.log('Setting active section to:', matchingItem.name)
          setActiveTab(matchingItem.name)
        }
      },
      {
        threshold: [0.2, 0.5, 0.8], // More conservative thresholds
        rootMargin: '-100px 0px -100px 0px' // More restrictive margin to prevent rapid switching
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
      // Smooth scroll to section with offset for fixed navbar
      const element = document.querySelector(item.url)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 80 // Offset for navbar height
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 pointer-events-none",
        className,
      )}
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
    </div>
  )
}
