
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

  useEffect(() => {
    setIsClient(true)
    console.log('IconCloud component mounted with iconSlugs:', iconSlugs)
    
    // Fetch icons
    if (iconSlugs && iconSlugs.length > 0) {
      console.log('Fetching icons for slugs:', iconSlugs)
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((iconData) => {
          console.log('Icons fetched successfully:', iconData)
          setData(iconData)
        })
        .catch((error) => {
          console.error('Error fetching icons:', error)
        })
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
    const icons = Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme)
    )
    console.log('Rendered icons count:', icons.length)
    return icons
  }, [data, theme])

  if (!isClient) {
    console.log('Not client side yet, showing placeholder')
    return (
      <div className="flex items-center justify-center w-full h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data || renderedIcons.length === 0) {
    console.log('Data not loaded yet, showing loading state')
    return (
      <div className="flex items-center justify-center w-full h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
