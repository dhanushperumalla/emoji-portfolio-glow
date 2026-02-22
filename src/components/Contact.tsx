import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xwpkvgvb");
  const { toast } = useToast();

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
    }
  }, [state.succeeded]);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ContactCard
            title="Get in touch"
            description="If you have any questions regarding my Services or need help, please fill out the form here. I do my best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: "Email",
                value: "dhanushpavankumar@gmail.com",
              },
              {
                icon: PhoneIcon,
                label: "Phone",
                value: "+91 6305 XXXXXX",
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="What's this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." rows={4} required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <Button className="w-full" type="submit" disabled={state.submitting}>
                {state.submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
