
import FormLayout01 from "@/components/ui/form-2";
import { Vortex } from "@/components/ui/vortex";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center justify-center px-4 py-20 w-full h-full"
      >
        <FormLayout01 />
      </Vortex>
    </section>
  );
};

export default Contact;
