import { useId, useMemo, useState } from 'react'
import { BY_ID, cap } from './ingredients'
import { CATS, type Recipe } from './recipes'

const CAT_STYLE: Record<string, string> = {
  meal: 'bg-tomato text-white',
  snack: 'bg-mustard text-ink',
  drink: 'bg-forest-2 text-white',
}

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

const TILES = [
  'from-[#f9e3b4] to-[#f2b98b]',
  'from-[#d9ecc8] to-[#a9d29a]',
  'from-[#fbd9cf] to-[#f1a58f]',
  'from-[#f6e8a8] to-[#e9c25e]',
  'from-[#d8e6f0] to-[#a9c8de]',
  'from-[#ecd9ef] to-[#d3a9d9]',
]

interface Props {
  recipe: Recipe
  sel: Set<string>
  index?: number
  starter?: boolean
  perfect?: boolean // uses everything the person ticked
  defaultOpen?: boolean // show the method straight away
}

export default function RecipeCard({ recipe: r, sel, index = 0, starter = false, perfect = false, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  const { used, missing } = useMemo(() => {
    const u = r.uses.filter((id) => sel.has(id))
    const m = r.uses.filter((id) => !sel.has(id))
    return { used: u, missing: m }
  }, [r, sel])

  const cat = CATS.find((c) => c.id === r.cat)!
  const h = hashStr(r.id)
  const flip = h % 2 === 0
  const pos = `${35 + (h % 30)}% ${30 + ((h >> 3) % 40)}%`
  const lead = BY_ID.get(r.uses[0])
  const pct = r.uses.length ? Math.round((used.length / r.uses.length) * 100) : 0
  const complete = !starter && sel.size > 0 && missing.length === 0

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-lift animate-rise"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="relative h-44 overflow-hidden bg-cream-2 sm:h-48">
        {r.img ? (
          <img
            src={`./${r.img}.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-110"
            style={{ objectPosition: pos, transform: flip ? undefined : 'scaleX(-1)' }}
          />
        ) : (
          <div aria-hidden="true" className={`absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-br ${TILES[h % TILES.length]}`}>
            {r.uses.slice(0, 3).map((id, k) => (
              <span key={id} className={`transition duration-500 group-hover:scale-110 ${k === 0 ? 'text-7xl' : 'text-5xl opacity-90'}`}>
                {BY_ID.get(id)?.emoji}
              </span>
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />

        <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow ${CAT_STYLE[r.cat]}`}>
          <span aria-hidden="true">{cat.emoji}</span>
          {cat.label}
        </span>

        {complete ? (
          <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-bold text-forest shadow">
            ✓ You have it all
          </span>
        ) : perfect && !starter ? (
          <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-bold text-forest shadow">
            ✓ Uses your picks
          </span>
        ) : null}
        {starter && (
          <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-bold text-forest shadow">
            Starter idea
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-cream">
          <p className="flex gap-3 text-sm font-semibold">
            <span><span aria-hidden="true">⏱ </span>{r.time} min</span>
            <span><span aria-hidden="true">🍽 </span>Serves {r.serves}</span>
          </p>
          {lead && (
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-cream text-2xl shadow-lg transition group-hover:rotate-12 group-hover:scale-110">
              {lead.emoji}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-[1.35rem] font-bold leading-snug text-forest-deep">{r.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{r.blurb}</p>
        </div>

        {!starter && sel.size > 0 ? (
          <div>
            <div className="mb-1.5 flex items-baseline justify-between text-xs font-semibold text-ink-soft">
              <span>
                You have <strong className="text-forest">{used.length}</strong> of {r.uses.length}
              </span>
              <span>{missing.length === 0 ? 'Nothing to buy' : `${missing.length} missing`}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cream-2" role="presentation">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest-2 to-mustard transition-[width] duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="space-y-2.5 text-sm">
          {used.length > 0 && (
            <div>
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-wider text-forest">Uses from your fridge</p>
              <ul className="flex flex-wrap gap-1.5">
                {used.map((id) => {
                  const ing = BY_ID.get(id)!
                  return (
                    <li key={id} className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 font-medium text-forest">
                      <span aria-hidden="true">{ing.emoji}</span>
                      <span className="sr-only">Have: </span>
                      {cap(ing.name)}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {missing.length > 0 && (
            <div>
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-wider text-tomato-2">
                {starter || sel.size === 0 ? "You'll need" : 'Still missing'}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {missing.map((id) => {
                  const ing = BY_ID.get(id)!
                  return (
                    <li key={id} className="inline-flex items-center gap-1 rounded-full border border-dashed border-tomato/60 bg-tomato/5 px-2.5 py-1 font-medium text-tomato-2">
                      <span aria-hidden="true">{ing.emoji}</span>
                      <span className="sr-only">Missing: </span>
                      {cap(ing.name)}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {r.basics.length > 0 && (
            <p className="text-xs italic text-ink-soft">
              <span className="font-semibold not-italic">Cupboard basics assumed:</span> {r.basics.join(', ')}.
            </p>
          )}
        </div>

        <div className="mt-auto">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-2xl bg-cream px-4 py-3 text-left text-sm font-bold text-forest transition hover:bg-cream-2"
          >
            <span><span aria-hidden="true">📖 </span>{open ? 'Hide method' : `How to cook it (${r.steps.length} steps)`}</span>
            <span aria-hidden="true" className={`grid h-6 w-6 place-items-center rounded-full bg-forest text-cream transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>
          <div id={panelId} className="collapse" data-open={open} inert={!open} role="region" aria-label={`Method for ${r.name}`}>
            <div>
              <ol className="mt-3 space-y-3 pl-1 text-sm leading-relaxed text-ink">
                {r.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mustard text-xs font-bold text-ink" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
