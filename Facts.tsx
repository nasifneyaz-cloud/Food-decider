import { Reveal, CountUp } from './hooks'
import { FIGURES, SECTORS, PLAN_STEPS, SOURCE_SHORT, SOURCE_URL } from './content'
import { INGREDIENTS } from './ingredients'
import { RECIPES } from './recipes'

export default function Facts({ onFinder }: { onFinder: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
      <Reveal className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-tomato">The facts</p>
        <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-forest-deep sm:text-6xl">
          The numbers behind the <em className="swash">bin</em>
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          Every statistic on this site comes from one place, and is labelled so you can check it yourself.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ...FIGURES,
          { to: 132, post: ' kg', label: 'of food wasted per person worldwide in 2022 (all sectors combined).', src: 'UNEP Food Waste Index 2024' },
          { to: 79, post: ' kg', label: 'wasted per person, per year, in households.', src: 'UNEP Food Waste Index 2024' },
          { to: 19, post: '%', label: 'of all food available to consumers was wasted in 2022.', src: 'UNEP Food Waste Index 2024' },
        ].map((f, i) => (
          <Reveal as="li" key={i} delay={(i % 3) * 80}>
            <div className="h-full rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
              <p className="font-serif text-5xl font-bold text-tomato">
                <CountUp to={f.to} dec={(f as { dec?: number }).dec} post={f.post} />
              </p>
              <p className="mt-3 leading-snug text-ink">{f.label}</p>
              <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft/70">Source: {f.src}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* who wastes it */}
      <Reveal className="mt-16">
        <div className="rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-black/5 sm:p-10">
          <h2 className="text-3xl font-bold text-forest-deep sm:text-4xl">Who wastes it? <em className="swash">Mostly us.</em></h2>
          <p className="mt-2 text-ink-soft">Share of the 1.05 billion tonnes wasted in 2022, by sector.</p>
          <div className="mt-8 flex h-14 overflow-hidden rounded-full ring-1 ring-black/10" role="img" aria-label="Households 60 percent, food service 28 percent, retail 12 percent">
            {SECTORS.map((s) => (
              <div key={s.label} className={`${s.color} grid place-items-center text-sm font-bold ${s.label === 'Food service' ? 'text-ink' : 'text-white'}`} style={{ width: `${s.share}%` }}>
                {s.share}%
              </div>
            ))}
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {SECTORS.map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                <span className={`h-4 w-4 rounded-full ${s.color}`} aria-hidden="true" />
                <span className="text-sm"><strong>{s.label}</strong>: {s.mt} million tonnes</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft/70">Source: {SOURCE_SHORT}</p>
        </div>
      </Reveal>

      {/* plan */}
      <section className="mt-20" aria-labelledby="plan-title">
        <Reveal className="max-w-2xl">
          <h2 id="plan-title" className="text-4xl font-bold leading-tight text-forest-deep sm:text-5xl">
            A <em className="swash">planning</em> problem has a planning fix
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {PLAN_STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 100}>
              <div className="on-dark h-full rounded-[1.75rem] bg-forest p-7 text-cream shadow-soft">
                <span className="font-serif text-6xl font-bold text-mustard">{s.n}</span>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-cream/85">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* how it works */}
      <section className="mt-20 grid gap-8 lg:grid-cols-2" aria-labelledby="how-title">
        <Reveal>
          <h2 id="how-title" className="text-3xl font-bold text-forest-deep sm:text-4xl">How the finder works</h2>
          <ul className="mt-5 space-y-3 text-ink-soft">
            <li className="flex gap-3"><span aria-hidden="true">🥚</span><span>Pick from <strong>{INGREDIENTS.length}</strong> ingredients across vegetables, fruit, dairy, meat &amp; fish, beans, grains, herbs, nuts, tins and drinks.</span></li>
            <li className="flex gap-3"><span aria-hidden="true">📊</span><span>Each of the <strong>{RECIPES.length.toLocaleString()}</strong> recipes is ranked by how many of your ingredients it uses, then by how few it is missing.</span></li>
            <li className="flex gap-3"><span aria-hidden="true">🧂</span><span>Cupboard basics such as oil, salt, pepper and water are assumed and listed on each card.</span></li>
            <li className="flex gap-3"><span aria-hidden="true">🥨</span><span>Filter by snack, real meal or beverage, or search by name.</span></li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-3xl font-bold text-forest-deep sm:text-4xl">Private &amp; offline</h2>
          <ul className="mt-5 space-y-3 text-ink-soft">
            <li className="flex gap-3"><span aria-hidden="true">🔒</span><span>No accounts, no forms, no tracking and no ads.</span></li>
            <li className="flex gap-3"><span aria-hidden="true">💾</span><span>Your fridge list is saved only in this browser, on this device.</span></li>
            <li className="flex gap-3"><span aria-hidden="true">✈️</span><span>After your first visit, the whole site works without a connection, so it’s fine in a kitchen with bad Wi-Fi. You can also install it on your phone’s home screen.</span></li>
          </ul>
        </Reveal>
      </section>

      {/* sources */}
      <Reveal className="mt-20">
        <section aria-labelledby="sources-title" className="rounded-[2rem] bg-cream-2 p-7 sm:p-10">
          <h2 id="sources-title" className="text-3xl font-bold text-forest-deep">Sources &amp; notes</h2>
          <ul className="mt-4 space-y-3 text-ink-soft">
            <li>
              <a className="font-semibold text-forest underline decoration-mustard decoration-2 underline-offset-4 hover:text-tomato" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                {SOURCE_SHORT}
              </a>
              , by the United Nations Environment Programme (UNEP) with WRAP. The source for the waste, household, per-person, hunger and emissions figures above.
            </li>
            <li>Figures describe 2022, the latest year covered by that report. Totals are estimates and are rounded.</li>
            <li><strong>Please note:</strong> the recipes are general guidance, not food-safety advice. Always check dates and cook meat and fish thoroughly. Follow the storage and allergy information on your food and from your local food-safety authority.</li>
          </ul>
          <button type="button" onClick={onFinder} className="mt-6 rounded-full bg-tomato px-7 py-3.5 font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-tomato-2">
            Back to the fridge finder →
          </button>
        </section>
      </Reveal>
    </div>
  )
}
