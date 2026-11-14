import { useCallback, useEffect, useRef } from 'react'
import { go, useFridge, useRoute } from './hooks'
import { Footer, Header } from './Layout'
import Home from './Home'
import FinderPage from './FinderPage'
import RecipeBook from './RecipeBook'
import Facts from './Facts'

export default function App() {
  const route = useRoute()
  const fridge = useFridge()
  const first = useRef(true)
  const mainRef = useRef<HTMLElement>(null)

  const onFinder = useCallback(() => go('/finder'), [])

  // On page change: return to the top and move focus to the content.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus({ preventScroll: true })
  }, [route])

  useEffect(() => {
    const titles = {
      '/': 'Use It Up — cook what you already have',
      '/finder': 'Fridge finder — Use It Up',
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
        {route === '/' && <Home onFinder={onFinder} />}
        {route === '/finder' && <FinderPage fridge={fridge} />}
        {route === '/recipes' && <RecipeBook fridge={fridge} onFinder={onFinder} />}
        {route === '/facts' && <Facts onFinder={onFinder} />}
      </main>
      <Footer />
    </>
  )
}
