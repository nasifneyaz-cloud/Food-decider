import Finder from './Finder'
import type { Fridge } from './hooks'
import { INGREDIENTS } from './ingredients'

export default function FinderPage({ fridge }: { fridge: Fridge }) {
  return (
    <section aria-labelledby="finder-title" className="bg-gradient-to-b from-cream-2/80 via-cream-2 to-cream-2/80 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-tomato">The fridge finder</p>
          <h1 id="finder-title" className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep sm:text-5xl">
            Tick what you’ve <em className="swash">got</em>. We’ll do the thinking.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Choose from {INGREDIENTS.length} everyday ingredients. Recipes that use <em>everything</em> you ticked come first, with the full method on each card.
          </p>
        </div>
        <Finder fridge={fridge} />
      </div>
    </section>
  )
}
