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
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-card',
        'grid grid-cols-1 md:grid-cols-2',
        className
      )}
      {...props}
    >
      {/* Corner crosses */}
      <PlusIcon className="absolute top-3 left-3 h-4 w-4 text-muted-foreground/40" />
      <PlusIcon className="absolute top-3 right-3 h-4 w-4 text-muted-foreground/40" />
      <PlusIcon className="absolute bottom-3 left-3 h-4 w-4 text-muted-foreground/40" />
      <PlusIcon className="absolute bottom-3 right-3 h-4 w-4 text-muted-foreground/40" />

      {/* Left info section */}
      <div className="p-10 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
          {description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactInfo?.map((info, index) => (
            <ContactInfo key={index} {...info} />
          ))}
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
