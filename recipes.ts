import { INGREDIENTS, BY_NAME, cap, type Ingredient } from './ingredients'
import { makeSimple } from './simple'

export type Cat = 'snack' | 'meal' | 'drink'

export interface Recipe {
  id: string
  name: string
  cat: Cat
  time: number
  serves: number
  uses: string[] // ingredient ids
  basics: string[]
  steps: string[]
  blurb: string
  img: string // photo file name, or '' to draw an emoji tile instead
  fam: string // dish family, used to mix the results so one kind of dish never dominates
  plain?: boolean // a simple 2–3 ingredient classic
  featured?: boolean
}

export const CATS: { id: Cat; label: string; emoji: string; blurb: string }[] = [
  { id: 'snack', label: 'Snack', emoji: '🥨', blurb: 'Toast, bowls, bites & dips' },
  { id: 'meal', label: 'Real meal', emoji: '🍲', blurb: 'Dinners, lunches & big breakfasts' },
  { id: 'drink', label: 'Beverage', emoji: '🥤', blurb: 'Smoothies, teas, coolers & more' },
]

/* ------------------------------------------------------------------ */
/* The 15 hand-written core recipes — together they use all 26 basics */
/* ------------------------------------------------------------------ */

interface Core extends Omit<Recipe, 'uses' | 'id' | 'fam'> {
  uses: string[] // ingredient names
}

const CORE: Core[] = [
  {
    name: 'Spinach & mushroom omelette',
    cat: 'meal',
    time: 15,
    serves: 2,
    uses: ['eggs', 'spinach', 'mushrooms', 'cheese', 'butter'],
    basics: ['salt', 'black pepper'],
    blurb: 'The fastest way to rescue half a bag of spinach.',
    img: 'meal-3',
    steps: [
      'Slice the mushrooms. Melt half the butter in a non-stick frying pan over medium-high heat and fry the mushrooms for 4–5 minutes, until golden and the liquid has cooked off.',
      'Add a big handful of spinach and stir for about a minute until it wilts. Tip the lot onto a plate.',
      'Beat 3–4 eggs with a pinch of salt and pepper. Wipe the pan, melt the remaining butter and pour in the eggs. Swirl, then cook gently until set underneath but still a little glossy on top.',
      'Spoon the mushrooms and spinach over one half, scatter with grated cheese, then fold the omelette over. Give it 30 seconds and slide onto a plate.',
    ],
  },
  {
    name: 'Garlicky tomato pasta',
    cat: 'meal',
    time: 25,
    serves: 2,
    uses: ['pasta', 'tomatoes', 'garlic', 'onion'],
    basics: ['olive oil', 'salt', 'black pepper', 'pinch of sugar (optional)'],
    blurb: 'Soft, jammy tomatoes and plenty of garlic. Dinner in the time it takes the pasta to boil.',
    img: 'meal-1',
    steps: [
      'Bring a large pan of well-salted water to the boil and cook the pasta following the packet instructions. Scoop out a mug of the cooking water before draining.',
      'Meanwhile, finely chop the onion and cook it in a generous glug of olive oil over medium heat for 6–8 minutes until soft and sweet.',
      'Slice 3–4 garlic cloves and stir them in for 1 minute. Chop the tomatoes, add them with a pinch of salt (and sugar if they are a bit sharp) and cook for 8–10 minutes, squashing them with the spoon, until they break down into a sauce.',
      'Tip the drained pasta into the sauce with a splash of the cooking water. Toss over the heat for a minute until glossy, season and serve.',
    ],
  },
  {
    name: 'Chickpea & spinach stew with rice',
    cat: 'meal',
    time: 35,
    serves: 3,
    uses: ['chickpeas', 'spinach', 'tomatoes', 'onion', 'garlic', 'rice'],
    basics: ['oil', 'salt', 'black pepper', 'cumin or paprika (if you have it)'],
    blurb: 'Cheap, filling and ready in one pan. Better the next day, too.',
    img: 'meal-3',
    steps: [
      'Cook the rice following the packet instructions, then cover and keep warm.',
      'Chop the onion and soften it in oil in a wide pan for 6–8 minutes. Add 2–3 sliced garlic cloves (and a teaspoon of cumin or paprika if you have it) and cook for 1 minute.',
      'Add the chopped tomatoes and cook for 8 minutes until saucy. Drain and rinse the chickpeas, tip them in with 100 ml of water and simmer for 10 minutes.',
      'Stir in the spinach a handful at a time until wilted. Season well and serve spooned over the rice.',
    ],
  },
  {
    name: 'Egg fried rice with peas & carrot',
    cat: 'meal',
    time: 20,
    serves: 2,
    uses: ['rice', 'eggs', 'peas', 'carrots', 'onion'],
    basics: ['oil', 'soy sauce (if you have it)', 'salt', 'black pepper'],
    blurb: 'The best use of leftover rice there is. Cold rice fries up fluffier.',
    img: 'meal-3',
    steps: [
      'Use cold, leftover rice if you can (cool it quickly, keep it in the fridge and use within a day). Otherwise cook fresh rice, spread it on a tray and let it cool.',
      'Finely dice the onion and carrot. Heat a splash of oil in a large frying pan or wok and fry them for 4–5 minutes until just soft, adding the peas for the last 2 minutes.',
      'Push everything to one side, crack the eggs into the gap and scramble them until just set.',
      'Add the rice, breaking up any clumps, and stir-fry on high heat for 3–4 minutes until piping hot. Season with soy sauce, salt and pepper.',
    ],
  },
  {
    name: 'Banana oat pancakes',
    cat: 'snack',
    time: 20,
    serves: 2,
    uses: ['oats', 'bananas', 'eggs', 'milk'],
    basics: ['a little oil or butter for the pan', 'pinch of cinnamon (optional)'],
    blurb: 'A home for the spotty bananas nobody wants. No flour needed.',
    img: 'snack-2',
    steps: [
      'Mash 2 ripe bananas in a bowl until almost smooth. Beat in 2 eggs and a splash of milk.',
      'Stir in 100 g oats (blitz them first for smoother pancakes) and let the batter sit for 5 minutes to thicken.',
      'Heat a non-stick pan over medium heat with a little oil. Spoon in small rounds of batter and cook for 2–3 minutes until bubbles appear, then flip and cook for another 1–2 minutes.',
      'Serve warm with sliced banana or whatever fruit is going soft.',
    ],
  },
  {
    name: 'Cheesy bean toastie',
    cat: 'snack',
    time: 10,
    serves: 1,
    uses: ['bread', 'beans', 'cheese', 'butter'],
    basics: ['salt', 'black pepper'],
    blurb: 'Crisp outside, molten inside. A proper end-of-the-week lunch.',
    img: 'snack-1',
    steps: [
      'Drain a few spoonfuls of beans and warm them in a small pan, mashing about half. Season with salt and pepper.',
      'Butter one side of each slice of bread. Lay one slice butter-side down in a frying pan.',
      'Top with the beans and a thick layer of grated cheese, then finish with the second slice, butter-side up.',
      'Fry over medium heat for 3 minutes per side, pressing down, until golden and the cheese has melted. Cut in half and eat while hot.',
    ],
  },
  {
    name: 'Tuna, cucumber & lemon yogurt sandwich',
    cat: 'meal',
    time: 10,
    serves: 2,
    uses: ['tinned tuna', 'cucumber', 'yogurt', 'lemons', 'bread'],
    basics: ['salt', 'black pepper'],
    blurb: 'Lighter than mayo and fresher too: a lunchbox hero.',
    img: 'snack-1',
    steps: [
      'Drain the tuna and flake it into a bowl. Stir in 2–3 spoonfuls of yogurt, the zest of half a lemon and a squeeze of juice.',
      'Dice some cucumber, squeeze out any extra moisture with kitchen paper and fold it through. Season to taste.',
      'Pile onto bread (toasted if you like), top with a few cucumber slices and close up the sandwich.',
      'Keep any spare filling in a covered container in the fridge and eat within 24 hours.',
    ],
  },
  {
    name: 'One-tray lemon chicken & potatoes',
    cat: 'meal',
    time: 55,
    serves: 3,
    uses: ['chicken', 'potatoes', 'lemons', 'garlic', 'carrots'],
    basics: ['oil', 'salt', 'black pepper', 'dried herbs (optional)'],
    blurb: 'One tray, ten minutes of effort, and the oven does the rest.',
    img: 'meal-2',
    steps: [
      'Heat the oven to 200°C (180°C fan). Cut the potatoes and carrots into bite-sized chunks and spread them over a large roasting tray.',
      'Add the chicken pieces, 4–5 unpeeled garlic cloves and a lemon cut into wedges. Drizzle with oil, season well (add dried herbs if you have them) and toss everything together.',
      'Roast for 40–45 minutes, turning once, until the potatoes are golden and the chicken is cooked through: no pink in the middle and the juices run clear.',
      'Squeeze the roasted lemon over the tray and spoon the pan juices over everything.',
    ],
  },
  {
    name: 'Stuffed peppers with rice & beans',
    cat: 'meal',
    time: 50,
    serves: 3,
    uses: ['peppers', 'rice', 'beans', 'tomatoes', 'cheese', 'onion'],
    basics: ['oil', 'salt', 'black pepper', 'paprika or cumin (optional)'],
    blurb: 'Leftover rice and a tin of beans become something that looks like effort.',
    img: 'meal-3',
    steps: [
      'Heat the oven to 200°C (180°C fan). Halve the peppers lengthways, remove the seeds and set them cut-side up in a baking dish.',
      'Soften a chopped onion in oil for 5 minutes. Add the chopped tomatoes, cooked rice and drained beans, season (with paprika or cumin if you have it) and cook for 5 minutes.',
      'Spoon the filling into the peppers and cover the dish with foil. Bake for 25 minutes.',
      'Remove the foil, scatter with grated cheese and bake for 10 more minutes until melted, golden and the peppers are tender.',
    ],
  },
  {
    name: 'Creamy potato & pea soup',
    cat: 'meal',
    time: 35,
    serves: 3,
    uses: ['potatoes', 'peas', 'onion', 'garlic', 'milk', 'butter'],
    basics: ['water or stock', 'salt', 'black pepper'],
    blurb: 'Silky, gentle and comforting. Peas keep it bright and green.',
    img: 'meal-1',
    steps: [
      'Melt the butter in a large pan and gently cook a chopped onion for 6–8 minutes until soft but not coloured. Add 2 sliced garlic cloves for 1 minute.',
      'Add 3–4 diced potatoes and 600 ml hot water or stock. Bring to the boil, then simmer for 15 minutes until the potatoes are tender.',
      'Add the peas and cook for 3 more minutes. Pour in a good splash of milk.',
      'Blend until smooth (or mash for a chunky soup), season well and warm through without boiling.',
    ],
  },
  {
    name: 'Apple oat crumble pots',
    cat: 'snack',
    time: 35,
    serves: 3,
    uses: ['apples', 'oats', 'butter', 'lemons'],
    basics: ['sugar or honey', 'pinch of cinnamon (optional)'],
    blurb: 'Wrinkly apples taste wonderful once they are warm, sweet and crunchy-topped.',
    img: 'snack-2',
    steps: [
      'Heat the oven to 190°C (170°C fan). Peel, core and chop the apples and toss with a squeeze of lemon juice, a spoonful of sugar and a pinch of cinnamon. Divide between small ovenproof dishes.',
      'Rub 50 g cold butter into 80 g oats and 1–2 tablespoons of sugar with your fingertips until it looks like rough crumbs.',
      'Scatter the topping over the apples and bake for 20–25 minutes, until the fruit is bubbling and the top is golden.',
      'Leave to cool for 5 minutes. Good with a spoonful of yogurt.',
    ],
  },
  {
    name: 'Mushroom, pepper & potato hash with egg',
    cat: 'meal',
    time: 30,
    serves: 2,
    uses: ['potatoes', 'mushrooms', 'peppers', 'eggs', 'onion'],
    basics: ['oil', 'salt', 'black pepper', 'paprika (optional)'],
    blurb: 'A crispy-edged brunch that cleans out the veg drawer.',
    img: 'meal-3',
    steps: [
      'Dice the potatoes small and boil them for 5 minutes until just tender, then drain well and let them steam dry.',
      'Heat oil in a large frying pan and fry the potatoes over medium-high heat for 8–10 minutes, turning rarely, until crisp and golden.',
      'Add sliced onion, peppers and mushrooms and cook for 6–8 minutes more, seasoning well (and adding paprika if you like).',
      'Make 2 wells in the hash, crack in the eggs, cover the pan and cook for 3–4 minutes until the whites are set and the yolks are as runny as you like.',
    ],
  },
  {
    name: 'Tomato & bread soup',
    cat: 'meal',
    time: 30,
    serves: 2,
    uses: ['tomatoes', 'bread', 'garlic', 'onion'],
    basics: ['olive oil', 'water or stock', 'salt', 'black pepper'],
    blurb: 'A rustic Italian way to use stale bread and soft tomatoes.',
    img: 'meal-1',
    steps: [
      'Soften a chopped onion in plenty of olive oil for 6–8 minutes. Add 2–3 sliced garlic cloves and cook for 1 minute.',
      'Add the chopped tomatoes and cook for 8 minutes until they collapse. Pour in 500 ml hot water or stock and simmer for 10 minutes.',
      'Tear in a few handfuls of stale bread and stir. Let it sit for 5 minutes so the bread soaks up the soup.',
      'Beat it with a wooden spoon until thick and porridge-like, season well and finish with a drizzle of olive oil.',
    ],
  },
  {
    name: 'Banana, oat & yogurt smoothie',
    cat: 'drink',
    time: 5,
    serves: 2,
    uses: ['bananas', 'milk', 'yogurt', 'oats'],
    basics: ['ice (optional)', 'honey (optional)'],
    blurb: 'Breakfast in a glass and a good use for freezer-bound bananas.',
    img: 'drink-1',
    steps: [
      'Peel the bananas and break them into the blender (frozen slices make it thick and frosty).',
      'Add a few spoonfuls of yogurt, a handful of oats and 200 ml milk.',
      'Blend for 30–60 seconds until completely smooth. Add more milk if it is too thick, or a little honey if you like it sweeter.',
      'Pour into glasses and drink straight away.',
    ],
  },
  {
    name: 'Cucumber & lemon cooler',
    cat: 'drink',
    time: 5,
    serves: 2,
    uses: ['cucumber', 'lemons'],
    basics: ['cold water or sparkling water', 'ice', 'sugar or honey to taste'],
    blurb: 'Spa-day freshness from a limp cucumber and a lemon half.',
    img: 'drink-2',
    steps: [
      'Peel a few ribbons of cucumber for the glasses and roughly chop the rest.',
      'Blitz or muddle the chopped cucumber with the juice of 1–2 lemons and a spoonful of sugar or honey. Strain if you prefer it smooth.',
      'Fill glasses with ice and the cucumber ribbons, pour over the cucumber-lemon mix and top up with cold or sparkling water.',
      'Stir, taste and add more lemon or sweetener as you like.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Template engine for the remaining recipes                          */
/* ------------------------------------------------------------------ */

type Spec = string | { r: string; not?: string; re?: RegExp; nre?: RegExp }

interface Draft {
  name: string
  time: number
  serves: number
  steps: string[]
  basics?: string[]
  blurb: string
  uses?: Ingredient[]
}

interface Tpl {
  key: string
  cat: Cat
  img: string
  count: number
  slots: Record<string, Spec>
  make: (p: Record<string, Ingredient>, i: number) => Draft
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pool(spec: Spec): Ingredient[] {
  const s = typeof spec === 'string' ? { r: spec } : spec
  return INGREDIENTS.filter((ing) => {
    if (![...s.r].some((c) => ing.roles.includes(c))) return false
    if (s.not && [...s.not].some((c) => ing.roles.includes(c))) return false
    if (s.re && !s.re.test(ing.name)) return false
    if (s.nre && s.nre.test(ing.name)) return false
    return true
  })
}

function cycler(items: Ingredient[], seed: number) {
  const rand = mulberry32(seed)
  let order: Ingredient[] = []
  return () => {
    if (!order.length) {
      order = items.slice()
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
    }
    return order.pop()!
  }
}

const n = (x: Ingredient) => x.name
const OSP = ['oil', 'salt', 'black pepper']
const STICKS = /cucumber|carrots|celery|peppers|radishes|courgette|fennel|cherry tomatoes|mangetout|sugar snap|baby corn|beetroot|baby gem|tomatoes/
const WATERY = /cucumber|celery|fennel|cherry tomatoes|radishes|courgette|beetroot/
const pick = <T,>(arr: T[], i: number) => arr[i % arr.length]

const TPLS: Tpl[] = [
  /* ============================ REAL MEALS ============================ */
  {
    key: 'stirfry', cat: 'meal', img: 'meal-2', count: 45,
    slots: { m: 'TQ', a: 'V', b: 'V', s: 'Z', c: 'rn' },
    make: (p, i) => ({
      name: i % 2 ? `${cap(n(p.m))}, ${n(p.a)} & ${n(p.b)} stir-fry` : `${cap(n(p.m))} & ${n(p.a)} stir-fry with ${n(p.c)}`,
      time: 25, serves: 2, basics: ['oil', 'a splash of water'],
      blurb: pick(['Fast, hot and on the table in 25 minutes.', 'Weeknight cooking at its best: one pan, no fuss.', 'Crunchy veg, glossy sauce, and no delivery fee.'], i),
      steps: [
        `Cook the ${n(p.c)} following the packet instructions, drain and keep warm.`,
        `Slice the ${n(p.m)} into thin strips or bite-sized pieces. Cut the ${n(p.a)} and ${n(p.b)} into thin, even pieces so they cook quickly.`,
        `Heat a splash of oil in a wok or large frying pan over high heat. Add the ${n(p.m)} and cook for 4–6 minutes, stirring, until golden and cooked all the way through (no pink in the middle).`,
        `Add the ${n(p.a)} and ${n(p.b)} and stir-fry for 3–4 minutes until just tender but still with some bite.`,
        `Pour in a few spoonfuls of ${n(p.s)} with a splash of water and toss for 1 minute. Serve over the ${n(p.c)}.`,
      ],
    }),
  },
  {
    key: 'pasta-veg', cat: 'meal', img: 'meal-1', count: 28,
    slots: { n: 'N', v: 'V', d: 'D' },
    make: (p, i) => ({
      name: pick([`${cap(n(p.n))} with ${n(p.v)} & ${n(p.d)}`, `${cap(n(p.v))} & ${n(p.d)} ${n(p.n)}`], i),
      time: 25, serves: 2, basics: [...OSP],
      blurb: pick(['Soft, savoury veg and a cheesy finish.', 'A one-pan sauce made from what is in the veg drawer.', 'Simple, cosy and endlessly adaptable.'], i),
      steps: [
        `Bring a large pan of salted water to the boil and cook the ${n(p.n)} following the packet instructions. Before draining, scoop out a mug of the cooking water.`,
        `Meanwhile, chop the ${n(p.v)} and fry in a glug of oil over medium heat for 6–10 minutes, until soft and starting to colour.`,
        `Drain the pasta and tip it into the pan with the ${n(p.v)}. Add a splash of cooking water and toss until glossy.`,
        `Off the heat, stir through half the ${n(p.d)}, season to taste and finish with the rest on top.`,
      ],
    }),
  },
  {
    key: 'pasta-protein', cat: 'meal', img: 'meal-1', count: 28,
    slots: { n: 'N', m: 'TQI', v: 'V' },
    make: (p, i) => ({
      name: pick([`${cap(n(p.n))} with ${n(p.m)} & ${n(p.v)}`, `${cap(n(p.m))} & ${n(p.v)} ${n(p.n)}`], i),
      time: 30, serves: 2, basics: [...OSP, 'a splash of pasta water'],
      blurb: pick(['Hearty enough for a hungry crowd.', 'Protein, veg and carbs in one bowl.', 'A proper dinner from three ingredients and a pan.'], i),
      steps: [
        `Cook the ${n(p.n)} in plenty of salted boiling water following the packet instructions. Save a mug of the cooking water, then drain.`,
        `Cut the ${n(p.m)} into small pieces and fry in oil over medium-high heat for 5–8 minutes until golden and cooked all the way through (no pink in the middle).`,
        `Add the chopped ${n(p.v)} and cook for 5–6 minutes until tender. Season well.`,
        `Add the pasta and a splash of the cooking water, toss over the heat for a minute and serve.`,
      ],
    }),
  },
  {
    key: 'pasta-fish', cat: 'meal', img: 'meal-1', count: 22,
    slots: { n: 'N', f: 'f', v: 'V', c: { r: 'C', re: /lemon|lime/ } },
    make: (p, i) => ({
      name: `${cap(n(p.n))} with ${n(p.f)}, ${n(p.v)} & ${n(p.c)}`,
      time: 20, serves: 2, basics: [...OSP],
      blurb: pick(['A store-cupboard supper with a fresh squeeze of citrus.', 'Salty, zesty and fast.'], i),
      steps: [
        `Cook the ${n(p.n)} in salted boiling water following the packet instructions. Save a mug of cooking water, then drain.`,
        `While it cooks, soften the chopped ${n(p.v)} in oil over medium heat for 6–8 minutes.`,
        `Add the ${n(p.n)} to the pan with a splash of cooking water and toss. Flake in the ${n(p.f)} and warm everything through for a minute.`,
        `Finish with the zest and juice of the ${n(p.c)}, plenty of black pepper and a drizzle of oil.`,
      ],
    }),
  },
  {
    key: 'pasta-cream', cat: 'meal', img: 'meal-1', count: 22,
    slots: { n: 'N', v: 'V', k: { r: 'K', not: 'z' } },
    make: (p, i) => ({
      name: `${cap(n(p.n))} with creamy ${n(p.v)} sauce`,
      time: 25, serves: 2, basics: [...OSP],
      blurb: pick(['Comfort food that tastes like you tried harder.', 'Silky, mellow and ready in 25 minutes.'], i),
      steps: [
        `Cook the ${n(p.n)} in salted boiling water following the packet instructions. Save a mug of cooking water, then drain.`,
        `Fry the chopped ${n(p.v)} in oil for 8 minutes until soft.`,
        `Pour in a good splash of ${n(p.k)} and simmer gently for 3–4 minutes until it thickens slightly. Season well.`,
        `Toss in the pasta, loosen with cooking water if needed and serve with plenty of black pepper.`,
      ],
    }),
  },
  {
    key: 'pasta-sauce', cat: 'meal', img: 'meal-1', count: 26,
    slots: { n: 'N', a: 'A', v: 'V' },
    make: (p, i) => ({
      name: pick([`${cap(n(p.n))} with ${n(p.a)} & ${n(p.v)}`, `${cap(n(p.v))} ${n(p.n)} with ${n(p.a)}`], i),
      time: 25, serves: 2, basics: [...OSP],
      blurb: pick(['A jar plus fresh veg equals a proper sauce.', 'Quick, saucy and kid-friendly.', 'Turn a half-jar and a lone veg into dinner.'], i),
      steps: [
        `Cook the ${n(p.n)} in plenty of salted boiling water following the packet instructions. Save a mug of cooking water, then drain.`,
        `Chop the ${n(p.v)} and fry in oil for 6–8 minutes until tender.`,
        `Add the ${n(p.a)} and warm gently for 5–8 minutes, stirring, until hot and slightly thickened (let it bubble only lightly).`,
        `Toss the pasta through the sauce with a splash of cooking water and serve.`,
      ],
    }),
  },
  {
    key: 'pasta-bake', cat: 'meal', img: 'meal-1', count: 22,
    slots: { n: 'N', a: 'A', v: 'V', d: 'D' },
    make: (p, i) => ({
      name: `Baked ${n(p.n)} with ${n(p.v)}, ${n(p.a)} & ${n(p.d)}`,
      time: 45, serves: 4, basics: [...OSP],
      blurb: pick(['Bubbling, golden and perfect for feeding a crowd.', 'Make it ahead, then bake when you need it.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Boil the ${n(p.n)} for 2 minutes less than the packet says, then drain.`,
        `Soften the chopped ${n(p.v)} in oil for 6–8 minutes.`,
        `Mix the pasta, ${n(p.v)} and ${n(p.a)} in an ovenproof dish and season well. Top with the ${n(p.d)}.`,
        `Bake for 20–25 minutes until golden and bubbling at the edges. Rest for 5 minutes before serving.`,
      ],
    }),
  },
  {
    key: 'soup-root', cat: 'meal', img: 'meal-1', count: 28,
    slots: { v: 'V', o: 'O' },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.o)} soup`,
      time: 35, serves: 3, basics: ['oil', 'stock or water', 'salt', 'black pepper'],
      blurb: pick(['The ultimate rescue for veg that is past its best.', 'Warming, thrifty and freezes beautifully.'], i),
      steps: [
        `Chop the ${n(p.v)} and ${n(p.o)} into small, even pieces.`,
        `Soften the ${n(p.v)} in a splash of oil in a large pan for 5 minutes.`,
        `Add the ${n(p.o)} and 700 ml hot stock or water. Bring to the boil, then simmer for 15–20 minutes until everything is tender.`,
        `Blend until smooth (or mash for a rustic soup), season well and warm through.`,
      ],
    }),
  },
  {
    key: 'soup-pulse', cat: 'meal', img: 'meal-1', count: 28,
    slots: { l: 'Lg', v: 'V' },
    make: (p, i) => ({
      name: `${cap(n(p.l))} & ${n(p.v)} soup`,
      time: 40, serves: 3, basics: ['oil', 'stock or water', 'salt', 'black pepper'],
      blurb: pick(['Protein-packed, cheap and deeply satisfying.', 'A big pot that makes lunches for days.'], i),
      steps: [
        `Soften the chopped ${n(p.v)} in oil in a large pan for 6–8 minutes.`,
        `Add the ${n(p.l)} (drained and rinsed if tinned; if using dried lentils or split peas, add about 150 g) and 800 ml hot stock or water.`,
        `Simmer for 20–25 minutes (dried pulses need the full time) until everything is soft.`,
        `Mash or blend roughly to thicken, season well and serve.`,
      ],
    }),
  },
  {
    key: 'soup-cream', cat: 'meal', img: 'meal-1', count: 22,
    slots: { v: 'V', w: 'V', k: { r: 'K', not: 'z' } },
    make: (p, i) => ({
      name: `Creamy ${n(p.v)} & ${n(p.w)} soup`,
      time: 35, serves: 3, basics: ['oil', 'stock or water', 'salt', 'black pepper'],
      blurb: pick(['Velvety and mellow, a spoonful of calm.', 'Proof that blended veg is better than the sum of its parts.'], i),
      steps: [
        `Soften the chopped ${n(p.v)} and ${n(p.w)} in oil for 8 minutes without letting them brown.`,
        `Add 600 ml hot stock or water and simmer for 15 minutes until tender.`,
        `Blend until completely smooth, then stir in a good splash of ${n(p.k)}.`,
        `Warm through gently (don't let it boil), season well and serve.`,
      ],
    }),
  },
  {
    key: 'soup-green', cat: 'meal', img: 'meal-1', count: 18,
    slots: { g: 'G', o: 'O', v: 'V' },
    make: (p, i) => ({
      name: `${cap(n(p.g))} & ${n(p.o)} soup with ${n(p.v)}`,
      time: 35, serves: 3, basics: ['oil', 'stock or water', 'salt', 'black pepper'],
      blurb: pick(['A bowl of green goodness that tastes much richer than it is.', 'Brightly coloured, gently flavoured.'], i),
      steps: [
        `Soften the chopped ${n(p.v)} in oil for 5 minutes. Add the diced ${n(p.o)} and 700 ml hot stock or water.`,
        `Simmer for 15 minutes until the ${n(p.o)} is soft.`,
        `Add the ${n(p.g)} and cook for 2–3 minutes until just wilted so it stays bright.`,
        `Blend until smooth, season well and serve hot.`,
      ],
    }),
  },
  {
    key: 'omelette', cat: 'meal', img: 'meal-3', count: 18,
    slots: { e: 'E', g: 'GV', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.g))} & ${n(p.d)} omelette`,
      time: 12, serves: 1, basics: ['butter or oil', 'salt', 'black pepper'],
      blurb: pick(['Ready in 12 minutes flat.', 'Three eggs and whatever is lurking in the fridge.'], i),
      steps: [
        `Chop the ${n(p.g)} and cook in a little butter or oil in a non-stick pan for 3–5 minutes until soft. Tip onto a plate.`,
        `Beat 3 ${n(p.e)} with salt and pepper. Add a little more butter to the pan, pour in the eggs and swirl.`,
        `When the omelette is almost set but still glossy, add the ${n(p.g)} and ${n(p.d)} to one half.`,
        `Fold over, cook for 30 seconds and slide onto a plate.`,
      ],
    }),
  },
  {
    key: 'frittata', cat: 'meal', img: 'meal-3', count: 22,
    slots: { e: 'E', a: 'V', b: 'V', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.a))} & ${n(p.b)} frittata`,
      time: 25, serves: 3, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Eat it hot tonight, cold tomorrow.', 'The classic way to clear a veg drawer.'], i),
      steps: [
        `Heat the grill to high. Chop the ${n(p.a)} and ${n(p.b)} and fry in oil in an ovenproof frying pan for 6–8 minutes until soft.`,
        `Beat 6 ${n(p.e)} with salt, pepper and half the ${n(p.d)}. Pour into the pan.`,
        `Cook over low heat for 5–6 minutes until the edges are set, then scatter with the rest of the ${n(p.d)}.`,
        `Grill for 3–4 minutes until puffed and golden and the egg is set through. Rest for 5 minutes, then slice.`,
      ],
    }),
  },
  {
    key: 'scramble', cat: 'meal', img: 'meal-3', count: 14,
    slots: { e: 'E', v: 'V', h: 'H' },
    make: (p, i) => ({
      name: `Soft scrambled eggs with ${n(p.v)} & ${n(p.h)}`,
      time: 12, serves: 2, basics: ['butter or oil', 'salt', 'black pepper'],
      blurb: pick(['Slow, creamy scrambled eggs make anything feel special.', 'Brunch in ten minutes.'], i),
      steps: [
        `Dice the ${n(p.v)} and fry in a little butter for 4–6 minutes until just tender.`,
        `Beat 4 ${n(p.e)} with a pinch of salt. Turn the heat to low and pour into the pan.`,
        `Stir slowly with a spatula, pulling the eggs from the edges, for 2–3 minutes until softly set. Take off the heat while they still look a little wet.`,
        `Season, scatter with chopped ${n(p.h)} and serve straight away, with toast if you have it.`,
      ],
    }),
  },
  {
    key: 'baked-eggs', cat: 'meal', img: 'meal-3', count: 16,
    slots: { e: 'E', v: 'V', a: 'Ac' },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.a)} baked eggs`,
      time: 25, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['A shakshuka-style supper in one pan.', 'Saucy, spoonable and brilliant with bread.'], i),
      steps: [
        `Soften the chopped ${n(p.v)} in oil in a deep frying pan for 6–8 minutes.`,
        `Pour in the ${n(p.a)} and simmer for 8–10 minutes until thick. Season well.`,
        `Make 4 wells in the sauce and crack an egg into each. Cover the pan.`,
        `Cook for 6–8 minutes over low heat until the whites are set and the yolks are as runny as you like. Serve with bread.`,
      ],
    }),
  },
  {
    key: 'egg-muffins', cat: 'meal', img: 'meal-3', count: 12,
    slots: { e: 'E', m: { r: 'I', re: /bacon|ham|chorizo|salami|pancetta/ }, v: 'V', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} & ${n(p.v)} egg muffins`,
      time: 30, serves: 4, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Make-ahead breakfasts that reheat beautifully.', 'Pocket-friendly protein for lunchboxes.'], i),
      steps: [
        `Heat the oven to 190°C (170°C fan) and grease a 6-hole muffin tin.`,
        `Finely chop the ${n(p.m)} and ${n(p.v)}; fry for 5 minutes until cooked through and soft. Divide among the holes.`,
        `Beat 6 ${n(p.e)} with salt, pepper and the grated ${n(p.d)}. Pour over the filling.`,
        `Bake for 15–18 minutes until set and golden. Eat warm, or cool and refrigerate for up to 2 days.`,
      ],
    }),
  },
  {
    key: 'roast-meat', cat: 'meal', img: 'meal-2', count: 55,
    slots: { t: 'T', o: 'O', v: 'V', x: { r: 'X', nre: /saffron|curry leaves|bay leaves|lemongrass/ } },
    make: (p, i) => ({
      name: pick([`${cap(n(p.x))}-roasted ${n(p.t)} with ${n(p.o)} & ${n(p.v)}`, `Roasted ${n(p.t)} with ${n(p.o)}, ${n(p.v)} & ${n(p.x)}`], i),
      time: 60, serves: 3, basics: [...OSP],
      blurb: pick(['One tray, minimal washing up and a lot of flavour.', 'The oven does all the work.', 'A traybake that tastes like Sunday.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Cut the ${n(p.o)} and ${n(p.v)} into similar-sized chunks and spread over a large roasting tray.`,
        `Drizzle with oil and season with salt, pepper and the ${n(p.x)}. Toss everything together.`,
        `Nestle the ${n(p.t)} among the veg, rubbing it with a little oil and seasoning.`,
        `Roast for 35–45 minutes, turning the veg once, until everything is golden and the ${n(p.t)} is cooked through: no pink in the middle and the juices run clear.`,
        `Rest for 5 minutes before serving with the pan juices spooned over.`,
      ],
    }),
  },
  {
    key: 'roast-fish', cat: 'meal', img: 'meal-2', count: 22,
    slots: { q: 'Q', o: 'O', v: 'V', h: 'H' },
    make: (p, i) => ({
      name: `Oven-baked ${n(p.q)} with ${n(p.o)} & ${n(p.v)}`,
      time: 40, serves: 2, basics: [...OSP, 'lemon wedge (optional)'],
      blurb: pick(['Fresh-tasting and almost no effort.', 'Flaky fish over crispy veg.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Cut the ${n(p.o)} and ${n(p.v)} into small chunks, toss with oil, salt and pepper on a tray and roast for 20 minutes.`,
        `Season the ${n(p.q)} and nestle it among the veg.`,
        `Roast for a further 12–15 minutes, until the fish is opaque all the way through and flakes easily.`,
        `Scatter with chopped ${n(p.h)} and serve.`,
      ],
    }),
  },
  {
    key: 'curry-meat', cat: 'meal', img: 'meal-2', count: 28,
    slots: { t: 'T', v: 'V', y: 'Y', c: 'c', r: 'r' },
    make: (p, i) => ({
      name: `${cap(n(p.t))} & ${n(p.v)} curry with ${n(p.r)}`,
      time: 45, serves: 3, basics: ['oil', 'salt'],
      blurb: pick(['A mellow, fragrant curry from the cupboard.', 'Fakeaway that beats the real thing.'], i),
      steps: [
        `Cook the ${n(p.r)} following the packet instructions, then cover and keep warm.`,
        `Chop the ${n(p.v)} and soften in oil in a large pan for 5 minutes. Stir in a spoonful of ${n(p.y)} and cook for 1 minute until fragrant.`,
        `Add the ${n(p.t)}, cut into chunks, and brown for 5 minutes.`,
        `Pour in the ${n(p.c)} with 100 ml water, then simmer gently for 20–25 minutes until the sauce is thick and the ${n(p.t)} is cooked through (no pink in the middle).`,
        `Season and serve over the ${n(p.r)}.`,
      ],
    }),
  },
  {
    key: 'curry-veg', cat: 'meal', img: 'meal-2', count: 36,
    slots: { l: 'Lg', v: 'V', y: 'Y', c: 'c', r: 'r' },
    make: (p, i) => ({
      name: pick([`${cap(n(p.l))} & ${n(p.v)} curry`, `${cap(n(p.v))} & ${n(p.l)} curry with ${n(p.r)}`], i),
      time: 35, serves: 3, basics: ['oil', 'salt'],
      blurb: pick(['Vegetarian, hearty and cheap as chips.', 'A big pot of comfort that improves overnight.', 'Spiced, creamy and cooked in one pan.'], i),
      steps: [
        `Cook the ${n(p.r)} following the packet instructions, then cover and keep warm.`,
        `Soften the chopped ${n(p.v)} in oil for 5 minutes. Stir in a spoonful of ${n(p.y)} and cook for 1 minute.`,
        `Add the ${n(p.l)} (drained and rinsed if tinned; red lentils and split peas can go in dry, with an extra 200 ml water) and the ${n(p.c)}.`,
        `Simmer for 15–20 minutes (25 for dried pulses) until thick and the ${n(p.v)} is tender. Season and serve with the ${n(p.r)}.`,
      ],
    }),
  },
  {
    key: 'curry-spud', cat: 'meal', img: 'meal-2', count: 18,
    slots: { o: 'O', g: 'G', y: 'Y', c: 'c', r: 'r' },
    make: (p, i) => ({
      name: `${cap(n(p.o))} & ${n(p.g)} curry`,
      time: 40, serves: 3, basics: ['oil', 'salt'],
      blurb: pick(['Soft, spiced and surprisingly filling.', 'Tastes like a Friday-night treat.'], i),
      steps: [
        `Cook the ${n(p.r)} following the packet instructions, then keep warm.`,
        `Fry a spoonful of ${n(p.y)} in oil for 1 minute, then add the diced ${n(p.o)} and stir to coat.`,
        `Pour in the ${n(p.c)} and 150 ml water. Simmer for 15–20 minutes until the ${n(p.o)} is tender.`,
        `Stir in the ${n(p.g)} until wilted, season and serve over the ${n(p.r)}.`,
      ],
    }),
  },
  {
    key: 'curry-fish', cat: 'meal', img: 'meal-2', count: 14,
    slots: { q: 'Q', v: 'V', y: 'Y', c: 'c', r: 'r' },
    make: (p, i) => ({
      name: `${cap(n(p.q))} & ${n(p.v)} curry`,
      time: 30, serves: 2, basics: ['oil', 'salt'],
      blurb: pick(['Light, creamy and ready in half an hour.', 'Fish simmered gently in a fragrant sauce.'], i),
      steps: [
        `Cook the ${n(p.r)} following the packet instructions, then keep warm.`,
        `Soften the chopped ${n(p.v)} in oil for 5 minutes, then stir in a spoonful of ${n(p.y)} for 1 minute.`,
        `Add the ${n(p.c)} with 100 ml water and simmer for 8 minutes.`,
        `Add the ${n(p.q)} in chunks and cook gently for 4–6 minutes until opaque and cooked through. Serve over the ${n(p.r)}.`,
      ],
    }),
  },
  {
    key: 'fried-rice', cat: 'meal', img: 'meal-3', count: 18,
    slots: { r: 'r', e: 'E', a: 'V', b: 'V', z: 'Z' },
    make: (p, i) => ({
      name: `${cap(n(p.a))} & ${n(p.b)} egg fried rice`,
      time: 20, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Best made with cold leftover rice.', 'Everything-in-the-fridge fried rice.'], i),
      steps: [
        `Use cold leftover ${n(p.r)} if you can (cool it quickly, refrigerate and use within a day). Otherwise cook fresh and spread it out to cool.`,
        `Finely chop the ${n(p.a)} and ${n(p.b)} and stir-fry in oil in a wok or large pan for 4–5 minutes.`,
        `Push the veg aside, crack in the ${n(p.e)} and scramble until set.`,
        `Add the rice and stir-fry on high heat for 3–4 minutes until piping hot. Splash with ${n(p.z)} to taste.`,
      ],
    }),
  },
  {
    key: 'fried-rice-protein', cat: 'meal', img: 'meal-3', count: 18,
    slots: { r: 'r', m: { r: 'TQI', not: 'L' }, v: 'V', z: 'Z' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} & ${n(p.v)} fried rice`,
      time: 25, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['A one-pan supper with leftover rice.', 'Smoky, salty and so satisfying.'], i),
      steps: [
        `Use cold leftover ${n(p.r)} if you can, or cook and cool some (keep it chilled and use within a day).`,
        `Dice the ${n(p.m)} and fry in oil over high heat for 5–7 minutes until golden and cooked all the way through (no pink in the middle).`,
        `Add the diced ${n(p.v)} and cook for 3–4 minutes.`,
        `Tip in the rice and stir-fry until piping hot. Season with ${n(p.z)} and serve.`,
      ],
    }),
  },
  {
    key: 'salad-pulse', cat: 'meal', img: 'meal-3', count: 32,
    slots: { l: 'L', a: 'S', b: 'S', d: 'D', v: 'v' },
    make: (p, i) => ({
      name: `${cap(n(p.l))}, ${n(p.a)} & ${n(p.d)} salad`,
      time: 15, serves: 2, basics: ['olive oil', 'salt', 'black pepper'],
      blurb: pick(['A filling salad that works as a packed lunch.', 'No cooking, plenty of crunch.', 'A bowlful of fresh flavours and plant protein.'], i),
      steps: [
        `Drain and rinse the ${n(p.l)} if tinned, and tip into a large bowl.`,
        `Chop the ${n(p.a)} and ${n(p.b)} into bite-sized pieces and add to the bowl.`,
        `Whisk 3 tablespoons olive oil with a spoonful of ${n(p.v)}, salt and pepper, then pour over and toss.`,
        `Crumble or grate the ${n(p.d)} over the top and serve.`,
      ],
    }),
  },
  {
    key: 'grain-bowl', cat: 'meal', img: 'meal-3', count: 32,
    slots: { r: 'R', v: 'V', s: 'S', d: 'd' },
    make: (p, i) => ({
      name: `${cap(n(p.r))} bowl with roasted ${n(p.v)}, ${n(p.s)} & ${n(p.d)}`,
      time: 35, serves: 2, basics: [...OSP],
      blurb: pick(['A colourful bowl that looks like it came from a café.', 'Warm grains, fresh crunch and a creamy dollop.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Chop the ${n(p.v)}, toss with oil, salt and pepper and roast for 20–25 minutes until golden at the edges.`,
        `Meanwhile, cook the ${n(p.r)} following the packet instructions and drain well.`,
        `Chop the ${n(p.s)} into bite-sized pieces.`,
        `Divide the ${n(p.r)} between bowls, then top with the roasted ${n(p.v)}, the ${n(p.s)} and a big spoonful of ${n(p.d)}.`,
      ],
    }),
  },
  {
    key: 'pasta-salad', cat: 'meal', img: 'meal-3', count: 20,
    slots: { n: 'N', a: 'S', b: 'S', d: 'D', v: 'v' },
    make: (p, i) => ({
      name: `${cap(n(p.n))} salad with ${n(p.a)}, ${n(p.b)} & ${n(p.d)}`,
      time: 20, serves: 3, basics: ['olive oil', 'salt', 'black pepper'],
      blurb: pick(['Picnic-perfect and even better the next day.', 'Cold pasta, crunchy veg, big flavour.'], i),
      steps: [
        `Cook the ${n(p.n)} in salted boiling water following the packet instructions. Drain, rinse under cold water and drain again.`,
        `Chop the ${n(p.a)} and ${n(p.b)}.`,
        `Whisk 3 tablespoons olive oil with a spoonful of ${n(p.v)} and season. Toss through the pasta and veg.`,
        `Top with the ${n(p.d)} and serve at room temperature or chilled.`,
      ],
    }),
  },
  {
    key: 'fish-salad', cat: 'meal', img: 'meal-3', count: 22,
    slots: { f: 'f', g: 'G', s: 'S', c: { r: 'C', re: /lemon|lime/ } },
    make: (p, i) => ({
      name: `${cap(n(p.f))} salad with ${n(p.g)} & ${n(p.s)}`,
      time: 10, serves: 2, basics: ['olive oil', 'salt', 'black pepper'],
      blurb: pick(['A zesty supper straight from the cupboard.', 'Ten-minute lunch with fresh citrus.'], i),
      steps: [
        `Pile the ${n(p.g)} onto plates or into a large bowl.`,
        `Chop the ${n(p.s)} and scatter over the top.`,
        `Drain and flake the ${n(p.f)} over the salad.`,
        `Dress with olive oil, the juice of the ${n(p.c)}, salt and plenty of pepper.`,
      ],
    }),
  },
  {
    key: 'quesadilla', cat: 'meal', img: 'meal-3', count: 24,
    slots: { p: 'P', l: 'Ll', d: 'D', v: 'S' },
    make: (p, i) => ({
      name: `${cap(n(p.l))} & ${n(p.d)} quesadillas with ${n(p.v)}`,
      time: 15, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Crisp, cheesy and ready in 15 minutes.', 'Cheap, quick and kids love them.'], i),
      steps: [
        `Roughly mash the ${n(p.l)} (drained if tinned) with salt and pepper in a bowl and chop the ${n(p.v)}.`,
        `Spread over half of each ${n(p.p)}, scatter with the ${n(p.d)} and ${n(p.v)}, then fold over.`,
        `Fry in a dry or lightly oiled pan over medium heat for 2–3 minutes per side until crisp and the cheese has melted.`,
        `Cut into wedges and serve.`,
      ],
    }),
  },
  {
    key: 'fajitas', cat: 'meal', img: 'meal-2', count: 20,
    slots: { p: 'P', t: 'T', v: 'V', s: 'X', d: 'S' },
    make: (p, i) => ({
      name: `${cap(n(p.t))} & ${n(p.v)} wraps with ${n(p.s)}`,
      time: 25, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Sizzling, smoky and build-your-own.', 'Roll it up and eat with your hands.'], i),
      steps: [
        `Slice the ${n(p.t)} into thin strips and toss with the ${n(p.s)}, a splash of oil and salt.`,
        `Fry over high heat for 5–7 minutes until golden and cooked all the way through (no pink in the middle). Remove to a plate.`,
        `In the same pan, fry the sliced ${n(p.v)} for 4–5 minutes until softened and charred in places.`,
        `Warm the ${n(p.p)}, fill with the ${n(p.t)}, ${n(p.v)} and some fresh ${n(p.d)} and roll up.`,
      ],
    }),
  },
  {
    key: 'tacos', cat: 'meal', img: 'meal-2', count: 20,
    slots: { p: 'P', m: 'I', s: 'S', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} tacos with ${n(p.s)} & ${n(p.d)}`,
      time: 25, serves: 3, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Taco night, sorted.', 'Crunchy, saucy and endlessly customisable.'], i),
      steps: [
        `Fry the ${n(p.m)} in a little oil over medium-high heat for 8–10 minutes, breaking it up, until browned and cooked all the way through.`,
        `Chop the ${n(p.s)} and grate or crumble the ${n(p.d)}.`,
        `Warm the ${n(p.p)} following the packet instructions.`,
        `Fill with the ${n(p.m)}, ${n(p.s)} and ${n(p.d)} and serve straight away.`,
      ],
    }),
  },
  {
    key: 'fish-wrap', cat: 'meal', img: 'meal-3', count: 16,
    slots: { p: 'P', f: 'f', g: 'G', v: 'v' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.g)} wraps`,
      time: 10, serves: 2, basics: ['black pepper'],
      blurb: pick(['A packed lunch that comes together in minutes.', 'No cooking, no fuss.'], i),
      steps: [
        `Drain and flake the ${n(p.f)} into a bowl and stir through a spoonful of ${n(p.v)}.`,
        `Lay out the ${n(p.p)} and scatter with the ${n(p.g)}.`,
        `Spoon the ${n(p.f)} mix over the top and season with black pepper.`,
        `Fold in the sides and roll up tightly. Slice in half to serve.`,
      ],
    }),
  },
  {
    key: 'flatbread-pizza', cat: 'meal', img: 'meal-2', count: 24,
    slots: { p: 'P', a: 'A', d: 'D', v: 'V' },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.d)} flatbread pizza`,
      time: 20, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Pizza night in the time it takes to preheat the oven.', 'Crisp base, bubbling cheese, and no delivery fee.'], i),
      steps: [
        `Heat the oven to 220°C (200°C fan) and put a baking tray in to heat up.`,
        `Spread the ${n(p.p)} with the ${n(p.a)}, leaving a border around the edge.`,
        `Thinly slice the ${n(p.v)}, scatter over the top and finish with the ${n(p.d)}.`,
        `Slide onto the hot tray and bake for 8–10 minutes until the base is crisp and the cheese is golden.`,
      ],
    }),
  },
  {
    key: 'baked-spud', cat: 'meal', img: 'meal-3', count: 26,
    slots: { o: { r: 'O', re: /potato|sweet/ }, l: 'Ll', d: 'D' },
    make: (p, i) => ({
      name: `Baked ${n(p.o)} with ${n(p.l)} & ${n(p.d)}`,
      time: 65, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Crispy skin, fluffy middle, big comfort.', 'A cheap and cheerful dinner.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Prick the ${n(p.o)} all over with a fork, rub with oil and salt and bake directly on the oven shelf for 50–60 minutes until the skins are crisp and the middle is soft.`,
        `Warm the ${n(p.l)} gently in a pan (drain first if tinned) and season.`,
        `Split the ${n(p.o)} open, fluff the insides with a fork and pile in the ${n(p.l)}.`,
        `Top with the ${n(p.d)} and pop back in the oven for 3–4 minutes if you want it melted.`,
      ],
    }),
  },
  {
    key: 'stuffed-veg', cat: 'meal', img: 'meal-3', count: 30,
    slots: { w: 'W', r: 'R', d: 'D', s: 'X' },
    make: (p, i) => ({
      name: `Stuffed ${n(p.w)} with ${n(p.r)} & ${n(p.d)}`,
      time: 50, serves: 3, basics: [...OSP],
      blurb: pick(['A pretty dinner that makes the most of one veg.', 'Everything tucked into its own edible bowl.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Halve the ${n(p.w)} and scoop out a little of the middle, saving it. Set the halves cut-side up in a baking dish and brush with oil.`,
        `Cook the ${n(p.r)} following the packet instructions. Chop the saved middles and fry for 3–4 minutes with the ${n(p.s)}.`,
        `Mix the ${n(p.r)} with the fried veg, half the ${n(p.d)}, salt and pepper. Pile into the shells and top with the rest of the ${n(p.d)}.`,
        `Cover with foil and bake for 25 minutes, then uncover and bake for another 10–15 minutes until golden and the ${n(p.w)} is tender.`,
      ],
    }),
  },
  {
    key: 'stuffed-mince', cat: 'meal', img: 'meal-2', count: 16,
    slots: { w: 'W', m: 'I', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.m))}-stuffed ${n(p.w)}`,
      time: 50, serves: 3, basics: [...OSP],
      blurb: pick(['Hearty, golden and bubbling.', 'A great way to make mince go further.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Halve the ${n(p.w)}, scoop out a little of the middle and chop it up.`,
        `Fry the ${n(p.m)} in a little oil for 8–10 minutes until browned and cooked through, adding the chopped middles for the last 3 minutes. Season well.`,
        `Spoon into the ${n(p.w)} shells in a baking dish and top with the ${n(p.d)}.`,
        `Bake for 25–30 minutes until the filling is bubbling and the ${n(p.w)} is tender.`,
      ],
    }),
  },
  {
    key: 'risotto', cat: 'meal', img: 'meal-1', count: 24,
    slots: { i: 'i', v: 'V', d: 'D', y: 'y' },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.d)} ${n(p.i) === 'arborio rice' ? 'risotto' : n(p.i) + ' risotto'}`,
      time: 40, serves: 3, basics: ['oil or butter', 'salt', 'black pepper'],
      blurb: pick(['Creamy, patient comfort food.', 'Worth the stirring: a spoonful of luxury.'], i),
      steps: [
        `Dissolve the ${n(p.y)} in 1 litre hot water and keep it warm in a pan on the lowest heat.`,
        `Soften the chopped ${n(p.v)} in oil or butter in a wide pan for 6–8 minutes. Add the ${n(p.i)} and stir for 1 minute.`,
        `Add the hot stock a ladleful at a time, stirring often and waiting until each is absorbed, for 20–25 minutes, until the grains are tender but still have a little bite.`,
        `Take off the heat, stir in most of the ${n(p.d)}, season and rest for 2 minutes. Serve topped with the rest.`,
      ],
    }),
  },
  {
    key: 'stew-meat', cat: 'meal', img: 'meal-2', count: 22,
    slots: { t: 'T', v: 'V', o: 'O', y: 'y' },
    make: (p, i) => ({
      name: `Hearty ${n(p.t)} & ${n(p.v)} stew`,
      time: 80, serves: 4, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Slow, cosy and good for leftovers.', 'A one-pot Sunday supper.'], i),
      steps: [
        `Brown the ${n(p.t)}, cut into chunks, in oil in a large pot over high heat for 5 minutes. Remove and set aside.`,
        `In the same pot, soften the chopped ${n(p.v)} for 5 minutes. Add the diced ${n(p.o)}.`,
        `Return the ${n(p.t)}, add the ${n(p.y)} (dissolved in 600 ml hot water if it is a cube or paste) and bring to the boil.`,
        `Cover and simmer gently for 45–55 minutes until the meat is tender and cooked through. Season and serve.`,
      ],
    }),
  },
  {
    key: 'chilli', cat: 'meal', img: 'meal-2', count: 22,
    slots: { m: 'I', l: 'L', a: 'Ac', s: 'X' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} & ${n(p.l)} chilli`,
      time: 45, serves: 4, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Bulk-cook it, freeze it, thank yourself later.', 'A big bowl of cosy, spicy goodness.'], i),
      steps: [
        `Fry the ${n(p.m)} in oil in a big pan for 8–10 minutes, breaking it up, until browned and cooked through.`,
        `Stir in the ${n(p.s)} and cook for 1 minute.`,
        `Add the ${n(p.a)} and the drained ${n(p.l)} with 100 ml water.`,
        `Simmer gently for 25–30 minutes until thick and rich. Season and serve with rice, bread or potatoes.`,
      ],
    }),
  },
  {
    key: 'veg-stew', cat: 'meal', img: 'meal-2', count: 24,
    slots: { l: 'Lg', v: 'V', o: 'O', a: 'Ac' },
    make: (p, i) => ({
      name: `${cap(n(p.l))}, ${n(p.v)} & ${n(p.o)} stew`,
      time: 45, serves: 3, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Cheap, plant-based and warming.', 'A bowl that tastes like it simmered all day.'], i),
      steps: [
        `Soften the chopped ${n(p.v)} in oil for 6–8 minutes. Add the diced ${n(p.o)} and cook for 2 minutes.`,
        `Add the ${n(p.a)}, the ${n(p.l)} (drained and rinsed if tinned) and 200 ml water.`,
        `Simmer gently for 25–30 minutes until the ${n(p.o)} is tender and the sauce is thick.`,
        `Season well and serve with bread.`,
      ],
    }),
  },
  {
    key: 'fritters', cat: 'meal', img: 'meal-3', count: 22,
    slots: { v: 'V', e: 'E', d: 'D' },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.d)} fritters`,
      time: 25, serves: 3, basics: ['plain flour', 'oil', 'salt', 'black pepper'],
      blurb: pick(['Crisp little patties from one lonely veg.', 'Brilliant with a fried egg or a dollop of yogurt.'], i),
      steps: [
        `Grate or finely chop the ${n(p.v)} and squeeze out any extra water in a clean tea towel.`,
        `Mix with 2 ${n(p.e)}, 3–4 tablespoons plain flour, the ${n(p.d)} and plenty of salt and pepper.`,
        `Heat a thin layer of oil in a frying pan and drop in spoonfuls of the mix, flattening gently.`,
        `Fry for 3–4 minutes per side until golden and cooked through. Drain on kitchen paper.`,
      ],
    }),
  },
  {
    key: 'patties', cat: 'meal', img: 'meal-3', count: 20,
    slots: { l: 'L', b: 'b', x: 'X', h: 'H' },
    make: (p, i) => ({
      name: `${cap(n(p.l))} patties with ${n(p.x)} & ${n(p.h)}`,
      time: 30, serves: 3, basics: ['oil', 'salt', 'black pepper', 'a little flour or beaten egg to bind'],
      blurb: pick(['Homemade veggie burgers without the fuss.', 'Crispy outside, soft inside.'], i),
      steps: [
        `Drain and rinse the ${n(p.l)}, then mash roughly with a fork, leaving some texture.`,
        `Stir in the ${n(p.b)}, the ${n(p.x)}, chopped ${n(p.h)}, salt, pepper and a little flour or beaten egg to bind.`,
        `Shape into 6 patties and chill for 10 minutes if you have time.`,
        `Fry in oil for 3–4 minutes per side until golden and hot all the way through.`,
      ],
    }),
  },
  {
    key: 'rosti', cat: 'meal', img: 'meal-3', count: 12,
    slots: { o: { r: 'O', re: /potato|parsnip|celeriac|swede/ }, v: 'V', e: 'E' },
    make: (p, i) => ({
      name: `${cap(n(p.o))} & ${n(p.v)} rösti with a fried egg`,
      time: 30, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Crunchy, golden and undeniably brunch.', 'A great use for the last of the potatoes.'], i),
      steps: [
        `Grate the ${n(p.o)} and ${n(p.v)}, then squeeze out as much liquid as you can in a clean tea towel.`,
        `Season well and press into two patties in a hot, oiled frying pan.`,
        `Cook over medium heat for 6–8 minutes per side until deep golden and crisp.`,
        `Fry ${n(p.e)} in a separate pan and slide on top.`,
      ],
    }),
  },
  {
    key: 'pan-fish', cat: 'meal', img: 'meal-2', count: 28,
    slots: { q: 'Q', v: 'V', c: { r: 'C', re: /lemon|lime/ }, r: 'R' },
    make: (p, i) => ({
      name: `Pan-fried ${n(p.q)} with ${n(p.v)} & ${n(p.r)}`,
      time: 30, serves: 2, basics: [...OSP],
      blurb: pick(['Crisp-edged fish with a squeeze of citrus.', 'A light dinner that feels fancy.'], i),
      steps: [
        `Cook the ${n(p.r)} following the packet instructions, then keep warm.`,
        `Chop the ${n(p.v)} and fry in oil for 6–8 minutes until tender. Season and keep warm.`,
        `Pat the ${n(p.q)} dry, season and fry in a hot, oiled pan for 3–4 minutes per side until opaque all the way through.`,
        `Squeeze over the ${n(p.c)} and serve with the ${n(p.v)} and ${n(p.r)}.`,
      ],
    }),
  },
  {
    key: 'noodle-soup-meat', cat: 'meal', img: 'meal-1', count: 22,
    slots: { n: 'n', t: 'TQ', v: 'V', y: 'y' },
    make: (p, i) => ({
      name: `${cap(n(p.t))} & ${n(p.v)} noodle soup`,
      time: 25, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['A big, steamy bowl that clears the fridge.', 'Slurp-worthy and ready in 25 minutes.'], i),
      steps: [
        `Dissolve the ${n(p.y)} in 800 ml boiling water in a pan and keep at a simmer.`,
        `Thinly slice the ${n(p.t)} and ${n(p.v)}. Add the ${n(p.t)} to the broth and simmer for 5–8 minutes until cooked through (no pink in the middle).`,
        `Add the ${n(p.v)} and the ${n(p.n)}, cooking for 3–4 minutes (or as the packet says).`,
        `Season to taste and ladle into deep bowls.`,
      ],
    }),
  },
  {
    key: 'noodle-soup-veg', cat: 'meal', img: 'meal-1', count: 22,
    slots: { n: 'n', l: 'L', v: 'V', y: 'y' },
    make: (p, i) => ({
      name: `${cap(n(p.l))} & ${n(p.v)} noodle soup`,
      time: 20, serves: 2, basics: ['oil', 'salt', 'black pepper'],
      blurb: pick(['Vegetarian, fast and comforting.', 'A light yet filling bowl.'], i),
      steps: [
        `Dissolve the ${n(p.y)} in 800 ml boiling water and keep at a gentle simmer.`,
        `Add the sliced ${n(p.v)} and cook for 3–4 minutes.`,
        `Add the ${n(p.n)} and the ${n(p.l)} (drained and rinsed if tinned or cubed if firm) and simmer for 3–4 minutes until the noodles are cooked.`,
        `Season and serve hot.`,
      ],
    }),
  },
  {
    key: 'gratin', cat: 'meal', img: 'meal-2', count: 22,
    slots: { v: 'V', d: 'D', k: { r: 'K', not: 'z' } },
    make: (p, i) => ({
      name: `${cap(n(p.v))} & ${n(p.d)} gratin`,
      time: 50, serves: 3, basics: ['butter or oil', 'salt', 'black pepper'],
      blurb: pick(['Bubbling, golden and totally irresistible.', 'The best thing you can do with a limp veg.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Chop the ${n(p.v)} into even pieces and boil or steam for 5 minutes until just tender. Drain well.`,
        `Arrange in a buttered baking dish and season generously.`,
        `Pour over the ${n(p.k)} (about 150 ml), then top with the grated ${n(p.d)}.`,
        `Bake for 25–30 minutes until bubbling, golden and crisp on top.`,
      ],
    }),
  },
  {
    key: 'spud-bake', cat: 'meal', img: 'meal-2', count: 16,
    slots: { o: 'O', k: { r: 'K', not: 'z' }, v: 'V', d: 'D' },
    make: (p, i) => ({
      name: `Creamy ${n(p.o)} bake with ${n(p.v)}`,
      time: 60, serves: 4, basics: ['butter', 'salt', 'black pepper'],
      blurb: pick(['Rich, layered and guaranteed to disappear.', 'Dauphinoise-style comfort.'], i),
      steps: [
        `Heat the oven to 190°C (170°C fan). Thinly slice the ${n(p.o)} and ${n(p.v)}.`,
        `Layer them in a buttered dish, seasoning each layer well.`,
        `Pour over 200 ml ${n(p.k)} and top with the ${n(p.d)}. Cover with foil.`,
        `Bake for 40 minutes, uncover and bake for 15 minutes more until golden and tender when pierced.`,
      ],
    }),
  },
  {
    key: 'sarnie-cheese', cat: 'meal', img: 'snack-1', count: 24,
    slots: { b: 'B', d: 'D', v: 'VS', s: 'v' },
    make: (p, i) => ({
      name: `Toasted ${n(p.d)} & ${n(p.v)} sandwich`,
      time: 10, serves: 1, basics: ['butter'],
      blurb: pick(['A grown-up cheese toastie.', 'Crunchy bread, melty middle.'], i),
      steps: [
        `Thinly slice the ${n(p.v)} and grate or slice the ${n(p.d)}.`,
        `Spread one side of each slice of ${n(p.b)} with butter and the other with a little ${n(p.s)}.`,
        `Build the sandwich with the ${n(p.d)} and ${n(p.v)} inside and the buttered sides on the outside.`,
        `Fry or toast for 3–4 minutes per side until golden and melted.`,
      ],
    }),
  },
  {
    key: 'sarnie-meat', cat: 'meal', img: 'snack-1', count: 16,
    slots: { b: 'B', m: { r: 'I', re: /ham|bacon|salami|pancetta|chorizo/ }, s: 'S', v: 'v' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} & ${n(p.s)} sandwich`,
      time: 10, serves: 1, basics: ['butter'],
      blurb: pick(['A proper lunch in 10 minutes.', 'Savoury, salty and satisfying.'], i),
      steps: [
        `If using bacon, grill or fry it for 5–6 minutes until cooked and crisp. Otherwise, thinly slice the ${n(p.m)}.`,
        `Spread the ${n(p.b)} with butter on one side and ${n(p.v)} on the other.`,
        `Pile the ${n(p.m)} and thinly sliced ${n(p.s)} on one slice.`,
        `Top with the second slice, press down and cut in half.`,
      ],
    }),
  },
  {
    key: 'sarnie-fish', cat: 'meal', img: 'snack-1', count: 16,
    slots: { b: 'B', f: 'f', s: 'S', v: 'v' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.s)} sandwich`,
      time: 10, serves: 1, basics: ['black pepper'],
      blurb: pick(['A zesty tuna-melt alternative.', 'A cupboard-staple lunch.'], i),
      steps: [
        `Drain and flake the ${n(p.f)} into a bowl and mix with a spoonful of ${n(p.v)}. Season with black pepper.`,
        `Finely slice the ${n(p.s)}.`,
        `Pile the filling onto a slice of ${n(p.b)}, add the ${n(p.s)} and top with another slice.`,
        `Press down gently and cut in half.`,
      ],
    }),
  },

  /* ============================== SNACKS ============================== */
  {
    key: 'toast-savoury', cat: 'snack', img: 'snack-1', count: 26,
    slots: { b: 'B', s: 'S', d: 'D', h: 'H' },
    make: (p, i) => ({
      name: `${cap(n(p.s))} & ${n(p.d)} toast`,
      time: 8, serves: 1, basics: ['olive oil', 'salt', 'black pepper'],
      blurb: pick(['A fresh, crunchy bite in under ten minutes.', 'Toast, but make it lunch.', 'Savoury and satisfying.'], i),
      steps: [
        `Toast the ${n(p.b)} until golden.`,
        `Spread or crumble the ${n(p.d)} over the warm toast.`,
        `Top with thinly sliced ${n(p.s)} and torn ${n(p.h)}.`,
        `Finish with a drizzle of olive oil, salt and black pepper.`,
      ],
    }),
  },
  {
    key: 'toast-sweet', cat: 'snack', img: 'snack-2', count: 22,
    slots: { b: 'B', f: 'F', m: 'M' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.m)} toast`,
      time: 5, serves: 1, basics: ['pinch of cinnamon (optional)'],
      blurb: pick(['A sweet, fruity pick-me-up.', 'Breakfast, snack or afternoon treat.'], i),
      steps: [
        `Toast the ${n(p.b)} until golden.`,
        `Spread generously with ${n(p.m)}.`,
        `Slice the ${n(p.f)} and arrange on top.`,
        `Add a pinch of cinnamon if you like and eat while warm.`,
      ],
    }),
  },
  {
    key: 'yogurt-bowl', cat: 'snack', img: 'snack-2', count: 30,
    slots: { z: 'z', f: 'F', u: 'U', s: 's' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.u)} ${n(p.z)} bowl`,
      time: 5, serves: 1, basics: [],
      blurb: pick(['Creamy, crunchy, fruity and fast.', 'A bowl that works at breakfast or midnight.'], i),
      steps: [
        `Spoon the ${n(p.z)} into a bowl.`,
        `Slice or chop the ${n(p.f)} and arrange on top.`,
        `Scatter with the ${n(p.u)}, roughly chopped if they are large.`,
        `Drizzle with ${n(p.s)} and eat straight away.`,
      ],
    }),
  },
  {
    key: 'energy-bites', cat: 'snack', img: 'snack-2', count: 20,
    slots: { m: 'm', u: 'U', e: 'e', s: 'M' },
    make: (p, i) => ({
      name: `${cap(n(p.m))} & ${n(p.u)} oat bites`,
      time: 15, serves: 6, basics: [],
      blurb: pick(['No-bake bites for lunchboxes and long afternoons.', 'Sweet without refined sugar.'], i),
      steps: [
        `Roughly chop the ${n(p.m)} and ${n(p.u)} (or pulse in a food processor).`,
        `Mix with 100 g ${n(p.e)} and 3–4 tablespoons ${n(p.s)} until the mixture sticks together when squeezed.`,
        `Roll into walnut-sized balls (add a splash of water or more ${n(p.s)} if too dry or crumbly).`,
        `Chill for 30 minutes. Keep in a covered container in the fridge for up to 5 days.`,
      ],
    }),
  },
  {
    key: 'roasted-pulses', cat: 'snack', img: 'snack-1', count: 18,
    slots: { l: { r: 'L', re: /chickpeas|beans|edamame|peas|lentils/, nre: /baked|refried/ }, x: 'X' },
    make: (p, i) => ({
      name: `Crispy roasted ${n(p.l)} with ${n(p.x)}`,
      time: 35, serves: 3, basics: ['oil', 'salt'],
      blurb: pick(['Crunchy, spicy, and better than crisps.', 'A snack with a hit of protein.'], i),
      steps: [
        `Heat the oven to 200°C (180°C fan). Drain and rinse the ${n(p.l)} and dry thoroughly with kitchen paper (the drier they are, the crunchier they get).`,
        `Toss with 1 tablespoon oil, a good pinch of salt and the ${n(p.x)}.`,
        `Roast on a tray, shaking halfway, for 25–30 minutes until crisp.`,
        `Cool on the tray (they crisp further as they cool) and eat within 2 days.`,
      ],
    }),
  },
  {
    key: 'dip-pulse', cat: 'snack', img: 'snack-1', count: 22,
    slots: { l: { r: 'L', nre: /baked|refried/ }, c: { r: 'C', re: /lemon|lime/ }, s: { r: 'S', re: STICKS }, x: 'X' },
    make: (p, i) => ({
      name: `${cap(n(p.l))} dip with ${n(p.s)} sticks`,
      time: 10, serves: 3, basics: ['olive oil', 'salt'],
      blurb: pick(['A hummus-style dip from the cupboard.', 'Blitz, dip and crunch.'], i),
      steps: [
        `Drain and rinse the ${n(p.l)}. Blitz in a food processor (or mash with a fork) with 3 tablespoons olive oil, the juice of the ${n(p.c)}, a pinch of ${n(p.x)} and salt.`,
        `Add a splash of cold water until the dip is smooth and creamy.`,
        `Taste and adjust the seasoning and lemon.`,
        `Cut the ${n(p.s)} into sticks and serve alongside.`,
      ],
    }),
  },
  {
    key: 'dip-ready', cat: 'snack', img: 'snack-1', count: 18,
    slots: { s: { r: 'S', re: STICKS }, t: { r: 'S', re: STICKS }, d: 'd' },
    make: (p, i) => ({
      name: `${cap(n(p.s))} & ${n(p.t)} sticks with ${n(p.d)}`,
      time: 5, serves: 2, basics: [],
      blurb: pick(['Crunchy dippers and not much washing up.', 'The five-minute snack plate.'], i),
      steps: [
        `Wash and trim the ${n(p.s)} and ${n(p.t)}.`,
        `Cut into dipping-sized sticks or slices.`,
        `Spoon the ${n(p.d)} into a small bowl.`,
        `Serve everything together on a plate.`,
      ],
    }),
  },
  {
    key: 'fruit-salad', cat: 'snack', img: 'snack-2', count: 22,
    slots: { a: 'F', b: 'F', c: 'F', h: 'H' },
    make: (p, i) => ({
      name: `${cap(n(p.a))}, ${n(p.b)} & ${n(p.c)} fruit salad`,
      time: 10, serves: 3, basics: ['squeeze of lemon (optional)'],
      blurb: pick(['A fresh way to use up soft fruit.', 'Sweet and juicy with a hint of herb.'], i),
      steps: [
        `Wash the fruit and chop the ${n(p.a)}, ${n(p.b)} and ${n(p.c)} into bite-sized pieces.`,
        `Combine in a large bowl.`,
        `Tear over some ${n(p.h)}, adding a squeeze of lemon if you have it.`,
        `Toss gently and chill for 10 minutes before serving.`,
      ],
    }),
  },
  {
    key: 'baked-fruit', cat: 'snack', img: 'snack-2', count: 16,
    slots: { f: { r: 'F', re: /apple|pear|plum|peach|nectarine|apricot|fig|rhubarb|banana/, nre: /tinned|dried/ }, x: 'x', u: 'U', s: 's' },
    make: (p, i) => ({
      name: `Baked ${n(p.f)} with ${n(p.x)} & ${n(p.u)}`,
      time: 30, serves: 2, basics: [],
      blurb: pick(['Warm, spiced and almost dessert.', 'The best use for fruit that is a bit past its best.'], i),
      steps: [
        `Heat the oven to 190°C (170°C fan). Halve and core or stone the ${n(p.f)} and arrange cut-side up in a baking dish.`,
        `Drizzle with ${n(p.s)} and dust with ${n(p.x)}.`,
        `Bake for 20–25 minutes until soft and caramelised.`,
        `Scatter with chopped ${n(p.u)} and serve warm.`,
      ],
    }),
  },
  {
    key: 'herb-toast', cat: 'snack', img: 'snack-1', count: 14,
    slots: { b: 'B', u: 'u', h: 'H', x: 'X' },
    make: (p, i) => ({
      name: `${cap(n(p.h))} & ${n(p.x)} ${n(p.u)} on ${n(p.b)}`,
      time: 8, serves: 2, basics: ['salt'],
      blurb: pick(['Flavoured butter turns plain bread into a treat.', 'A garlic-bread style snack in minutes.'], i),
      steps: [
        `Soften 3 tablespoons ${n(p.u)} and mash with finely chopped ${n(p.h)}, a little ${n(p.x)} and a pinch of salt.`,
        `Spread thickly over slices of ${n(p.b)}.`,
        `Grill or bake at 200°C (180°C fan) for 4–6 minutes until golden and bubbling.`,
        `Cut into fingers and eat warm.`,
      ],
    }),
  },
  {
    key: 'crackers', cat: 'snack', img: 'snack-1', count: 20,
    slots: { k: 'k', d: 'D', f: 'F' },
    make: (p, i) => ({
      name: `${cap(n(p.d))} & ${n(p.f)} on ${n(p.k)}`,
      time: 5, serves: 1, basics: ['black pepper (optional)'],
      blurb: pick(['A sweet-meets-savoury plate for grazing.', 'Cheeseboard energy, no board needed.'], i),
      steps: [
        `Lay out the ${n(p.k)} on a plate.`,
        `Top each with a slice, crumble or spoonful of ${n(p.d)}.`,
        `Add a slice of ${n(p.f)} on top.`,
        `Finish with a grind of black pepper if you like.`,
      ],
    }),
  },
  {
    key: 'oat-cookies', cat: 'snack', img: 'snack-2', count: 14,
    slots: { f: { r: 'F', re: /banana|apple|date|raisin|sultana|apricot|prune|cranberr/, nre: /tinned/ }, e: 'e', w: 'w' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.w)} oat cookies`,
      time: 25, serves: 8, basics: [],
      blurb: pick(['Two or three ingredients, one tray.', 'Chewy, naturally sweet and so easy.'], i),
      steps: [
        `Heat the oven to 180°C (160°C fan) and line a baking tray.`,
        `Mash or finely chop the ${n(p.f)} and mix with 150 g ${n(p.e)} until it forms a sticky dough.`,
        `Chop the ${n(p.w)} and fold in. Drop spoonfuls on the tray and flatten slightly.`,
        `Bake for 12–15 minutes until golden at the edges. Cool on the tray for 10 minutes.`,
      ],
    }),
  },
  {
    key: 'veg-bites', cat: 'snack', img: 'snack-1', count: 18,
    slots: { s: { r: 'S', re: STICKS }, d: 'D', h: 'H' },
    make: (p, i) => ({
      name: `${cap(n(p.s))} bites with ${n(p.d)} & ${n(p.h)}`,
      time: 10, serves: 3, basics: ['black pepper'],
      blurb: pick(['Bite-sized and good for guests.', 'Cool, crunchy and fresh.'], i),
      steps: [
        `Cut the ${n(p.s)} into thick slices or hollow out into cups.`,
        `Spoon or crumble the ${n(p.d)} on top.`,
        `Scatter with torn ${n(p.h)} and a grind of black pepper.`,
        `Chill briefly and serve.`,
      ],
    }),
  },
  {
    key: 'spiced-eggs', cat: 'snack', img: 'snack-1', count: 8,
    slots: { e: 'E', v: 'v', x: 'X' },
    make: (p, i) => ({
      name: `${cap(n(p.x))} devilled eggs`,
      time: 25, serves: 3, basics: ['salt', 'black pepper'],
      blurb: pick(['A retro party snack with a spicy twist.', 'Protein-packed and very easy.'], i),
      steps: [
        `Boil 6 ${n(p.e)} for 9–10 minutes, then cool in cold water and peel.`,
        `Halve lengthways and pop the yolks into a bowl. Mash with 2 tablespoons ${n(p.v)}, salt and pepper.`,
        `Spoon or pipe back into the whites.`,
        `Sprinkle with ${n(p.x)} and chill until needed.`,
      ],
    }),
  },
  {
    key: 'popcorn', cat: 'snack', img: 'snack-1', count: 9,
    slots: { p: 'p', x: 'X', d: { r: 'D', re: /parmesan|cheddar|cheese/ } },
    make: (p, i) => ({
      name: `${cap(n(p.x))} & ${n(p.d)} popcorn`,
      time: 10, serves: 3, basics: ['oil', 'salt'],
      blurb: pick(['Movie night, minus the cinema prices.'], i),
      steps: [
        `Heat 1 tablespoon oil in a large lidded pan over medium heat and add the ${n(p.p)} kernels in a single layer.`,
        `Cover and shake from time to time, until the popping slows to several seconds apart.`,
        `Tip into a bowl and toss with salt, the ${n(p.x)} and finely grated ${n(p.d)}.`,
        `Eat straight away while crisp.`,
      ],
    }),
  },
  {
    key: 'yogurt-bark', cat: 'snack', img: 'snack-2', count: 12,
    slots: { z: 'z', f: 'FJ', u: 'U', x: 'x' },
    make: (p, i) => ({
      name: `Frozen ${n(p.z)} bark with ${n(p.f)} & ${n(p.u)}`,
      time: 10, serves: 4, basics: ['honey (optional)'],
      blurb: pick(['A cool treat that lives in the freezer.', 'Healthy, easy and weirdly addictive.'], i),
      steps: [
        `Line a tray with baking paper and spread the ${n(p.z)} over it about 1 cm thick. Stir in a little ${n(p.x)} if you like.`,
        `Scatter with chopped ${n(p.f)} and ${n(p.u)}, pressing them in lightly.`,
        `Freeze for at least 2 hours until solid.`,
        `Break into shards and keep in a covered container in the freezer.`,
      ],
    }),
  },

  /* ============================ BEVERAGES ============================= */
  {
    key: 'smoothie', cat: 'drink', img: 'drink-1', count: 44,
    slots: { a: 'J', b: 'J', k: 'K' },
    make: (p, i) => ({
      name: `${cap(n(p.a))} & ${n(p.b)} smoothie`,
      time: 5, serves: 2, basics: ['ice (optional)', 'honey (optional)'],
      blurb: pick(['Blended, chilled and gone in a minute.', 'Fruit that is past its best finds its calling.', 'A glassful of breakfast.'], i),
      steps: [
        `Peel or chop the ${n(p.a)} and ${n(p.b)} (frozen works great) and add to the blender.`,
        `Pour in 200 ml ${n(p.k)}.`,
        `Blend for 30–60 seconds until completely smooth. Add ice or more liquid to adjust the texture.`,
        `Taste, sweeten with honey if needed and serve cold.`,
      ],
    }),
  },
  {
    key: 'green-smoothie', cat: 'drink', img: 'drink-1', count: 18,
    slots: { g: 'G', a: 'J', b: 'J', k: 'K' },
    make: (p, i) => ({
      name: `${cap(n(p.a))}, ${n(p.b)} & ${n(p.g)} green smoothie`,
      time: 5, serves: 2, basics: ['ice (optional)', 'honey (optional)'],
      blurb: pick(['The sneakiest way to eat your greens.', 'Bright green, naturally sweet.'], i),
      steps: [
        `Add the ${n(p.g)} to the blender along with 200 ml ${n(p.k)}.`,
        `Add the ${n(p.a)} and ${n(p.b)}, peeled and chopped.`,
        `Blend for a full minute until completely smooth, adding ice if you want it frosty.`,
        `Taste, sweeten with honey if needed and drink straight away.`,
      ],
    }),
  },
  {
    key: 'cooler', cat: 'drink', img: 'drink-2', count: 28,
    slots: { c: 'C', h: 'H', f: 'J' },
    make: (p, i) => ({
      name: `${cap(n(p.c))}, ${n(p.f)} & ${n(p.h)} cooler`,
      time: 5, serves: 2, basics: ['ice', 'cold or sparkling water', 'sugar or honey to taste'],
      blurb: pick(['Garden-party fresh from the fridge.', 'Sparkling, citrusy and refreshing.'], i),
      steps: [
        `Muddle (crush) a handful of ${n(p.h)} with a spoonful of sugar or honey in a jug.`,
        `Squeeze in the juice of the ${n(p.c)} and add chopped ${n(p.f)}.`,
        `Add plenty of ice and top up with cold or sparkling water.`,
        `Stir, taste and adjust the sweetness before pouring.`,
      ],
    }),
  },
  {
    key: 'infused-water', cat: 'drink', img: 'drink-2', count: 18,
    slots: { s: { r: 'S', re: WATERY }, c: 'C', h: 'H' },
    make: (p, i) => ({
      name: `${cap(n(p.s))}, ${n(p.c)} & ${n(p.h)} infused water`,
      time: 5, serves: 4, basics: ['cold water', 'ice'],
      blurb: pick(['A jug that makes drinking water more fun.', 'Spa water without the spa.'], i),
      steps: [
        `Wash the ${n(p.s)} and ${n(p.c)} and cut into slices.`,
        `Put into a large jug with a few sprigs of ${n(p.h)}, bruised lightly in your hand.`,
        `Fill with cold water and ice.`,
        `Leave for at least 30 minutes in the fridge before serving. Best drunk within 24 hours.`,
      ],
    }),
  },
  {
    key: 'spiced-tea', cat: 'drink', img: 'drink-2', count: 30,
    slots: { a: 'a', x: { r: 'x', nre: /vanilla/ }, c: 'C', s: 's' },
    make: (p, i) => ({
      name: `${cap(n(p.x))} & ${n(p.c)} ${n(p.a)}`,
      time: 10, serves: 1, basics: ['freshly boiled water'],
      blurb: pick(['A cosy mug with a spiced kick.', 'Warming, soothing and easy.'], i),
      steps: [
        `Put the ${n(p.a)} in a mug or teapot with a pinch of ${n(p.x)}.`,
        `Pour over freshly boiled water and steep for 3–5 minutes.`,
        `Strain, then add a squeeze of ${n(p.c)} and sweeten with ${n(p.s)}.`,
        `Sip while hot.`,
      ],
    }),
  },
  {
    key: 'iced-tea', cat: 'drink', img: 'drink-2', count: 22,
    slots: { a: 'a', j: { r: 'Jj', not: 'C' }, c: { r: 'C', re: /lemon|lime/ } },
    make: (p, i) => ({
      name: `Iced ${n(p.a)} with ${n(p.j)} & ${n(p.c)}`,
      time: 15, serves: 3, basics: ['ice', 'sugar or honey to taste', 'boiling water'],
      blurb: pick(['Summer in a jug.', 'Brew once, sip all afternoon.'], i),
      steps: [
        `Brew 3 teabags (or 3 teaspoons) of ${n(p.a)} in 500 ml boiling water for 4 minutes. Remove the tea and sweeten while hot.`,
        `Let the tea cool for 10 minutes, then pour into a jug filled with ice.`,
        `Add ${n(p.j)} and the juice of the ${n(p.c)}.`,
        `Stir, taste, adjust the sweetness and serve over more ice.`,
      ],
    }),
  },
  {
    key: 'hot-choc', cat: 'drink', img: 'drink-1', count: 22,
    slots: { h: 'h', k: 'K', x: 'x', s: 's' },
    make: (p, i) => ({
      name: `${cap(n(p.x))} ${n(p.h)} with ${n(p.k)}`,
      time: 8, serves: 2, basics: [],
      blurb: pick(['Thick, comforting and just a bit spiced.', 'A mug-shaped hug.'], i),
      steps: [
        `Whisk 2 tablespoons ${n(p.h)} with a splash of ${n(p.k)} in a pan to make a smooth paste.`,
        `Add 400 ml more ${n(p.k)} and a pinch of ${n(p.x)}.`,
        `Heat gently, stirring, until steaming (don't boil). Sweeten with ${n(p.s)}.`,
        `Pour into mugs and serve.`,
      ],
    }),
  },
  {
    key: 'iced-coffee', cat: 'drink', img: 'drink-1', count: 22,
    slots: { o: 'o', k: 'K', s: 's', x: 'x' },
    make: (p, i) => ({
      name: `Iced ${n(p.o)} with ${n(p.k)} & ${n(p.x)}`,
      time: 5, serves: 1, basics: ['ice'],
      blurb: pick(['Café-style at home.', 'A cool, caffeinated pick-me-up.'], i),
      steps: [
        `Brew a strong ${n(p.o)} and sweeten with ${n(p.s)} while it is still hot.`,
        `Let it cool slightly, then pour over a glass full of ice.`,
        `Top with a good splash of ${n(p.k)}.`,
        `Dust with ${n(p.x)} and serve.`,
      ],
    }),
  },
  {
    key: 'lemonade', cat: 'drink', img: 'drink-2', count: 30,
    slots: { f: 'J', c: { r: 'C', re: /lemon|lime/ }, s: 's' },
    make: (p, i) => ({
      name: `${cap(n(p.f))} lemonade`,
      time: 10, serves: 3, basics: ['cold water', 'ice'],
      blurb: pick(['Sharp, sweet and very refreshing.', 'A jug of sunshine.'], i),
      steps: [
        `Blend or mash the ${n(p.f)} with a splash of water and strain through a sieve into a jug.`,
        `Squeeze in the juice of the ${n(p.c)} and stir in ${n(p.s)} to taste.`,
        `Top up with about 600 ml cold water and lots of ice.`,
        `Taste and add more ${n(p.s)} or citrus until it is just right.`,
      ],
    }),
  },
  {
    key: 'lassi', cat: 'drink', img: 'drink-1', count: 22,
    slots: { z: 'z', f: 'J', x: { r: 'x', re: /cardamom|cinnamon|ginger/ } },
    make: (p, i) => ({
      name: `${cap(n(p.f))} lassi with ${n(p.x)}`,
      time: 5, serves: 2, basics: ['ice', 'honey or sugar (optional)'],
      blurb: pick(['Creamy, tangy and cooling.', 'A thick yogurt drink inspired by India.'], i),
      steps: [
        `Peel and chop the ${n(p.f)} and add to a blender.`,
        `Add 250 g ${n(p.z)}, 100 ml cold water, a pinch of ${n(p.x)} and a few ice cubes.`,
        `Blend until completely smooth and frothy.`,
        `Taste, sweeten if you like, and pour into tall glasses.`,
      ],
    }),
  },
  {
    key: 'mocktail', cat: 'drink', img: 'drink-2', count: 24,
    slots: { q: 'q', j: 'j', h: 'H', c: { r: 'C', re: /lemon|lime|orange/ } },
    make: (p, i) => ({
      name: `${cap(n(p.j))} & ${n(p.h)} spritz`,
      time: 5, serves: 2, basics: ['ice'],
      blurb: pick(['Fizzy, fancy and alcohol-free.', 'A drink that looks like a party.'], i),
      steps: [
        `Fill two glasses with ice and add a few sprigs of ${n(p.h)}, clapped between your hands to release the aroma.`,
        `Pour in 100 ml ${n(p.j)} per glass.`,
        `Top with ${n(p.q)} and squeeze in a wedge of ${n(p.c)}.`,
        `Stir gently and garnish with a slice of ${n(p.c)}.`,
      ],
    }),
  },
  {
    key: 'warm-milk', cat: 'drink', img: 'drink-1', count: 12,
    slots: { k: 'K', x: { r: 'xX', re: /cinnamon|cardamom|ginger|turmeric|cloves|nutmeg|star anise|allspice|saffron/ }, s: 's' },
    make: (p, i) => ({
      name: `Warm ${n(p.x)} ${n(p.k)}`,
      time: 8, serves: 1, basics: ['black pepper (for turmeric)'],
      blurb: pick(['A soothing bedtime mug.', 'Golden, gentle and comforting.'], i),
      steps: [
        `Pour 250 ml ${n(p.k)} into a small pan.`,
        `Whisk in half a teaspoon of ${n(p.x)}.`,
        `Heat gently for 3–4 minutes until steaming, but don't let it boil. Sweeten with ${n(p.s)}.`,
        `Strain into a mug and sip slowly.`,
      ],
    }),
  },
  {
    key: 'milkshake', cat: 'drink', img: 'drink-1', count: 12,
    slots: { k: 'K', f: 'J', w: { r: 'w', re: /ice cream|chocolate/ } },
    make: (p, i) => ({
      name: `${cap(n(p.f))} & ${n(p.w)} milkshake`,
      time: 5, serves: 2, basics: [],
      blurb: pick(['A treat in a glass.', 'Thick, frosty and just a bit naughty.'], i),
      steps: [
        `Add the chopped ${n(p.f)} to a blender.`,
        `Add 300 ml cold ${n(p.k)} and a couple of scoops or squares of ${n(p.w)}.`,
        `Blend until smooth and frothy.`,
        `Pour into tall glasses and serve at once.`,
      ],
    }),
  },
]

/* ------------------------------------------------------------------ */
/* Generation                                                         */
/* ------------------------------------------------------------------ */

// Only show a photo where it really matches the dish; everything else gets an emoji tile.
const PHOTO_OK = /^(pasta-(veg|protein|fish|cream|sauce|bake)|roast-(meat|fish)|omelette|frittata|scramble|baked-eggs|egg-muffins|fried-rice|salad-pulse|grain-bowl|fish-salad|toast-|herb-toast|yogurt|energy|fruit-salad|baked-fruit|oat-cookies|smoothie|green-smoothie|lassi|milkshake|cooler|infused|spiced-tea|iced-tea|lemonade|mocktail)/
const photoFor = (key: string, img: string) => (PHOTO_OK.test(key) ? img : '')

function generate(): Recipe[] {
  const out: Recipe[] = []
  const seen = new Set<string>()
  const used = new Set<string>()

  CORE.forEach((c) => seen.add(c.name.toLowerCase()))

  const run = (tpl: Tpl, count: number, forced?: { slot: string; ing: Ingredient }) => {
    const cyc: Record<string, () => Ingredient> = {}
    for (const key of Object.keys(tpl.slots)) {
      const items = pool(tpl.slots[key])
      if (!items.length) return 0
      cyc[key] = cycler(items, hash(tpl.key + key) ^ (forced ? hash(forced.ing.id) : 0))
    }
    let made = 0
    let attempts = 0
    while (made < count && attempts < count * 25) {
      attempts++
      const p: Record<string, Ingredient> = {}
      const ids = new Set<string>()
      let ok = true
      for (const key of Object.keys(tpl.slots)) {
        const ing = forced && forced.slot === key ? forced.ing : cyc[key]()
        if (ids.has(ing.id)) { ok = false; break }
        ids.add(ing.id)
        p[key] = ing
      }
      if (!ok) continue
      const d = tpl.make(p, out.length + attempts)
      const nm = d.name.toLowerCase()
      if (seen.has(nm)) continue
      seen.add(nm)
      const uses = d.uses ?? Object.values(p)
      uses.forEach((u) => used.add(u.id))
      out.push({
        id: '',
        name: d.name,
        cat: tpl.cat,
        time: d.time,
        serves: d.serves,
        uses: [...new Set(uses.map((u) => u.id))],
        basics: d.basics ?? [],
        steps: d.steps,
        blurb: d.blurb,
        img: photoFor(tpl.key, tpl.img),
        fam: tpl.key.split('-')[0],
      })
      made++
    }
    return made
  }

  for (const tpl of TPLS) run(tpl, tpl.count)

  // Make sure every single ingredient appears in at least one recipe.
  for (const ing of INGREDIENTS) {
    if (used.has(ing.id)) continue
    for (const tpl of TPLS) {
      const slot = Object.keys(tpl.slots).find((k) => pool(tpl.slots[k]).some((x) => x.id === ing.id))
      if (!slot) continue
      if (run(tpl, 1, { slot, ing })) break
    }
  }

  return out
}

const core: Recipe[] = CORE.map((c) => ({
  ...c,
  id: '',
  fam: 'core',
  img: /soup|sandwich/i.test(c.name) ? '' : c.img,
  featured: true,
  uses: c.uses.map((u) => {
    const ing = BY_NAME.get(u)
    if (!ing) throw new Error('Unknown core ingredient ' + u)
    return ing.id
  }),
}))

export const RECIPES: Recipe[] = [...core, ...generate(), ...makeSimple().map((s) => ({ ...s, id: '' }))].map((r, i) => ({
  ...r,
  id: 'r' + String(i + 1).padStart(4, '0'),
}))

export const STARTER_IDS: string[] = [
  'Garlicky tomato pasta',
  'Cheesy bean toastie',
  'Chickpea & spinach stew with rice',
  'Banana oat pancakes',
  'Banana, oat & yogurt smoothie',
  'Cucumber & lemon cooler',
  'Apple oat crumble pots',
  'Egg fried rice with peas & carrot',
]
  .map((nm) => RECIPES.find((r) => r.name === nm)!.id)

export const SEARCH_INDEX: Map<string, string> = new Map(
  RECIPES.map((r) => [
    r.id,
    (r.name + ' ' + r.uses.join(' ').replace(/-/g, ' ')).toLowerCase(),
  ]),
)
