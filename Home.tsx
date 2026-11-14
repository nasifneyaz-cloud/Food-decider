import { useEffect, useRef } from 'react'
import { Reveal, CountUp, prefersReduced, go } from './hooks'
import type { Fridge } from './hooks'
import Finder from './Finder'
import { FIGURES, HABITS, SOURCE_SHORT } from './content'
import { INGREDIENTS } from './ingredients'
import { RECIPES } from './recipes'

export default function Home({ fridge, onFinder }: { fridge: Fridge; onFinder: () => void }) {
  const heroImg = useRef<HTMLDivElement>(null)

  // gentle parallax on the hero photo
  useEffect(() => {
    if (prefersReduced()) return
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (heroImg.current) heroImg.current.style.transform = `translateY(${Math.min(window.scrollY, 600) * 0.06}px)`
      })
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])

  const marquee = INGREDIENTS.filter((_, i) => i % 3 === 0)

  return (
    <>
      {/* ============================ 1. HERO ============================ */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-mustard/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-64 h-96 w-96 rounded-full bg-tomato/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forest">
              <span aria-hidden="true">🥬</span> Household food waste, in plain English
            </p>
            <h1
              id="hero-title"
              className="animate-rise mt-6 text-[2.9rem] font-bold leading-[1.02] tracking-tight text-forest-deep sm:text-7xl lg:text-[5.25rem]"
              style={{ animationDelay: '90ms' }}
            >
              Cook what you <em className="swash">already have</em>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl" style={{ animationDelay: '180ms' }}>
              Most food waste starts at home, with a fridge full of things and no idea what to make. Tick what you’ve got and get simple, real recipes straight away.
            </p>
            <div className="animate-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '270ms' }}>
              <button
                type="button"
                onClick={onFinder}
                className="shine-btn group inline-flex items-center gap-3 rounded-full bg-tomato px-8 py-4 text-lg font-bold text-white shadow-lift transition hover:-translate-y-1 hover:bg-tomato-2 active:scale-95"
              >
                Find my meal
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <p className="text-sm font-medium text-ink-soft">
                {RECIPES.length.toLocaleString()} recipes · {INGREDIENTS.length} ingredients · free &amp; offline
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div ref={heroImg} className="relative will-change-transform">
              <div className="animate-rise relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-cream-2 shadow-lift ring-8 ring-white" style={{ animationDelay: '150ms' }}>
                <img
                  src="./hero.jpg"
                  alt="A kitchen table laid with eggs, sourdough, tomatoes, garlic, spinach, lemons and a bowl of pasta"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
              </div>
              <Sticker className="-left-3 top-10 sm:-left-8" r="-8deg" delay="0s">🍅</Sticker>
              <Sticker className="-right-2 top-24 sm:-right-6" r="9deg" delay="1.2s">🧄</Sticker>
              <Sticker className="-left-2 bottom-28 sm:-left-8" r="6deg" delay="2.1s">🥚</Sticker>
              <Sticker className="-right-1 bottom-10 sm:-right-5" r="-7deg" delay="0.7s">🍋</Sticker>
              <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-5 py-3.5 text-center shadow-lift">
                <p className="text-sm font-semibold text-forest-deep">
                  <span aria-hidden="true">✨ </span>Three odd ingredients? That’s a dinner.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* key figures */}
        <div className="relative mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <Reveal>
            <h2 className="sr-only">Key figures</h2>
            <div className="on-dark overflow-hidden rounded-[2rem] bg-forest-deep text-cream shadow-lift">
              <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {FIGURES.map((f, i) => (
                  <li key={i} className="bg-forest-deep p-6 sm:p-7">
                    <p className="font-serif text-5xl font-bold tracking-tight text-mustard">
                      <CountUp to={f.to} dec={f.dec} pre={f.pre} post={f.post} />
                    </p>
                    <p className="mt-2 text-sm leading-snug text-cream/90">{f.label}</p>
                    <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-wider text-cream/50">Source: {f.src}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ingredient ticker */}
        <div className="marquee mt-8 overflow-hidden border-y border-forest/10 bg-white/50 py-3" aria-hidden="true">
          <div className="marquee-track flex w-max gap-3 whitespace-nowrap">
            {[...marquee, ...marquee].map((ing, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-forest ring-1 ring-forest/10">
                <span>{ing.emoji}</span>
                {ing.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 2. THE PROBLEM ========================= */}
      <section id="problem" aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-tomato">The problem</p>
            <h2 id="problem-title" className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep sm:text-5xl">
              The bin isn’t at the supermarket. It’s in <em className="swash">your kitchen</em>.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                In 2022 the world wasted <strong className="text-forest-deep">1.05 billion tonnes of food</strong>: 132 kg for every person on the planet, about 19% of all the food available to consumers.
              </p>
              <p>
                Restaurants and shops get the headlines, but <strong className="text-forest-deep">60% of it, 631 million tonnes, came from households</strong>. That’s 79 kg per person per year, and at least a billion meals binned every day, while 783 million people were affected by hunger.
              </p>
              <p>
                It’s heavy on the climate too: food loss and waste causes roughly <strong className="text-forest-deep">8–10% of global greenhouse gas emissions</strong>.
              </p>
              <p>
                And it’s rarely laziness. We shop without knowing what we already have, then stare into the fridge at three odd ingredients and can’t invent a meal. That’s a <em>planning</em> problem, and planning problems have practical fixes.
              </p>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft/70">Source: {SOURCE_SHORT}</p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
                <img src="./fridge.jpg" alt="An open fridge with half-used vegetables, jars and leftovers" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" />
              </div>
              <figure className="on-dark relative -mt-14 ml-4 rotate-[-1.5deg] rounded-[1.75rem] bg-forest p-7 text-cream shadow-lift sm:ml-8 sm:p-8">
                <span aria-hidden="true" className="absolute -top-6 left-6 font-serif text-8xl leading-none text-mustard">“</span>
                <blockquote className="pt-5 font-serif text-2xl font-bold leading-snug sm:text-[1.7rem]">
                  Waste is a <em className="swash">planning problem</em>, not a willpower problem.
                </blockquote>
                <figcaption className="mt-4 text-sm leading-relaxed text-cream/85">
                  So don’t start with willpower. Start with the fridge in front of you.
                </figcaption>
                <button
                  type="button"
                  onClick={onFinder}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-mustard px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-mustard-2"
                >
                  Try the fridge finder <span aria-hidden="true">↓</span>
                </button>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= 3. THE FINDER ========================= */}
      <section id="finder" aria-labelledby="finder-title" className="relative bg-gradient-to-b from-cream-2/80 via-cream-2 to-cream-2/80 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-tomato">The fridge finder</p>
            <h2 id="finder-title" className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep sm:text-6xl">
              Tick what you’ve <em className="swash">got</em>. We’ll do the thinking.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              Choose from {INGREDIENTS.length} everyday ingredients. Recipes update the instant you tick, ranked by how much of <em>your</em> food they use and how little you’d need to buy.
            </p>
          </Reveal>
          <Finder fridge={fridge} />
        </div>
      </section>

      {/* ======================== 4. STORAGE HABITS ======================== */}
      <section id="habits" aria-labelledby="habits-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-widest text-tomato">Keep it longer</p>
            <h2 id="habits-title" className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep sm:text-5xl">
              Six small habits that make food <em className="swash">last</em>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">
              The cheapest recipe is the one you didn’t have to rescue. These take seconds and quietly stretch your shop.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
              <img src="./storage.jpg" alt="Fresh herbs standing in a jar of water next to a loaf of bread and a crate of vegetables" loading="lazy" className="h-56 w-full object-cover transition duration-700 hover:scale-105 sm:h-64" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HABITS.map((h, i) => (
            <Reveal as="li" key={h.title} delay={(i % 3) * 90}>
              <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span aria-hidden="true" className="absolute right-5 top-4 font-serif text-6xl font-bold text-cream-2 transition group-hover:text-mustard/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl bg-cream text-3xl transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-mustard/30">
                  {h.emoji}
                </span>
                <h3 className="mt-5 text-xl font-bold text-forest-deep">{h.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{h.text}</p>
                <p className="mt-4 border-t border-dashed border-cream-3 pt-3 text-sm font-semibold text-forest">
                  <span aria-hidden="true">✓ </span>{h.why}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============================ 5. CTA ============================ */}
      <section aria-labelledby="cta-title" className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="on-dark relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-16 text-center text-cream shadow-lift sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-mustard/20 blur-2xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-tomato/30 blur-3xl" />
            <p aria-hidden="true" className="relative text-5xl">🥕 🍅 🧅</p>
            <h2 id="cta-title" className="relative mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Open the fridge. Tick three things. <em className="swash">Dinner’s sorted.</em>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-cream/85">
              Every meal you make from what you already own is food that stays out of the bin, and money that stays in your pocket.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={onFinder}
                className="shine-btn rounded-full bg-tomato px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-tomato-2 active:scale-95"
              >
                Open the fridge finder
              </button>
              <button
                type="button"
                onClick={() => go('/recipes')}
                className="rounded-full border-2 border-cream/60 px-8 py-4 text-lg font-bold text-cream transition hover:-translate-y-1 hover:bg-cream hover:text-forest"
              >
                Browse all {RECIPES.length.toLocaleString()} recipes
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function Sticker({ children, className, r, delay }: { children: string; className: string; r: string; delay: string }) {
  return (
    <span
      aria-hidden="true"
      className={`animate-float absolute grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-lift sm:h-16 sm:w-16 sm:text-4xl ${className}`}
      style={{ ['--r' as string]: r, animationDelay: delay }}
    >
      {children}
    </span>
  )
}
