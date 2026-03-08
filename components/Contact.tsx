"use client";

import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { fadeInUp, sectionViewport } from "@/lib/animations";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      alert("Email service is not configured properly.");
      return;
    }

    setIsSending(true);
    try {
      await emailjs.sendForm(serviceId, templateId, event.currentTarget, publicKey);
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section pb-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-sky-300">Contact</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Let&apos;s Build Something Great</h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-[1.2fr,0.8fr]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          onSubmit={handleSubmit}
          className="glass space-y-4 rounded-2xl p-6"
        >
          <label className="block text-sm text-zinc-300">
            Name
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none transition focus:border-sky-300"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            Email
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none transition focus:border-sky-300"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            Message
            <textarea
              name="message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none transition focus:border-sky-300"
            />
          </label>
          <button
            type="submit"
            disabled={isSending}
            className="rounded-xl bg-gradient-to-r from-sky-400 to-teal-300 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ delay: 0.08 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-heading text-xl text-zinc-100">Connect</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Open to backend, platform engineering and AI systems opportunities.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="https://github.com/Shaktiprasadram22"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-white"
            >
              <Github size={16} /> github.com/Shaktiprasadram22
            </a>
            <a
              href="https://linkedin.com/in/shaktiram22"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-white"
            >
              <Linkedin size={16} /> linkedin.com/in/shaktiram22
            </a>
            <a
              href="mailto:shaktiram.coc@gmail.com"
              className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-white"
            >
              <Mail size={16} /> shaktiram.coc@gmail.com
            </a>
            <a
              href="tel:+918917583070"
              className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-white"
            >
              <Phone size={16} /> +91 8917583070
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
