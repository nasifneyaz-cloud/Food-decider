import { useCallback, useEffect, useRef } from 'react'
import { go, prefersReduced, useFridge, useRoute } from './hooks'
import { Footer, Header } from './Layout'
import Home from './Home'
import RecipeBook from './RecipeBook'
import Facts from './Facts'

export default function App() {
  const route = useRoute()
  const fridge = useFridge()
  const pendingFinder = useRef(false)
  const first = useRef(true)
  const mainRef = useRef<HTMLElement>(null)

  const scrollToFinder = useCallback(() => {
    const el = document.getElementById('finder')
    if (el) el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  }, [])

  const onFinder = useCallback(() => {
    if (route === '/') scrollToFinder()
    else {
      pendingFinder.current = true
      go('/')
    }
  }, [route, scrollToFinder])

  // On page change: jump to the finder if asked, otherwise return to the top and move focus to the content.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (pendingFinder.current && route === '/') {
      pendingFinder.current = false
      requestAnimationFrame(() => requestAnimationFrame(scrollToFinder))
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus({ preventScroll: true })
  }, [route, scrollToFinder])

  useEffect(() => {
    const titles = {
      '/': 'Use It Up — cook what you already have',
      '/recipes': 'Recipe book — Use It Up',
      '/facts': 'The facts & sources — Use It Up',
    } as const
    document.title = titles[route]
  }, [route])

  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); mainRef.current?.focus() }}>
        Skip to content
      </a>
      <Header route={route} onFinder={onFinder} />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none focus-visible:shadow-none">
        {route === '/' && <Home fridge={fridge} onFinder={onFinder} />}
        {route === '/recipes' && <RecipeBook fridge={fridge} onFinder={onFinder} />}
        {route === '/facts' && <Facts onFinder={onFinder} />}
      </main>
      <Footer />
    </>
  )
}
