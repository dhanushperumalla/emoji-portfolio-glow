import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from './badge';
import { Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CertCardData {
  title: string;
  provider: string;
  image: string;
  issued: string;
  certificationNo: string;
  description: string;
  color: string;
}

interface CardProps {
  card: CertCardData;
  index: number;
  totalCards: number;
}

const GlassCard: React.FC<CardProps> = ({ card, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    const container = containerRef.current;
    if (!cardEl || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(cardEl, { scale: 1, transformOrigin: 'center top' });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(1, targetScale, self.progress);
        gsap.set(cardEl, { scale: Math.max(scale, targetScale), transformOrigin: 'center top' });
      },
    });

    return () => { trigger.kill(); };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <div
        ref={cardRef}
        className="relative w-[90%] md:w-[75%] rounded-3xl"
        style={{
          height: '550px',
          isolation: 'isolate',
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: 'top',
        }}
      >
        {/* Electric Border */}
        <div
          className="absolute -inset-[3px] rounded-[27px] -z-10"
          style={{
            padding: '3px',
            background: `conic-gradient(from 0deg, transparent 0deg, ${card.color} 60deg, ${card.color.replace('0.8', '0.6')} 120deg, transparent 180deg, ${card.color.replace('0.8', '0.4')} 240deg, transparent 360deg)`,
          }}
        />

        {/* Main Card */}
        <div className="relative w-full h-full flex rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Glass reflection overlay */}
          <div className="absolute top-0 left-0 right-0 h-[60%] pointer-events-none rounded-t-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row w-full p-6 md:p-10 gap-6">
            {/* Left: Info */}
            <div className="md:w-[40%] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-primary" />
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm">
                  {card.provider}
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">{card.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Issued: {card.issued}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Certificate No: {card.certificationNo}
              </div>
            </div>

            {/* Right: Image */}
            <div className="md:w-[60%] flex items-center justify-center">
              <img
                src={card.image}
                alt={`${card.title} Certificate`}
                className="w-full h-auto max-h-[420px] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface StackedCertsProps {
  certifications: CertCardData[];
}

export const StackedCerts: React.FC<StackedCertsProps> = ({ certifications }) => {
  return (
    <div>
      {certifications.map((card, index) => (
        <GlassCard
          key={card.certificationNo}
          card={card}
          index={index}
          totalCards={certifications.length}
        />
      ))}
    </div>
  );
};
