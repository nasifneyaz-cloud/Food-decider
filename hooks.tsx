import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'
import { BY_ID } from './ingredients'

/* ---------- tiny hash router (works on GitHub Pages & offline) ---------- */
export const ROUTES = ['/', '/finder', '/recipes', '/facts'] as const
export type Route = (typeof ROUTES)[number]

const parse = (): Route => {
  const h = window.location.hash.replace(/^#/, '')
  return (ROUTES as readonly string[]).includes(h) ? (h as Route) : '/'
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse)
  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export const go = (r: Route) => {
  window.location.hash = r
}

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- the fridge (selected ingredients), saved only on this device ---------- */
const KEY = 'use-it-up.fridge.v1'

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((id: string) => BY_ID.has(id)) : []
  } catch {
    return []
  }
}

export interface Fridge {
  sel: Set<string>
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  setAll: (ids: string[]) => void
}

export function useFridge(): Fridge {
  const [sel, setSel] = useState<Set<string>>(() => new Set(load()))
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...sel]))
    } catch {
      /* storage may be unavailable; that's fine */
    }
  }, [sel])
  return {
    sel,
    toggle: (id) =>
      setSel((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
    remove: (id) =>
      setSel((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      }),
    clear: () => setSel(new Set()),
    setAll: (ids) => setSel(new Set(ids)),
  }
}

/* ---------- in-view helper ---------- */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, seen] as const
}

/* ---------- scroll-reveal wrapper ---------- */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const [ref, seen] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ---------- count-up number ---------- */
export function CountUp({
  to,
  dec = 0,
  pre = '',
  post = '',
}: {
  to: number
  dec?: number
  pre?: string
  post?: string
}) {
  const [ref, seen] = useInView<HTMLSpanElement>('0px')
  const [val, setVal] = useState(prefersReduced() ? to : 0)
  useEffect(() => {
    if (!seen) return
    if (prefersReduced()) {
      setVal(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const dur = 1500
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setVal(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return (
    <span ref={ref}>
      {pre}
      {val.toFixed(dec)}
      {post}
    </span>
  )
}
