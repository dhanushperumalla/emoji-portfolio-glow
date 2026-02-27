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
    <section id="contact" className="py-20 bg-[hsl(0,0%,4%)]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ContactCard
            title="Get in touch"
            description="If you have any questions regarding my work or need help, please fill out the form here. I do my best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: "Email",
                value: "dhanushkumar9854@gmail.com",
              },
              {
                icon: PhoneIcon,
                label: "Phone",
                value: "+91 9854XXXXXX",
              },
              {
                icon: MapPinIcon,
                label: "Address",
                value: "India",
                className: "col-span-2",
              },
            ]}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[hsl(0,0%,90%)] mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder=""
                  required
                  className="w-full h-11 rounded-md border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,5%)] px-3 text-sm text-[hsl(0,0%,90%)] outline-none focus:border-[hsl(0,0%,30%)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[hsl(0,0%,90%)] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                  className="w-full h-11 rounded-md border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,5%)] px-3 text-sm text-[hsl(0,0%,90%)] outline-none focus:border-[hsl(0,0%,30%)] transition-colors"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[hsl(0,0%,90%)] mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder=""
                  className="w-full h-11 rounded-md border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,5%)] px-3 text-sm text-[hsl(0,0%,90%)] outline-none focus:border-[hsl(0,0%,30%)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[hsl(0,0%,90%)] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,5%)] px-3 py-2 text-sm text-[hsl(0,0%,90%)] outline-none focus:border-[hsl(0,0%,30%)] transition-colors resize-y"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full h-11 rounded-md bg-[hsl(0,0%,88%)] text-[hsl(0,0%,8%)] text-sm font-medium hover:bg-[hsl(0,0%,95%)] transition-colors disabled:opacity-50"
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
