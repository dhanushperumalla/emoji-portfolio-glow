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
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactCard
            title="Let's Connect"
            description="Feel free to reach out for collaborations, freelance opportunities, or just a friendly chat about tech."
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
                icon: LinkedinIcon,
                label: "LinkedIn",
                value: "Dhanush Pavan Kumar",
              },
              {
                icon: MapPinIcon,
                label: "Location",
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
