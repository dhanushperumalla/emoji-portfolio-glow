import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [state, handleSubmit] = useForm("mjkrpjnv");
  const [showedToast, setShowedToast] = useState(false);

  if (state.succeeded && !showedToast) {
    toast.success("Thanks for reaching out! I'll get back to you soon.");
    setShowedToast(true);
  }

  return (
    <section id="contact" className="relative py-16 bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ContactCard
            title="Get in touch"
            description="If you have any questions regarding my work or need help, please fill out the form here. I do my best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: "Email",
                value: "perumalladhanush102@gmail.com",
              },
              {
                icon: PhoneIcon,
                label: "Phone",
                value: "+91 6281091586",
              },
              {
                icon: MapPinIcon,
                label: "Address",
                value: "Andhra Pradesh, India",
                className: "col-span-2",
              },
            ]}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder=""
                  required
                  className="w-full h-10 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                  className="w-full h-10 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder=""
                  className="w-full h-10 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full min-h-24 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/30 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/25 resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_14px_34px_hsl(var(--primary)/0.18)]"
              >
                Submit
              </button>
            </form>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
