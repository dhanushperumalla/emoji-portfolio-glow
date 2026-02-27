import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ContactCard
            title="Get In Touch"
            description="Ready to start your next project? Let's work together to create something amazing! Fill out the form and I'll get back to you as soon as possible."
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="mt-1 bg-muted/30 border-border/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  className="mt-1 bg-muted/30 border-border/50"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone"
                  className="mt-1 bg-muted/30 border-border/50"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  className="mt-1 bg-muted/30 border-border/50 min-h-[100px]"
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <Button type="submit" className="w-full" disabled={state.submitting}>
                Submit
              </Button>
            </form>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
