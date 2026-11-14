import { useEffect, useState } from 'react'
import { go, type Route } from './hooks'
import { RECIPES } from './recipes'
import { INGREDIENTS } from './ingredients'
import { SOURCE_SHORT, SOURCE_URL } from './content'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-9 w-9 drop-shadow" aria-hidden="true">
        <rect width="64" height="64" rx="15" fill={light ? '#faf3e3' : '#1f4d36'} />
        <circle cx="32" cy="32" r="21" fill={light ? '#1f4d36' : '#faf3e3'} />
        <circle cx="31" cy="34" r="10" fill="#d9432b" />
        <path d="M31 24c1-5 5-6 8-6-1 4-4 6-8 6z" fill="#4a8c52" />
      </svg>
      <span className="font-serif text-xl font-bold tracking-tight">
        Use <em className="italic text-tomato">it</em> Up
      </span>
    </span>
  )
}

export function Header({ route, onFinder }: { route: Route; onFinder: () => void }) {
  const link = (r: Route, label: string) => (
    <a
      href={`#${r}`}
      aria-current={route === r ? 'page' : undefined}
      className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition ${
        route === r ? 'bg-forest text-cream' : 'text-forest hover:bg-forest/10'
      }`}
    >
      {label}
    </a>
  )
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 sm:px-6">
        <a href="#/" className="text-forest-deep" aria-label="Use It Up, home">
          <Logo />
        </a>
        <nav aria-label="Main" className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto px-1 pb-1 sm:order-none sm:w-auto sm:pb-0">
          {link('/', 'Home')}
          <button
            type="button"
            onClick={onFinder}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-forest transition hover:bg-forest/10"
          >
            Fridge finder
          </button>
          {link('/recipes', 'Recipe book')}
          {link('/facts', 'The facts')}
        </nav>
        <button
          type="button"
          onClick={onFinder}
          className="shine-btn hidden rounded-full bg-tomato px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-tomato-2 md:inline-block"
        >
          Open my fridge →
        </button>
      </div>
    </header>
  )
}

interface InstallEvent extends Event {
  prompt: () => Promise<void>
}

export function Footer() {
  const [ready, setReady] = useState(false)
  const [installEv, setInstallEv] = useState<InstallEvent | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => setReady(true)).catch(() => undefined)
    }
    const on = (e: Event) => {
      e.preventDefault()
      setInstallEv(e as InstallEvent)
    }
    window.addEventListener('beforeinstallprompt', on)
    return () => window.removeEventListener('beforeinstallprompt', on)
  }, [])

  return (
    <footer className="on-dark relative mt-24 bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/80">
            Waste is a planning problem, not a willpower problem. Tick what you have, cook something good, and keep a little more food out of the bin.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {installEv && (
              <button
                type="button"
                onClick={() => { installEv.prompt(); setInstallEv(null) }}
                className="rounded-full bg-mustard px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5"
              >
                ⬇ Install the app
              </button>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${ready ? 'bg-emerald-400' : 'bg-mustard'}`} />
              {ready ? 'Saved on this device. Works offline.' : 'Will work offline after this first visit.'}
            </span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-mustard">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:underline" href="#/">Home</a></li>
            <li><button type="button" className="hover:underline" onClick={() => go('/')}>Fridge finder</button></li>
            <li><a className="hover:underline" href="#/recipes">Recipe book ({RECIPES.length.toLocaleString()})</a></li>
            <li><a className="hover:underline" href="#/facts">The facts &amp; sources</a></li>
          </ul>
          <p className="mt-5 text-xs text-cream/70">
            {INGREDIENTS.length} ingredients · {RECIPES.length.toLocaleString()} recipes
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-cream/75 md:col-span-4">
          <p>
            <strong className="text-cream">Sources.</strong> Statistics are from the{' '}
            <a className="underline decoration-mustard underline-offset-2 hover:text-white" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
              {SOURCE_SHORT}
            </a>
            , produced by UNEP.
          </p>
          <p>
            <strong className="text-cream">Please note.</strong> The recipes are general cooking guidance, not food-safety advice. Check dates, cook meat and fish thoroughly, reheat leftovers until piping hot, and follow the allergen and storage guidance on your food and from your local food-safety authority.
          </p>
          <p>No accounts, no tracking, no ads. Your fridge list never leaves this device.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/60">
        Made to keep good food on plates.
      </div>
    </footer>
  )
}
