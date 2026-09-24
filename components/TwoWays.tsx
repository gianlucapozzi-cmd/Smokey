import { FadeIn } from "./FadeIn";

export function TwoWays() {
  return (
    <section className="relative overflow-hidden bg-sand/70 px-5 py-16 sm:px-8 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/two-ways.jpg)", opacity: 0.15 }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ember">
            A due vie
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Tu ci consigli, noi ti consigliamo
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base">
            Non è un form da compilare e dimenticare. È lo scambio che già
            avviene al bancone — solo, resta scritto.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <FadeIn>
            <article className="card-soft h-full p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink/45">
                Lato cliente
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink">Dicci la tua</h3>
              <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-ink/75">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Com’è andata in negozio: servizio, accoglienza, competenza.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Cosa cerchi, e quale prodotto o brand vorresti trovare.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Resta in contatto per promo e consigli, senza rumore.
                </li>
              </ul>
            </article>
          </FadeIn>

          <div className="hidden items-center justify-center md:flex" aria-hidden>
            <span className="font-serif text-3xl italic text-ember">↔</span>
          </div>

          <FadeIn delay={0.08}>
            <article className="h-full rounded-[1.35rem] bg-ink p-6 text-cream sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sand/60">
                Lato SOSmoke
              </p>
              <h3 className="mt-2 font-serif text-2xl text-cream">
                Noi ti rispondiamo
              </h3>
              <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-sand/85">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Un consiglio personalizzato, come se fossi ancora al banco.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Reperiamo i prodotti fuori assortimento, quando si può.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  Aggiornamenti su misura: i tuoi brand, le tue uscite.
                </li>
              </ul>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
