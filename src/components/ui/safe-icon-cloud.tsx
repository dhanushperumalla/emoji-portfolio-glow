import { useEffect, useState, useRef } from "react";

interface IconCloudProps {
  iconSlugs: string[];
}

interface IconPosition {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  scale: number;
}

export function SafeIconCloud({ iconSlugs }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [icons, setIcons] = useState<Array<{ slug: string; position: IconPosition }>>([]);
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Generate random positions for icons in 3D space
    const generateIconPositions = () => {
      const radius = 120;
      const newIcons = iconSlugs.map((slug, index) => {
        const phi = Math.acos(-1 + (2 * index) / iconSlugs.length);
        const theta = Math.sqrt(iconSlugs.length * Math.PI) * phi;
        
        return {
          slug,
          position: {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi),
            rotationX: Math.random() * 360,
            rotationY: Math.random() * 360,
            scale: 0.8 + Math.random() * 0.4,
          },
        };
      });
      setIcons(newIcons);
    };

    generateIconPositions();
  }, [iconSlugs, isClient]);

  useEffect(() => {
    if (!isClient || icons.length === 0) return;

    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      setIcons(prevIcons =>
        prevIcons.map(icon => ({
          ...icon,
          position: {
            ...icon.position,
            rotationY: icon.position.rotationY + 0.5,
            rotationX: icon.position.rotationX + 0.2,
          },
        }))
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, icons.length]);

  const getIconUrl = (slug: string) => {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/${slug}.svg`;
  };

  if (!isClient) {
    return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          width: "300px",
          height: "300px",
        }}
      >
        {icons.map((icon, index) => (
          <div
            key={icon.slug}
            className="absolute flex items-center justify-center transition-transform duration-100"
            style={{
              width: "40px",
              height: "40px",
              left: "50%",
              top: "50%",
              transform: `
                translate(-50%, -50%)
                translate3d(${icon.position.x}px, ${icon.position.y}px, ${icon.position.z}px)
                rotateX(${icon.position.rotationX}deg)
                rotateY(${icon.position.rotationY}deg)
                scale(${icon.position.scale})
              `,
              opacity: (icon.position.z + 120) / 240,
            }}
          >
            <img
              src={getIconUrl(icon.slug)}
              alt={icon.slug}
              className="w-8 h-8 filter dark:invert"
              style={{
                filter: "brightness(0) saturate(100%) invert(50%) sepia(20%) saturate(2000%) hue-rotate(200deg)",
              }}
              onError={(e) => {
                // Fallback to a simple colored div if icon fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center text-xs font-mono';
                  fallback.textContent = icon.slug.substring(0, 2).toUpperCase();
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
