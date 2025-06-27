
"use client"

import { useEffect, useMemo, useState } from "react"
import {
  fetchSimpleIcons,
  Cloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud"

export const cloudProps: Omit<any, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    console.log('IconCloud component mounted with iconSlugs:', iconSlugs)
    
    // Fetch icons
    if (iconSlugs && iconSlugs.length > 0) {
      console.log('Starting to fetch icons for slugs:', iconSlugs)
      setIsLoading(true)
      setError(null)
      
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((iconData) => {
          console.log('Icons fetched successfully:', iconData)
          console.log('Number of icons received:', Object.keys(iconData.simpleIcons || {}).length)
          setData(iconData)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching icons:', error)
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
          })
          setError(`Failed to fetch icons: ${error.message}`)
          setIsLoading(false)
        })
    } else {
      console.warn('No iconSlugs provided or empty array')
      setIsLoading(false)
    }

    // Set initial theme
    const getTheme = () => {
      if (typeof document !== 'undefined') {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      }
      return 'dark';
    };
    setTheme(getTheme())

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    
    return () => observer.disconnect();
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || !data.simpleIcons) {
      console.log('No icon data available yet')
      return []
    }
    
    console.log('Rendering icons with theme:', theme)
    console.log('Available icons:', Object.keys(data.simpleIcons))
    
    try {
      const icons = Object.values(data.simpleIcons).map((icon) =>
        renderCustomIcon(icon, theme)
      )
      console.log('Successfully rendered icons count:', icons.length)
      return icons
    } catch (error) {
      console.error('Error rendering icons:', error)
      setError(`Failed to render icons: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return []
    }
  }, [data, theme])

  // Show loading state while not on client or while loading
  if (!isClient || isLoading) {
    console.log('Showing loading state - isClient:', isClient, 'isLoading:', isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show error state
  if (error) {
    console.log('Showing error state:', error)
    return (
      <div className="flex flex-col items-center justify-center w-full h-[300px] p-4">
        <div className="text-red-500 mb-2">⚠️ Error loading icons</div>
        <div className="text-sm text-muted-foreground text-center">{error}</div>
        <div className="text-xs text-muted-foreground mt-2">Check console for details</div>
      </div>
    )
  }

  // Show fallback if no icons rendered
  if (!data || renderedIcons.length === 0) {
    console.log('No data or no rendered icons - showing fallback')
    return (
      <div className="flex flex-col items-center justify-center w-full h-[300px] p-4">
        <div className="text-muted-foreground mb-2">🎯 Skills Visualization</div>
        <div className="text-sm text-muted-foreground text-center">
          Interactive icon cloud loading...
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Expected icons: {iconSlugs.length}
        </div>
      </div>
    )
  }

  console.log('Rendering Cloud component with', renderedIcons.length, 'icons')
  
  return (
    <Cloud {...cloudProps}>
      {renderedIcons}
    </Cloud>
  )
}
