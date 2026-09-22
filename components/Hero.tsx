"use client";

import { motion } from "framer-motion";
import { StoreCenters } from "./StoreCenters";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-brand/25 blur-3xl sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-56 w-56 rounded-full bg-ember/20 blur-3xl"
      />
      <div className="grain absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-sand sm:text-sm"
        >
          Solo per chi viene in negozio · QR in store
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-xl font-serif text-[2.35rem] leading-[1.12] tracking-tight text-cream sm:text-6xl"
        >
          Entra nel giro{" "}
          <span className="italic text-brand">SOSmoke</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-lg text-base leading-relaxed text-sand/90 sm:text-lg"
        >
          Il filo diretto con i negozi. Per chi passa dal bancone, non per chi
          naviga a caso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-8 max-w-md"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/55">
            I nostri centri
          </p>
          <StoreCenters variant="dark" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-sand/70 sm:text-[0.95rem]"
        >
          Niente spam, niente liste infinite. Solo vantaggi veri: consigli,
          promo e un posto dove dirci come sta andando.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a href="#form" className="btn-ember w-full justify-center sm:w-auto">
            Dicci la tua
          </a>
          <p className="text-center text-xs text-sand/55 sm:text-left">
            Due minuti, dal telefono. Poi ci pensiamo noi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
