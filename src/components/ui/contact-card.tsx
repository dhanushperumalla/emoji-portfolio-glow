import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = 'Get in touch',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div className={cn('relative w-full', className)} {...props}>
      {/* Corner "+" marks (outside the border, like reference) */}
      <PlusIcon
        className="absolute left-2 top-2 z-20 size-4 text-white md:-left-2 md:-top-2"
        strokeWidth={2.75}
      />
      <PlusIcon
        className="absolute right-2 top-2 z-20 size-4 text-white md:-right-2 md:-top-2"
        strokeWidth={2.75}
      />
      <PlusIcon
        className="absolute bottom-2 left-2 z-20 size-4 text-white md:-bottom-2 md:-left-2"
        strokeWidth={2.75}
      />
      <PlusIcon
        className="absolute bottom-2 right-2 z-20 size-4 text-white md:-bottom-2 md:-right-2"
        strokeWidth={2.75}
      />

      {/* Card shell */}
      <div className="relative rounded-none border border-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        {/* Glossy layer clipped to the card */}
        <div className="relative isolate overflow-hidden bg-card/30 backdrop-blur-sm p-5 md:p-7">
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />
          <div className="pointer-events-none absolute -top-24 left-0 right-0 z-0 h-48 bg-gradient-to-b from-white/[0.16] via-white/[0.06] to-transparent blur-sm" />
          <div className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-7 md:gap-10">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(0,0%,95%)] mb-4">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 md:gap-5">
                {contactInfo?.map((info, index) => (
                  <ContactInfo key={index} {...info} />
                ))}
              </div>
            </div>

            <div
              className={cn(
                'rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm p-5 md:p-6',
                formSectionClassName
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div
      className={cn(
        'min-w-0 flex items-start gap-3 rounded-none p-3 transition-colors hover:bg-white/[0.03]',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center size-10 rounded-full border border-border/50 bg-background/20 shrink-0">
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground break-words">{value}</p>
      </div>
    </div>
  );
}
