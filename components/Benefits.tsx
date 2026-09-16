import { FadeIn } from "./FadeIn";

const BENEFITS = [
  {
    title: "Consigli su misura",
    body: "Te lo diciamo come in negozio: in base a te, non a un catalogo. La competenza dello staff è il punto.",
  },
  {
    title: "Promozioni ed esclusive",
    body: "Uscite e vantaggi riservati a chi è nel giro. Solo per iscritti, solo se ha senso.",
  },
  {
    title: "Se non c’è, lo troviamo",
    body: "Assortimento e magazzino sempre in movimento. Un prodotto non è a scaffale? Lo reperiamo per te.",
  },
  {
    title: "Avvisi sui tuoi brand",
    body: "Quando arriva qualcosa che ti interessa, te lo facciamo sapere. Senza rumore di sottofondo.",
  },
];

export function Benefits() {
  return (
    <section className="bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ember">
            Cosa ottieni
          </p>
          <h2 className="mt-3 max-w-md font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Un circolo, non una mailing list
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {BENEFITS.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <article className="card-soft h-full p-6 sm:p-7">
                <span className="font-serif text-2xl italic text-brand/80">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
