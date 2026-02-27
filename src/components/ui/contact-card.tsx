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
        'relative w-full rounded-xl border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,7%)] p-10 md:p-14',
        className
      )}
      {...props}
    >
      <PlusIcon className="absolute top-4 left-4 size-4 text-[hsl(0,0%,35%)]" strokeWidth={1} />
      <PlusIcon className="absolute top-4 right-4 size-4 text-[hsl(0,0%,35%)]" strokeWidth={1} />
      <PlusIcon className="absolute bottom-4 left-4 size-4 text-[hsl(0,0%,35%)]" strokeWidth={1} />
      <PlusIcon className="absolute bottom-4 right-4 size-4 text-[hsl(0,0%,35%)]" strokeWidth={1} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(0,0%,95%)] mb-5">
              {title}
            </h2>
            <p className="text-[hsl(0,0%,55%)] text-sm md:text-base leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10">
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
      <div className="flex items-center justify-center size-10 rounded-full border border-[hsl(0,0%,22%)] bg-transparent shrink-0">
        <Icon className="size-4 text-[hsl(0,0%,60%)]" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[hsl(0,0%,95%)]">{label}</p>
        <p className="text-xs text-[hsl(0,0%,50%)]">{value}</p>
      </div>
    </div>
  );
}
