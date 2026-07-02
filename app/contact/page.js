"use client";

import { useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-40 sm:pt-48">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-bronze"
      >
        Contact
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-display text-4xl font-medium text-paper sm:text-6xl"
      >
        Walk up and knock
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 flex flex-col gap-6"
      >
        <Field label="Name" name="from_name" type="text" required />
        <Field label="Email" name="reply_to" type="email" required />
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            required
            className="border-b border-bronze-deep/50 bg-transparent py-2 text-paper placeholder:text-stone/40 focus:border-bronze focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-4 w-fit border border-bronze px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-bronze/10 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className="font-mono text-xs text-bronze">
            Message sent — we'll be in touch.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-red-400">
            Something went wrong — please try again or email us directly.
          </p>
        )}
      </motion.form>
    </main>
  );
}

function Field({ label, name, type, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-bronze-deep/50 bg-transparent py-2 text-paper placeholder:text-stone/40 focus:border-bronze focus:outline-none"
      />
    </div>
  );
}
