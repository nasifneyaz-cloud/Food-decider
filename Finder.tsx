import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { INGREDIENTS, GROUPS, POPULAR_INGREDIENTS, BY_ID, cap, type GroupId } from './ingredients'
import { RECIPES, CATS, STARTER_IDS, type Cat, type Recipe } from './recipes'
import type { Fridge } from './hooks'
import RecipeCard from './RecipeCard'

type CatFilter = 'all' | Cat
type GroupFilter = 'popular' | 'all' | GroupId

const STEP = 8

// Which ingredients are used by which category of recipe (so the tabs can narrow the chips).
const CAT_SETS: Record<Cat, Set<string>> = { snack: new Set(), meal: new Set(), drink: new Set() }
RECIPES.forEach((r) => r.uses.forEach((u) => CAT_SETS[r.cat].add(u)))

const PICK_GROUPS: Record<CatFilter, GroupId[]> = {
  all: ['v', 'm', 'd', 'l', 'g', 'f'],
  meal: ['v', 'm', 'd', 'l', 'g'],
  snack: ['f', 'd', 'g', 'n', 'v', 'l'],
  drink: ['f', 'd', 'k'],
}

interface Scored {
  r: Recipe
  used: number
  missing: number
}

export default function Finder({ fridge }: { fridge: Fridge }) {
  const { sel, toggle, remove, clear, setAll } = fridge
  const [cat, setCat] = useState<CatFilter>('all')
  const [group, setGroup] = useState<GroupFilter>('popular')
  const [query, setQuery] = useState('')
  const [near, setNear] = useState(false)
  const [limit, setLimit] = useState(STEP)
  const [popId, setPopId] = useState<string | null>(null)
  const [showJump, setShowJump] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // reset paging whenever the question changes
  useEffect(() => setLimit(STEP), [sel, cat, near])

  /* ---------- chips on screen ---------- */
  const q = query.trim().toLowerCase()
  const chips = useMemo(() => {
    return INGREDIENTS.filter((ing) => {
      if (cat !== 'all' && !CAT_SETS[cat].has(ing.id)) return false
      if (q) return ing.name.toLowerCase().includes(q)
      if (group === 'popular') return ing.popular
      if (group === 'all') return true
      return ing.group === group
    }).sort((a, b) => {
      if (q || group !== 'popular') return 0
      return POPULAR_INGREDIENTS.indexOf(a) - POPULAR_INGREDIENTS.indexOf(b)
    })
  }, [cat, group, q])

  const grouped = useMemo(() => {
    if (group !== 'all' && !q) return null
    return GROUPS.map((g) => ({ g, items: chips.filter((c) => c.group === g.id) })).filter((x) => x.items.length)
  }, [chips, group, q])

  /* ---------- ranking ----------
     1) recipes that use EVERYTHING you ticked, needing the fewest extras
     2) then the closest partial matches
     Inside each group the dish families are mixed so one kind of dish (say, pasta) never takes over. */
  const { scored, perfect } = useMemo(() => {
    if (sel.size === 0) return { scored: [] as Scored[], perfect: 0 }
    const all: Scored[] = []
    for (const r of RECIPES) {
      if (cat !== 'all' && r.cat !== cat) continue
      let used = 0
      for (const u of r.uses) if (sel.has(u)) used++
      if (!used) continue
      const missing = r.uses.length - used
      if (near && missing > 2) continue
      all.push({ r, used, missing })
    }
    all.sort(
      (a, b) =>
        b.used - a.used ||
        a.missing - b.missing ||
        Number(!!b.r.plain) - Number(!!a.r.plain) ||
        Number(!!b.r.featured) - Number(!!a.r.featured) ||
        a.r.time - b.r.time,
    )
    // mix families inside runs that have the same score
    const out: Scored[] = []
    let i = 0
    while (i < all.length) {
      let j = i
      while (j < all.length && all[j].used === all[i].used && all[j].missing === all[i].missing) j++
      const buckets = new Map<string, Scored[]>()
      for (const s of all.slice(i, j)) {
        const k = s.r.fam
        if (!buckets.has(k)) buckets.set(k, [])
        buckets.get(k)!.push(s)
      }
      const lists = [...buckets.values()]
      for (let n = 0; lists.some((l) => n < l.length); n++) for (const l of lists) if (n < l.length) out.push(l[n])
      i = j
    }
    const perfect = out.filter((s) => s.used === sel.size).length
    return { scored: out, perfect }
  }, [sel, cat, near])

  const starters = useMemo(() => {
    const byId = (id: string) => RECIPES.find((r) => r.id === id)!
    let list = STARTER_IDS.map(byId).filter((r) => cat === 'all' || r.cat === cat)
    if (list.length < 4) {
      const extra = RECIPES.filter((r) => (cat === 'all' || r.cat === cat) && !list.includes(r))
      list = [...list, ...extra]
    }
    return list.slice(0, 4)
  }, [cat])

  const shown: { r: Recipe; used?: number }[] = sel.size === 0 ? starters.map((r) => ({ r })) : scored.slice(0, limit).map((s) => ({ r: s.r, used: s.used }))
  const starterMode = sel.size === 0

  /* ---------- polite status for screen readers (and a friendly heading for everyone) ---------- */
  const status = starterMode
    ? 'Nothing ticked yet. Showing four easy starter recipes.'
    : scored.length === 0
      ? `No ${cat === 'all' ? '' : CATS.find((c) => c.id === cat)!.label.toLowerCase() + ' '}recipes match your ${sel.size} ingredient${sel.size === 1 ? '' : 's'} yet. Try another category or tick one more thing.`
      : perfect > 0
        ? `${perfect} recipe${perfect === 1 ? '' : 's'} use${perfect === 1 ? 's' : ''} everything you ticked. Closest other ideas follow underneath.`
        : `No recipe uses all ${sel.size} of your ingredients together, so here are the closest matches.`

  /* ---------- actions ---------- */
  const pickForMe = () => {
    const allowed = new Set(PICK_GROUPS[cat])
    const pool = INGREDIENTS.filter((i) => allowed.has(i.group) && (cat === 'all' || CAT_SETS[cat].has(i.id)))
    const chosen: string[] = []
    const copy = pool.slice()
    while (chosen.length < 3 && copy.length) {
      const k = Math.floor(Math.random() * copy.length)
      chosen.push(copy.splice(k, 1)[0].id)
    }
    setAll(chosen)
  }

  const onChip = (id: string) => {
    toggle(id)
    setPopId(id)
    window.setTimeout(() => setPopId((p) => (p === id ? null : p)), 400)
  }

  /* ---------- mobile "jump to results" button ---------- */
  useEffect(() => {
    const sec = sectionRef.current
    const res = resultsRef.current
    if (!sec || !res || typeof IntersectionObserver === 'undefined') return
    let inSection = false
    let resultsVisible = false
    const update = () => setShowJump(inSection && !resultsVisible)
    const a = new IntersectionObserver(([e]) => { inSection = e.isIntersecting; update() }, { threshold: 0.05 })
    const b = new IntersectionObserver(([e]) => { resultsVisible = e.isIntersecting; update() }, { threshold: 0.15 })
    a.observe(sec)
    b.observe(res)
    return () => { a.disconnect(); b.disconnect() }
  }, [])

  const jump = () => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const selectedList = [...sel].map((id) => BY_ID.get(id)!).filter(Boolean)

  return (
    <div ref={sectionRef} className="grid gap-8 lg:grid-cols-12 lg:items-start">
      {/* ------------------------- the picker ------------------------- */}
      <div className="thin-scroll lg:sticky lg:top-20 lg:col-span-5 lg:-mx-3 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:px-3 lg:py-2">
        <div className="rounded-[2rem] bg-white p-5 shadow-lift ring-1 ring-black/5 sm:p-6">
          {/* food type */}
          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-soft">What are you after?</legend>
            <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-cream p-1.5">
              {([{ id: 'all', label: 'Anything', emoji: '✨' }, ...CATS] as { id: CatFilter; label: string; emoji: string }[]).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`flex min-h-[3.25rem] flex-col items-center justify-center rounded-xl px-1 py-1.5 text-center text-[0.8rem] font-bold leading-tight transition sm:text-sm ${
                    cat === c.id ? 'bg-forest text-cream shadow-md' : 'text-forest hover:bg-white'
                  }`}
                >
                  <span aria-hidden="true" className="text-lg leading-none">{c.emoji}</span>
                  <span className="mt-0.5">{c.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* search */}
          <div className="relative mt-4">
            <label htmlFor="ing-search" className="sr-only">Search {INGREDIENTS.length} ingredients</label>
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              id="ing-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${INGREDIENTS.length} ingredients…`}
              autoComplete="off"
              className="w-full rounded-2xl border-2 border-cream-3 bg-cream/60 py-3 pl-11 pr-4 text-base text-ink placeholder:text-ink-soft/70 focus:border-forest focus:bg-white focus:outline-none"
            />
          </div>

          {/* groups */}
          <div className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-2 thin-scroll" role="group" aria-label="Ingredient groups">
            {([
              { id: 'popular', label: 'Everyday', emoji: '⭐' },
              { id: 'all', label: 'All', emoji: '🧺' },
              ...GROUPS,
            ] as { id: GroupFilter; label: string; emoji: string }[]).map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={!q && group === g.id}
                onClick={() => { setGroup(g.id); setQuery('') }}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  !q && group === g.id ? 'border-mustard bg-mustard text-ink' : 'border-cream-3 bg-white text-ink-soft hover:border-forest hover:text-forest'
                }`}
              >
                <span aria-hidden="true">{g.emoji} </span>{g.label}
              </button>
            ))}
          </div>

          {/* the chips */}
          <div
            className={`thin-scroll rounded-2xl ${group === 'popular' && !q ? '' : 'max-h-[19rem] overflow-y-auto pr-1'} `}
            role="group"
            aria-label="Ingredients. Press to tick or untick."
          >
            {chips.length === 0 && (
              <p className="rounded-2xl bg-cream p-4 text-sm text-ink-soft">
                No ingredient matches “{query}”{cat !== 'all' ? ' in this category' : ''}. Try a simpler word, or switch the category above.
              </p>
            )}
            {grouped ? (
              grouped.map(({ g, items }) => (
                <div key={g.id} className="mb-3">
                  <p className="sticky top-0 z-10 mb-1.5 bg-white/95 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-ink-soft backdrop-blur">
                    <span aria-hidden="true">{g.emoji} </span>{g.label} · {items.length}
                  </p>
                  <Chips items={items} sel={sel} onChip={onChip} popId={popId} />
                </div>
              ))
            ) : (
              <Chips items={chips} sel={sel} onChip={onChip} popId={popId} />
            )}
          </div>

          {/* your fridge */}
          <div className="mt-4 rounded-2xl bg-cream p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-forest-deep">
                In your fridge <span className="ml-1 rounded-full bg-forest px-2 py-0.5 text-xs text-cream">{sel.size}</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={pickForMe}
                  className="rounded-full bg-mustard px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                >
                  <span aria-hidden="true">🎲 </span>Pick for me
                </button>
                <button
                  type="button"
                  onClick={clear}
                  disabled={sel.size === 0}
                  className="rounded-full border-2 border-forest px-4 py-2 text-sm font-bold text-forest transition hover:bg-forest hover:text-cream disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-forest"
                >
                  Clear
                </button>
              </div>
            </div>
            {selectedList.length > 0 ? (
              <ul className="thin-scroll mt-3 flex max-h-28 flex-wrap gap-1.5 overflow-y-auto">
                {selectedList.map((ing) => (
                  <li key={ing.id}>
                    <button
                      type="button"
                      onClick={() => remove(ing.id)}
                      aria-label={`Remove ${ing.name}`}
                      className="group inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-forest shadow-sm ring-1 ring-forest/15 transition hover:bg-tomato hover:text-white hover:ring-tomato"
                    >
                      <span aria-hidden="true">{ing.emoji}</span>
                      {cap(ing.name)}
                      <span aria-hidden="true" className="ml-0.5 opacity-60 group-hover:opacity-100">✕</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink-soft">Nothing yet. Tap anything above, or let us pick three at random.</p>
            )}
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-medium text-ink-soft">
            <input
              type="checkbox"
              checked={near}
              onChange={(e) => setNear(e.target.checked)}
              className="h-5 w-5 rounded accent-forest"
            />
            Only show recipes missing two things or fewer
          </label>
        </div>
      </div>

      {/* ------------------------- the results ------------------------- */}
      <div ref={resultsRef} id="results" className="lg:col-span-7">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-forest-deep sm:text-3xl">
              {starterMode ? 'Four easy ways to start' : scored.length ? <>Cook this <em className="swash">tonight</em></> : 'Nothing quite fits yet'}
            </h3>
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-1 max-w-xl text-sm text-ink-soft"
            >
              {status}
            </p>
          </div>
          {!starterMode && scored.length > 0 && (
            <span className="rounded-full bg-forest px-4 py-1.5 text-sm font-bold text-cream">
              {(perfect || scored.length).toLocaleString()} {perfect ? 'exact ' : ''}match{(perfect || scored.length) === 1 ? '' : 'es'}
            </span>
          )}
        </div>

        {starterMode && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border-2 border-dashed border-mustard bg-mustard/15 p-4 text-sm text-forest-deep">
            <span aria-hidden="true" className="text-xl">💡</span>
            <p>
              <strong>Gentle hint:</strong> tick a few things you already have: even odd ones like half a cucumber or a lonely lemon.
              This list re-ranks itself instantly, with the recipes that use the <em>most</em> of your food first.
            </p>
          </div>
        )}

        {!starterMode && scored.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-soft">
            <p className="text-4xl" aria-hidden="true">🤔</p>
            <p className="mt-2 font-semibold text-forest-deep">We couldn’t find a match.</p>
            <p className="mt-1 text-sm text-ink-soft">Switch the category to “Anything”, turn off the “missing two or fewer” box, or tick another ingredient.</p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {shown.map(({ r }, i) => {
            const isPerfect = !starterMode && i < perfect
            return (
              <Fragment key={r.id}>
                {!starterMode && i === 0 && perfect > 0 && (
                  <div className="sm:col-span-2">
                    <h4 className="text-lg font-bold text-forest-deep">
                      <span aria-hidden="true">✅ </span>Uses {sel.size === 1 ? 'your ingredient' : `all ${sel.size} of your ingredients`} · {perfect}
                    </h4>
                    <p className="text-sm text-ink-soft">These recipes are built around what you ticked. Any extras they need are listed on each card.</p>
                  </div>
                )}
                {!starterMode && i === perfect && perfect > 0 && (
                  <div className="mt-4 sm:col-span-2">
                    <h4 className="text-lg font-bold text-forest-deep"><span aria-hidden="true">👀 </span>Also worth a look</h4>
                    <p className="text-sm text-ink-soft">These use some of your ingredients, but not all of them.</p>
                  </div>
                )}
                <RecipeCard recipe={r} sel={sel} index={i} starter={starterMode} perfect={isPerfect} defaultOpen={isPerfect && i < 4} />
              </Fragment>
            )
          })}
        </div>

        {!starterMode && scored.length > limit && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + STEP)}
              className="rounded-full bg-forest px-7 py-3.5 text-base font-bold text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-forest-2 active:scale-95"
            >
              Show {Math.min(STEP, scored.length - limit)} more recipes
            </button>
          </div>
        )}
      </div>

      {/* floating shortcut for phones */}
      {showJump && sel.size > 0 && (
        <button
          type="button"
          onClick={jump}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 animate-rise rounded-full bg-tomato px-6 py-3.5 text-sm font-bold text-white shadow-2xl ring-4 ring-cream lg:hidden"
        >
          See {scored.length.toLocaleString()} recipe{scored.length === 1 ? '' : 's'} ↓
        </button>
      )}
    </div>
  )
}

function Chips({
  items,
  sel,
  onChip,
  popId,
}: {
  items: typeof INGREDIENTS
  sel: Set<string>
  onChip: (id: string) => void
  popId: string | null
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((ing) => {
        const on = sel.has(ing.id)
        return (
          <li key={ing.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onChip(ing.id)}
              className={`inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition duration-200 active:scale-95 ${
                popId === ing.id ? 'animate-pop' : ''
              } ${
                on
                  ? 'border-forest bg-forest text-cream shadow-md'
                  : 'border-cream-3 bg-white text-ink hover:-translate-y-0.5 hover:border-forest hover:shadow-md'
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">{on ? '✓' : ing.emoji}</span>
              {cap(ing.name)}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
