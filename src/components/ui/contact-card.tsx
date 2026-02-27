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
  title = 'Get In Touch',
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
        'relative w-full rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-8 md:p-12',
        className
      )}
      {...props}
    >
      {/* Corner crosses */}
      <PlusIcon className="absolute top-4 left-4 size-4 text-muted-foreground/50" />
      <PlusIcon className="absolute top-4 right-4 size-4 text-muted-foreground/50" />
      <PlusIcon className="absolute bottom-4 left-4 size-4 text-muted-foreground/50" />
      <PlusIcon className="absolute bottom-4 right-4 size-4 text-muted-foreground/50" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>

        <div className={cn('', formSectionClassName)}>
          {children}
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
    <div className={cn('flex items-start gap-3', className)} {...props}>
      <div className="flex items-center justify-center size-10 rounded-full border border-border/50 bg-muted/30 shrink-0">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
