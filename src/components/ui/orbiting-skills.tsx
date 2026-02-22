"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'tailwind' | 'python' | 'typescript' | 'sql' | 'nextjs' | 'langchain' | 'crewai' | 'mysql' | 'mongodb' | 'postgresql' | 'git' | 'docker' | 'postman' | 'express' | 'vscode';

type GlowColor = 'cyan' | 'purple' | 'green';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M4 3l1.7 18L12 23l6.3-2L20 3H4zm13.3 6H9.2l.3 2.8h7.5l-.7 7.2L12 20.5l-4.3-1.5-.3-3h2.5l.2 1.7 1.9.5 1.9-.5.2-2.4H8.1L7.5 9h9l-.2-2z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M4 3l1.7 18L12 23l6.3-2L20 3H4zm13.1 5.8l-.5 5.6-.3 3.1L12 19l-4.3-1.5-.3-3h2.5l.2 1.7 1.9.5 1.9-.5.2-2.4H8.1l-.6-6.2h9.8l-.2 1.2z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E"/>
        <path d="M14.5 17.5c.4.7 1 1.2 2 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1.4l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.9 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.5 1c-.3-.6-.7-.8-1.2-.8-.5 0-.9.3-.9.8 0 .5.3.7 1.1 1.1l.5.2c1.6.7 2.5 1.4 2.5 3 0 1.7-1.3 2.7-3.1 2.7-1.7 0-2.9-.8-3.4-1.9l1.4-.8zM8 17.7c.3.5.5 1 1.2 1 .6 0 1-.2 1-1.2V11h1.9v6.5c0 2-1.2 2.8-2.9 2.8-1.5 0-2.4-.8-2.9-1.7L8 17.7z" fill="#000"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.5 8 12 11.8 5.5 8 12 4.2z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.2.7 1.8 1.3.9 1 1.9 2.2 4.2 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.2-.7-1.8-1.3C15.3 7.2 14.3 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.2.7 1.8 1.3.9 1 1.9 2.2 4.2 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.2-.7-1.8-1.3C10.3 13.2 9.3 12 7 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2c-1.7 0-3.2.1-4.4.4C5.4 2.8 4 4 4 6v2h8v1H5c-2 0-3 1.5-3 4 0 2.5 1 4 3 4h2v-2.5c0-1.5 1.3-3 3-3h6c1.3 0 2-1 2-2V6c0-1.3-1.5-2.5-3-3-.8-.2-1.8-.3-3-.3zm-2.5 2.5a1 1 0 110 2 1 1 0 010-2z" fill="#3776AB"/>
        <path d="M18 8v2.5c0 1.5-1.3 3-3 3h-6c-1.3 0-2 1-2 2V18c0 1.3 1.5 2 3 2.5 1.5.4 3.2.5 5 0 1.2-.3 2-.8 2-2v-2h-6v-1h8c2 0 2.7-1.5 3-4 .3-2.5 0-4-2-4.5H18zm-3.5 9a1 1 0 110 2 1 1 0 010-2z" fill="#FFD43B"/>
      </svg>
    ),
    color: '#3776AB'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/>
        <path d="M14 15.5c.3.5.8.8 1.5.8s1-.3 1-.8c0-.4-.3-.7-1-1l-.5-.2c-1.2-.5-1.8-1.1-1.8-2.3 0-1.1.9-2 2.3-2 1 0 1.7.4 2.1 1.2l-1.1.7c-.2-.4-.5-.6-1-.6s-.8.3-.8.6c0 .4.3.6.9.9l.5.2c1.3.5 2 1.2 2 2.4 0 1.4-1.1 2.2-2.5 2.2-1.4 0-2.3-.6-2.8-1.5l1.2-.6zM7 11h2v7h1.5v-7H13V9.5H7V11z" fill="white"/>
      </svg>
    ),
    color: '#3178C6'
  },
  sql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F"/>
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#00758F" strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#00758F" strokeWidth="1"/>
      </svg>
    ),
    color: '#00758F'
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <circle cx="12" cy="12" r="10" fill="white" stroke="black" strokeWidth="1"/>
        <path d="M8 8v8h1.5V11l5 7h2L8 8z" fill="black"/>
        <rect x="15" y="8" width="1.5" height="8" fill="black"/>
      </svg>
    ),
    color: '#ffffff'
  },
  langchain: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2l-2 4h4l-2-4zM6 8l-2 4h4L6 8zM18 8l-2 4h4l-2-4zM12 14l-2 4h4l-2-4z" fill="#1C3C3C" stroke="#2DD4BF" strokeWidth="0.5"/>
        <circle cx="12" cy="8" r="2" fill="#2DD4BF"/>
      </svg>
    ),
    color: '#2DD4BF'
  },
  crewai: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <circle cx="8" cy="8" r="3" stroke="#FF6B35" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="8" r="3" stroke="#FF6B35" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="16" r="3" stroke="#FF6B35" strokeWidth="1.5" fill="none"/>
        <line x1="10" y1="9.5" x2="12" y2="13.5" stroke="#FF6B35" strokeWidth="1"/>
        <line x1="14" y1="9.5" x2="12" y2="13.5" stroke="#FF6B35" strokeWidth="1"/>
      </svg>
    ),
    color: '#FF6B35'
  },
  mysql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2C6.5 2 2 4.7 2 8v8c0 3.3 4.5 6 10 6s10-2.7 10-6V8c0-3.3-4.5-6-10-6z" fill="#00618A" opacity="0.8"/>
        <ellipse cx="12" cy="8" rx="10" ry="4" fill="#00758F"/>
      </svg>
    ),
    color: '#00758F'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2c-.5 2-1.5 3.5-3 5-1.5 1.5-2 3.5-2 5.5C7 16.6 9.2 20 12 21c2.8-1 5-4.4 5-8.5 0-2-0.5-4-2-5.5C13.5 5.5 12.5 4 12 2z" fill="#4DB33D"/>
        <path d="M12 2v19" stroke="#3FA037" strokeWidth="1"/>
      </svg>
    ),
    color: '#4DB33D'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 2C8 2 5 4.5 5 8c0 2 .8 3.5 2 4.5V20c0 1.1.9 2 2 2h1c.5 0 1-.2 1.3-.6.3.4.8.6 1.2.6h1c1.1 0 2-.9 2-2v-7.5c1.2-1 2-2.5 2-4.5 0-3.5-3-6-5.5-6z" fill="#336791"/>
        <circle cx="10" cy="8" r="1" fill="white"/>
        <circle cx="14" cy="8" r="1" fill="white"/>
      </svg>
    ),
    color: '#336791'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M21.6 11.2L12.8 2.4c-.5-.5-1.2-.5-1.6 0l-1.8 1.8 2.3 2.3c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.2 2.2c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5L12.6 9.2v5.2c.1.1.3.2.4.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.3-.3.5-.3V9c-.2-.1-.3-.2-.5-.3-.4-.4-.5-1-.3-1.5L8.4 5l-6 6c-.4.5-.4 1.2 0 1.6l8.8 8.8c.5.5 1.2.5 1.6 0l8.8-8.8c.4-.4.4-1.2 0-1.6z" fill="#F05032"/>
      </svg>
    ),
    color: '#F05032'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M13 4h2v2h-2V4zM10 4h2v2h-2V4zM7 4h2v2H7V4zM10 7h2v2h-2V7zM7 7h2v2H7V7zM4 7h2v2H4V7zM7 10h2v2H7v-2zM10 10h2v2h-2v-2zM13 7h2v2h-2V7z" fill="#2496ED"/>
        <path d="M22 11c-.5-.3-1.5-.4-2.3-.2-.2-1-.7-1.8-1.5-2.5l-.5-.3-.3.5c-.4.6-.5 1.5-.5 2.2.1.6.2 1.2.5 1.7-1 .5-2.5.6-3 .6H1.5c-.3 1.5 0 3.5 1 5 1 1.3 2.5 2 4.5 2 4 0 7-1.8 9-5.5.6.1 2 .1 2.8-1l.2-.5-.5-.3c-.7-.3-1.5-.5-2.5-.2z" fill="#2496ED"/>
      </svg>
    ),
    color: '#2496ED'
  },
  postman: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <circle cx="12" cy="12" r="10" fill="#FF6C37"/>
        <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#FF6C37'
  },
  express: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#333"/>
        <text x="12" y="14" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">Ex</text>
      </svg>
    ),
    color: '#333333'
  },
  vscode: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M17 2l-5 5-5-3.5L3 5.5l4 3.5-4 3.5 4 2 5-3.5 5 5 4-2V4l-4-2zM7 9L5.5 9 7 7.5V9zm0 6v1.5L5.5 15H7zm10-10.5V15l-4 2V7l4-2.5z" fill="#007ACC"/>
      </svg>
    ),
    color: '#007ACC'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${iconComponents[iconType]?.color || '#fff'}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          boxShadow: isHovered
            ? `0 0 20px ${iconComponents[iconType]?.color || '#fff'}66`
            : `0 0 8px ${iconComponents[iconType]?.color || '#fff'}22`,
        }}
      >
        <SkillIcon type={iconType} />
      </div>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan' }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: { primary: 'rgba(6, 182, 212, 0.4)', border: 'rgba(6, 182, 212, 0.2)' },
    purple: { primary: 'rgba(147, 51, 234, 0.4)', border: 'rgba(147, 51, 234, 0.2)' },
    green: { primary: 'rgba(34, 197, 94, 0.4)', border: 'rgba(34, 197, 94, 0.2)' },
  };
  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
      <div
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          border: `1px solid ${colors.border}`,
          boxShadow: `0 0 30px ${colors.primary}, inset 0 0 30px ${colors.border}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main Component ---
interface OrbitingSkillsProps {
  skills?: SkillConfig[];
}

const defaultSkills: SkillConfig[] = [
  // Inner orbit - Languages
  { id: 'html', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'html', phaseShift: 0, glowColor: 'cyan', label: 'HTML5' },
  { id: 'css', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'css', phaseShift: (2 * Math.PI) / 6, glowColor: 'cyan', label: 'CSS3' },
  { id: 'javascript', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'javascript', phaseShift: (4 * Math.PI) / 6, glowColor: 'cyan', label: 'JavaScript' },
  { id: 'python', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'python', phaseShift: (6 * Math.PI) / 6, glowColor: 'cyan', label: 'Python' },
  { id: 'typescript', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'typescript', phaseShift: (8 * Math.PI) / 6, glowColor: 'cyan', label: 'TypeScript' },
  { id: 'sql', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'sql', phaseShift: (10 * Math.PI) / 6, glowColor: 'cyan', label: 'SQL' },
  // Middle orbit - Frameworks
  { id: 'react', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'react', phaseShift: 0, glowColor: 'purple', label: 'React.js' },
  { id: 'node', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'node', phaseShift: (2 * Math.PI) / 7, glowColor: 'purple', label: 'Node.js' },
  { id: 'express', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'express', phaseShift: (4 * Math.PI) / 7, glowColor: 'purple', label: 'Express.js' },
  { id: 'nextjs', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'nextjs', phaseShift: (6 * Math.PI) / 7, glowColor: 'purple', label: 'Next.js' },
  { id: 'langchain', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'langchain', phaseShift: (8 * Math.PI) / 7, glowColor: 'purple', label: 'LangChain' },
  { id: 'crewai', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'crewai', phaseShift: (10 * Math.PI) / 7, glowColor: 'purple', label: 'CrewAI' },
  { id: 'tailwind', orbitRadius: 160, size: 44, speed: -0.5, iconType: 'tailwind', phaseShift: (12 * Math.PI) / 7, glowColor: 'purple', label: 'Tailwind CSS' },
  // Outer orbit - Tools
  { id: 'mysql', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'mysql', phaseShift: 0, glowColor: 'green', label: 'MySQL' },
  { id: 'mongodb', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'mongodb', phaseShift: (2 * Math.PI) / 7, glowColor: 'green', label: 'MongoDB' },
  { id: 'postgresql', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'postgresql', phaseShift: (4 * Math.PI) / 7, glowColor: 'green', label: 'PostgreSQL' },
  { id: 'git', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'git', phaseShift: (6 * Math.PI) / 7, glowColor: 'green', label: 'Git/GitHub' },
  { id: 'vscode', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'vscode', phaseShift: (8 * Math.PI) / 7, glowColor: 'green', label: 'VS Code' },
  { id: 'docker', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'docker', phaseShift: (10 * Math.PI) / 7, glowColor: 'green', label: 'Docker' },
  { id: 'postman', orbitRadius: 230, size: 40, speed: 0.35, iconType: 'postman', phaseShift: (12 * Math.PI) / 7, glowColor: 'green', label: 'Postman' },
];

export default function OrbitingSkills({ skills = defaultSkills }: OrbitingSkillsProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor }> = [
    { radius: 90, glowColor: 'cyan' },
    { radius: 160, glowColor: 'purple' },
    { radius: 230, glowColor: 'green' },
  ];

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: '550px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Central icon */}
      <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(147, 51, 234, 0.3))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(147, 51, 234, 0.15)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M8 12l2-2 4 4" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 12l-2-2" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Orbit paths */}
      {orbitConfigs.map((config) => (
        <GlowingOrbitPath key={config.radius} radius={config.radius} glowColor={config.glowColor} />
      ))}

      {/* Skills */}
      {skills.map((config) => {
        const angle = time * config.speed + config.phaseShift;
        return <OrbitingSkill key={config.id} config={config} angle={angle} />;
      })}
    </div>
  );
}
