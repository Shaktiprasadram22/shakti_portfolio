"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type FormEvent, type MouseEvent, useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiPhone, FiCheckCircle } from "react-icons/fi";

/* ====== Floating Label Input ====== */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full px-5 pt-6 pb-3 rounded-2xl bg-[var(--color-surface)]/70 border border-white/8 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-3 focus:ring-[var(--color-primary)]/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-2 text-[0.65rem] font-mono uppercase tracking-wider text-[var(--color-text-muted)] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-primary-light)]"
      >
        {label}
      </label>
    </div>
  );
}

/* ====== Magnetic Social Button ====== */
function MagneticButton({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="p-4 rounded-2xl glass neon-glow-hover text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.email}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: <FiMail size={18} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <FiPhone size={18} />, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: <FiMapPin size={18} />, label: "Location", value: personalInfo.location },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-[var(--color-accent)] mb-4 tracking-wider uppercase"
          >
            // let's connect
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] origin-center"
          />
          <p className="text-[var(--color-text-muted)] mt-5 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 max-w-5xl mx-auto">
          {/* Left — Contact + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-7"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring" }}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] group-hover:bg-[var(--color-primary)]/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider mb-0.5">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-[var(--color-text-primary)] hover:text-[var(--color-primary-light)] transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-[var(--color-text-primary)] font-medium">{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Magnetic Social Links */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-xs text-[var(--color-text-muted)] mb-5 font-mono uppercase tracking-wider">Find me on</p>
              <div className="flex gap-4">
                <MagneticButton href={personalInfo.github} label="GitHub">
                  <FiGithub size={24} />
                </MagneticButton>
                <MagneticButton href={personalInfo.linkedin} label="LinkedIn">
                  <FiLinkedin size={24} />
                </MagneticButton>
                <MagneticButton href={`mailto:${personalInfo.email}`} label="Email">
                  <FiMail size={24} />
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 neon-glow space-y-6 relative overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-15 bg-[var(--color-gradient-mid)]" />

            <div className="grid sm:grid-cols-2 gap-5">
              <FloatingInput
                id="name"
                label="Name"
                value={formState.name}
                onChange={(v) => setFormState({ ...formState, name: v })}
                required
              />
              <FloatingInput
                id="email"
                label="Email"
                type="email"
                value={formState.email}
                onChange={(v) => setFormState({ ...formState, email: v })}
                required
              />
            </div>
            <div className="relative">
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={5}
                placeholder=" "
                className="peer w-full px-5 pt-6 pb-3 rounded-2xl bg-[var(--color-surface)]/70 border border-white/8 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-3 focus:ring-[var(--color-primary)]/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 resize-none placeholder-transparent"
              />
              <label
                htmlFor="message"
                className="absolute left-5 top-2 text-[0.65rem] font-mono uppercase tracking-wider text-[var(--color-text-muted)] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-primary-light)]"
              >
                Message
              </label>
            </div>
            <motion.button
              type="submit"
              className="w-full relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
                  backgroundSize: "200% 200%",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                {submitted ? (
                  <>
                    <FiCheckCircle size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <FiSend size={16} />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
