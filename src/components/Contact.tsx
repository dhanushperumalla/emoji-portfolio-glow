
import FormLayout01 from "@/components/ui/form-2";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";

const Contact = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]"
    >
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-6xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 via-white/5/10 to-white/0 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
          <div className="pointer-events-none absolute inset-px rounded-[5px] border border-white/10 bg-gradient-to-tr from-white/10 via-transparent to-white/5/20" />

          <div className="relative grid gap-10 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-12">
            {/* Left panel */}
            <div className="space-y-8 pr-0 text-slate-100 md:pr-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Get in touch
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
                  If you have any questions regarding my work or need help,
                  please fill out the form here. I do my best to respond within
                  1 business day.
                </p>
              </div>

              <div className="space-y-6 text-sm md:text-base">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Mail className="h-4 w-4 text-slate-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</p>
                    <p className="mt-1 text-slate-100">perumalladhanush102@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Phone className="h-4 w-4 text-slate-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Phone</p>
                    <p className="mt-1 text-slate-100">+91 6281091586</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <MapPin className="h-4 w-4 text-slate-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Address</p>
                    <p className="mt-1 text-slate-100">Andhra Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel: 3D glass form card */}
            <div className="flex items-stretch" style={{ perspective: "1200px" }}>
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className="relative w-full rounded-2xl"
              >
                {/* Traveling light beam border */}
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden z-0">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent blur-sm" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent blur-sm" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-32 w-[3px] bg-gradient-to-b from-transparent via-purple-400/60 to-transparent blur-sm" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-32 w-[3px] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent blur-sm" />
                  </motion.div>
                </div>

                {/* Card border glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.08] z-[1]" />

                {/* Glass card */}
                <div className="relative z-[2] w-full rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.55)] backdrop-blur-2xl md:p-8">
                  {/* Inner glass reflection */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/[0.06] via-transparent to-white/[0.03]" />

                  {/* Mouse-following spotlight */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-30 transition-opacity"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.12), transparent 60%)`,
                    }}
                  />

                  <div className="relative">
                    <h3 className="mb-4 text-lg font-medium text-slate-100 md:mb-6 md:text-xl">
                      Send me a message
                    </h3>
                    <FormLayout01 />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
