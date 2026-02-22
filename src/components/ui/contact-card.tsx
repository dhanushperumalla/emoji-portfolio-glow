import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

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
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl',
        'grid grid-cols-1 md:grid-cols-2',
        className
      )}
      {...props}
    >
      {/* Left info section */}
      <div className="relative bg-primary p-8 md:p-10 flex flex-col justify-between overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/10" />
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary-foreground/5" />

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {title}
          </h2>
          <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed mb-8">
            {description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>

      {/* Right form section */}
      <div className={cn('p-8 md:p-10', formSectionClassName)}>
        {children}
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
    <div className={cn('flex items-start gap-3', className)} {...props}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <p className="text-xs text-primary-foreground/70 font-medium">{label}</p>
        <p className="text-sm text-primary-foreground font-semibold">{value}</p>
      </div>
    </div>
  );
}
