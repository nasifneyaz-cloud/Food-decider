import { useMemo, useState } from 'react'
import RecipeCard from './RecipeCard'
import { RECIPES, CATS, SEARCH_INDEX, type Cat } from './recipes'
import type { Fridge } from './hooks'
import { Reveal } from './hooks'

const PAGE = 24
type Sort = 'best' | 'quick' | 'az'

export default function RecipeBook({ fridge, onFinder }: { fridge: Fridge; onFinder: () => void }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<'all' | Cat>('all')
  const [sort, setSort] = useState<Sort>('best')
  const [fridgeOnly, setFridgeOnly] = useState(false)
  const [limit, setLimit] = useState(PAGE)
  const { sel } = fridge

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
    const list = RECIPES.filter((r) => {
      if (cat !== 'all' && r.cat !== cat) return false
      if (fridgeOnly && !r.uses.some((u) => sel.has(u))) return false
      if (tokens.length) {
        const hay = SEARCH_INDEX.get(r.id)!
        if (!tokens.every((t) => hay.includes(t))) return false
      }
      return true
    })
    const score = (r: (typeof RECIPES)[number]) => r.uses.filter((u) => sel.has(u)).length
    if (sort === 'quick') list.sort((a, b) => a.time - b.time || a.name.localeCompare(b.name))
    else if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sel.size) list.sort((a, b) => score(b) - score(a) || a.uses.length - b.uses.length)
    else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return list
  }, [query, cat, sort, fridgeOnly, sel])

  const reset = <T,>(fn: (v: T) => void) => (v: T) => { fn(v); setLimit(PAGE) }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
      <Reveal className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-tomato">The recipe book</p>
        <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-forest-deep sm:text-6xl">
          {RECIPES.length.toLocaleString()} simple ways to <em className="swash">use it up</em>
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          Search by dish or ingredient (try “lemon”, “chickpeas” or “smoothie”), then narrow by snack, real meal or beverage.
        </p>
      </Reveal>

      <div className="z-30 mt-8 rounded-[1.75rem] bg-white/95 p-4 shadow-lift ring-1 ring-black/5 backdrop-blur md:sticky md:top-[4.5rem]">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              id="recipe-search"
              type="search"
              value={query}
              onChange={(e) => reset(setQuery)(e.target.value)}
              placeholder="Search recipes or ingredients…"
              autoComplete="off"
              className="w-full rounded-2xl border-2 border-cream-3 bg-cream/60 py-3 pl-11 pr-4 text-base focus:border-forest focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex gap-1.5 md:col-span-5" role="group" aria-label="Food type">
            {([{ id: 'all', label: 'All', emoji: '✨' }, ...CATS] as { id: 'all' | Cat; label: string; emoji: string }[]).map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => reset(setCat)(c.id)}
                className={`flex-1 rounded-2xl px-2 py-2.5 text-sm font-bold transition ${
                  cat === c.id ? 'bg-forest text-cream shadow-md' : 'bg-cream text-forest hover:bg-cream-2'
                }`}
              >
                <span aria-hidden="true">{c.emoji} </span>{c.label}
              </button>
            ))}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="sort" className="sr-only">Sort recipes</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => reset(setSort)(e.target.value as Sort)}
              className="h-full w-full rounded-2xl border-2 border-cream-3 bg-cream/60 px-3 py-3 text-sm font-semibold text-forest focus:border-forest focus:outline-none"
            >
              <option value="best">{sel.size ? 'Best for my fridge' : 'Featured first'}</option>
              <option value="quick">Quickest first</option>
              <option value="az">A to Z</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p role="status" aria-live="polite" className="font-semibold text-ink-soft">
            {results.length.toLocaleString()} recipe{results.length === 1 ? '' : 's'}
            {query ? ` for “${query}”` : ''}
          </p>
          <label className={`flex items-center gap-2 font-medium ${sel.size ? 'cursor-pointer text-forest' : 'cursor-not-allowed text-ink-soft/60'}`}>
            <input
              type="checkbox"
              disabled={sel.size === 0}
              checked={fridgeOnly}
              onChange={(e) => reset(setFridgeOnly)(e.target.checked)}
              className="h-5 w-5 accent-forest"
            />
            Only recipes using my fridge ({sel.size})
          </label>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-soft">
          <p className="text-5xl" aria-hidden="true">🍽️</p>
          <p className="mt-3 text-lg font-bold text-forest-deep">No recipes found</p>
          <p className="mt-1 text-ink-soft">Try a shorter word, or clear the filters.</p>
          <button
            type="button"
            onClick={() => { setQuery(''); setCat('all'); setFridgeOnly(false) }}
            className="mt-5 rounded-full bg-forest px-6 py-3 font-bold text-cream"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, limit).map((r, i) => (
            <RecipeCard key={r.id} recipe={r} sel={sel} index={i % PAGE} />
          ))}
        </div>
      )}

      {results.length > limit && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="rounded-full bg-forest px-8 py-4 text-base font-bold text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-forest-2 active:scale-95"
          >
            Show {Math.min(PAGE, results.length - limit)} more · {(results.length - limit).toLocaleString()} left
          </button>
        </div>
      )}

      <div className="on-dark mt-16 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-forest p-7 text-cream">
        <p className="font-serif text-2xl font-bold">Not sure what to cook? <em className="swash">Start from your fridge.</em></p>
        <button type="button" onClick={onFinder} className="rounded-full bg-mustard px-6 py-3 font-bold text-ink transition hover:-translate-y-0.5">
          Open the fridge finder →
        </button>
      </div>
    </div>
  )
}
