import { BY_NAME, cap } from './ingredients'
import type { Recipe } from './recipes'

/* ------------------------------------------------------------------ */
/* Plain, honest recipes: one protein + one rice (+ optionally a veg).  */
/* They make sure that ticking e.g. "chicken" and "rice" always finds   */
/* several dishes that use exactly those two things.                    */
/* ------------------------------------------------------------------ */

type Kind = 'poultry' | 'red' | 'mince' | 'sausage' | 'cured' | 'fish'

interface Prot {
  name: string
  kind: Kind
  cut: string // how to prepare it for a one-pot
  fry: string // how to pan-cook it
  bake: string // oven time for a tray / rice bake
  pot: string // simmer time in a one-pot
  soup?: string
}

const PROTS: Prot[] = [
  { name: 'chicken', kind: 'poultry', cut: 'Cut the chicken into bite-sized pieces', fry: 'for 6–8 minutes on each side, until golden and cooked all the way through (no pink, and the juices run clear)', bake: '35–40 minutes', pot: '15–20', soup: '20' },
  { name: 'chicken thighs', kind: 'poultry', cut: 'Cut the chicken thighs into bite-sized pieces', fry: 'for 7–9 minutes on each side, until golden and cooked all the way through (no pink, and the juices run clear)', bake: '40–45 minutes', pot: '20', soup: '25' },
  { name: 'chicken breast', kind: 'poultry', cut: 'Cut the chicken breast into bite-sized pieces', fry: 'for 6–7 minutes on each side (slice thick breasts in half horizontally first), until cooked all the way through with no pink', bake: '30–35 minutes', pot: '15', soup: '20' },
  { name: 'chicken drumsticks', kind: 'poultry', cut: 'Pat the drumsticks dry and leave them whole', fry: 'for 20–25 minutes, turning every few minutes and covering the pan for the last 10, until golden and cooked through (no pink near the bone)', bake: '45–50 minutes', pot: '30–35', soup: '30' },
  { name: 'turkey', kind: 'poultry', cut: 'Cut the turkey into bite-sized pieces', fry: 'for 5–6 minutes on each side, until cooked all the way through with no pink', bake: '30–35 minutes', pot: '15–20', soup: '20' },
  { name: 'beef steak', kind: 'red', cut: 'Cut the steak into bite-sized pieces', fry: 'for 2–4 minutes on each side, depending on thickness and how you like it', bake: '', pot: '20–25' },
  { name: 'lamb chops', kind: 'red', cut: 'Slice the meat off the bones and cut it into bite-sized pieces', fry: 'for 3–4 minutes on each side, until browned and cooked to your liking', bake: '', pot: '25' },
  { name: 'pork chops', kind: 'red', cut: 'Slice the meat off the bones and cut it into bite-sized pieces', fry: 'for 5–6 minutes on each side, until golden and cooked all the way through with no pink', bake: '', pot: '20' },
  { name: 'beef mince', kind: 'mince', cut: '', fry: 'for 6–8 minutes, breaking it up with a spoon, until browned and no pink remains', bake: '', pot: '15' },
  { name: 'pork mince', kind: 'mince', cut: '', fry: 'for 6–8 minutes, breaking it up with a spoon, until browned and no pink remains', bake: '', pot: '15' },
  { name: 'lamb mince', kind: 'mince', cut: '', fry: 'for 6–8 minutes, breaking it up with a spoon, until browned and no pink remains', bake: '', pot: '15' },
  { name: 'turkey mince', kind: 'mince', cut: '', fry: 'for 6–8 minutes, breaking it up with a spoon, until golden and no pink remains', bake: '', pot: '15' },
  { name: 'sausages', kind: 'sausage', cut: 'Cut the sausages into thick slices', fry: 'for 12–15 minutes, turning often, until browned and cooked through with no pink in the middle', bake: '35–40 minutes', pot: '15–20' },
  { name: 'bacon', kind: 'cured', cut: 'Cut the bacon into small pieces', fry: 'for 4–6 minutes until golden and crisp', bake: '', pot: '15' },
  { name: 'ham', kind: 'cured', cut: 'Cut the ham into small pieces', fry: 'for 2–3 minutes, just to warm it through and take on a little colour', bake: '', pot: '15' },
  { name: 'chorizo', kind: 'cured', cut: 'Cut the chorizo into small pieces', fry: 'for 3–5 minutes, until it turns crisp at the edges and the oil runs red', bake: '', pot: '15' },
  { name: 'salmon', kind: 'fish', cut: '', fry: 'skin-side down first, for 4 minutes, then flip and cook for 2–4 minutes, until it flakes easily', bake: '12–15 minutes', pot: '8–10' },
  { name: 'cod', kind: 'fish', cut: '', fry: 'for 3–4 minutes on each side, until opaque and it flakes easily', bake: '12–15 minutes', pot: '8–10' },
  { name: 'haddock', kind: 'fish', cut: '', fry: 'for 3–4 minutes on each side, until opaque and it flakes easily', bake: '12–15 minutes', pot: '8–10' },
  { name: 'trout', kind: 'fish', cut: '', fry: 'skin-side down first, for 3–4 minutes, then flip and cook for 2–3 minutes, until it flakes easily', bake: '12–15 minutes', pot: '8–10' },
  { name: 'sea bass', kind: 'fish', cut: '', fry: 'skin-side down first, for 3–4 minutes, then flip and cook for 1–2 minutes, until it flakes easily', bake: '10–12 minutes', pot: '8' },
  { name: 'white fish fillets', kind: 'fish', cut: '', fry: 'for 3–4 minutes on each side, until opaque and it flakes easily', bake: '12–15 minutes', pot: '8–10' },
  { name: 'prawns', kind: 'fish', cut: '', fry: 'for 2–3 minutes on each side, until pink all over and cooked through', bake: '8–10 minutes', pot: '4–5' },
]

const RICES = ['rice', 'basmati rice', 'brown rice', 'jasmine rice']
const POT_RICES = ['rice', 'basmati rice']

// veg for the three-ingredient one-pots. "end" veg go in near the finish.
const VEG: { name: string; when: 'start' | 'end'; prep: string }[] = [
  { name: 'onion', when: 'start', prep: 'Finely chop the onion and cook it for 4–5 minutes until soft' },
  { name: 'garlic', when: 'start', prep: 'Crush or finely chop the garlic and cook for 30 seconds, stirring so it does not burn' },
  { name: 'tomatoes', when: 'start', prep: 'Chop the tomatoes and cook them for 3–4 minutes until they start to break down' },
  { name: 'carrots', when: 'start', prep: 'Dice the carrots small and cook for 4–5 minutes until just starting to soften' },
  { name: 'peppers', when: 'start', prep: 'Deseed and dice the peppers and cook for 4–5 minutes until softened' },
  { name: 'mushrooms', when: 'start', prep: 'Slice the mushrooms and cook for 4–5 minutes until golden and the liquid has cooked off' },
  { name: 'courgette', when: 'start', prep: 'Dice the courgette and cook for 3–4 minutes until it starts to soften' },
  { name: 'broccoli', when: 'start', prep: 'Cut the broccoli into very small florets and cook for 2–3 minutes' },
  { name: 'sweetcorn', when: 'end', prep: 'Stir in the sweetcorn' },
  { name: 'peas', when: 'end', prep: 'Stir in the peas' },
  { name: 'spinach', when: 'end', prep: 'Stir in the spinach' },
]

const ricePacket = (r: string) => `Cook the ${r} following the packet instructions, drain, cover and keep warm.`
const waterNote = (r: string) =>
  r === 'brown rice' ? 'about 2½ cups (600 ml) of hot water or stock, and expect it to take 25–30 minutes' : 'about 2 cups (500 ml) of hot water or stock'

interface Draft {
  name: string
  time: number
  serves: number
  basics: string[]
  blurb: string
  steps: string[]
  uses: string[] // ingredient names
}

const SEASON = ['oil', 'salt', 'black pepper']

/* ----------------------------- one-pot ----------------------------- */

function potSteps(p: Prot, r: string, veg?: (typeof VEG)[number]): string[] {
  const m = p.name
  const vegStart = veg && veg.when === 'start' ? [`${veg.prep}.`] : []
  const vegEnd = veg && veg.when === 'end' ? [`${veg.prep} for the last 5 minutes of cooking.`] : []
  const rest = 'Rest, covered and off the heat, for 5 minutes, then fluff with a fork and serve.'
  const pour = (extra = '') => `Stir in 1 cup (about 200 g) of ${r} so every grain is coated, then pour in ${waterNote(r)}. Season, bring to a simmer${extra}.`

  if (p.kind === 'fish') {
    return [
      `Heat a splash of oil in a wide pan with a lid over medium heat.`,
      ...vegStart,
      `Stir in 1 cup (about 200 g) of ${r}, then pour in ${waterNote(r)}. Season with salt and pepper, bring to a simmer, cover and cook on low for 10 minutes (about 20 for brown rice).`,
      ...(veg && veg.when === 'end' ? [`${veg.prep} now.`] : []),
      `Lay the ${m} on top of the rice, cover again and cook for ${p.pot} minutes more, until it is cooked through and the rice is tender.`,
      `Turn off the heat, rest for 3 minutes, then break up the ${m} gently and fluff the rice with a fork.`,
    ]
  }
  if (p.kind === 'mince') {
    return [
      `Heat a splash of oil in a wide pan with a lid over medium-high heat. Add the ${m} and cook ${p.fry}. Season with salt and pepper.`,
      ...vegStart,
      pour(),
      `Cover, turn the heat to low and cook for 15 minutes (about 30 for brown rice) until the rice is tender and the liquid has been absorbed.`,
      ...vegEnd,
      rest,
    ]
  }
  if (p.kind === 'cured') {
    return [
      `${p.cut}. Cook it in a wide pan with a lid over medium heat ${p.fry}. The ${m} is salty, so go easy with extra salt later.`,
      ...vegStart,
      pour(),
      `Cover, turn the heat to low and cook for 15 minutes (about 30 for brown rice) until the rice is tender and the liquid has been absorbed.`,
      ...vegEnd,
      rest,
    ]
  }
  // poultry, red meat, sausage
  return [
    `${p.cut}, then season well with salt and pepper.`,
    `Heat a splash of oil in a wide pan with a lid over medium-high heat. Brown the ${m} for 5–6 minutes, turning, until golden all over.`,
    ...vegStart,
    pour(),
    `Cover, turn the heat to low and cook for ${p.pot} minutes (add 10–15 more for brown rice, with a splash more water) until the rice is tender, the liquid is absorbed and the ${m} is cooked all the way through (no pink in the middle).`,
    ...vegEnd,
    rest,
  ]
}

/* --------------------------- other methods --------------------------- */

function panSteps(p: Prot, r: string): string[] {
  const m = p.name
  if (p.kind === 'fish') {
    return [
      ricePacket(r),
      `Pat the ${m} dry and season with salt and pepper.`,
      `Heat a splash of oil in a frying pan over medium-high heat and cook the ${m} ${p.fry}.`,
      `Spoon the rice onto plates, top with the ${m} and spoon over any pan juices.`,
    ]
  }
  return [
    ricePacket(r),
    `Pat the ${m} dry and season both sides well with salt and pepper.`,
    `Heat a splash of oil in a frying pan over medium-high heat and cook the ${m} ${p.fry}.`,
    `Rest the ${m} on a plate for 5 minutes, slice it if you like, and serve over the ${r} with the pan juices spooned over.`,
  ]
}

function bowlSteps(p: Prot, r: string): string[] {
  const m = p.name
  if (p.kind === 'mince') {
    return [
      ricePacket(r),
      `Heat a splash of oil in a frying pan over medium-high heat and cook the ${m} ${p.fry}.`,
      `Season well with salt and pepper and stir in 2–3 tablespoons of water so it turns juicy.`,
      `Spoon the ${r} into bowls and pile the ${m} on top.`,
    ]
  }
  if (p.kind === 'cured') {
    return [
      ricePacket(r),
      `${p.cut}. Cook it in a dry or lightly oiled frying pan over medium heat ${p.fry}.`,
      `Stir the ${m} through the warm ${r}, season with black pepper and spoon into bowls.`,
    ]
  }
  if (p.kind === 'fish') {
    return [
      ricePacket(r),
      `Season the ${m} and cook it in a splash of oil ${p.fry}.`,
      `Flake the ${m} into big pieces (or leave the prawns whole), pile over the ${r} in bowls and spoon over the pan juices.`,
    ]
  }
  return [
    ricePacket(r),
    `Season the ${m} with salt and pepper. Heat a splash of oil in a frying pan over medium-high heat and cook it ${p.fry}.`,
    `Rest for 5 minutes, then slice or pull it into pieces.`,
    `Spoon the ${r} into bowls, lay the ${m} on top and spoon over the pan juices.`,
  ]
}

function friedSteps(p: Prot, r: string): string[] {
  const m = p.name
  const dice = p.kind === 'poultry' || p.kind === 'red' || p.kind === 'sausage'
  const cook =
    p.kind === 'fish'
      ? `Season the ${m} and cook in a splash of oil in a large frying pan or wok ${p.fry}. Flake it into pieces (leave prawns whole) and tip onto a plate.`
      : p.kind === 'cured'
        ? `${p.cut}. Fry in a large frying pan or wok over medium-high heat ${p.fry}.`
        : dice
          ? `${p.cut} and season with salt and pepper. Stir-fry in a splash of oil in a large frying pan or wok over medium-high heat for 6–8 minutes, until cooked all the way through with no pink in the middle.`
          : `Heat a splash of oil in a large frying pan or wok over medium-high heat and cook the ${m} ${p.fry}.`
  return [
    `Cook the ${r} in advance following the packet instructions, then spread it on a plate to cool (day-old cold rice fries best, and should be kept chilled and eaten within a day).`,
    cook,
    `Add a little more oil, tip in the cold ${r} and stir-fry over high heat for 4–5 minutes, breaking up any clumps, until piping hot all the way through.`,
    `${p.kind === 'fish' ? `Fold the ${m} back in` : `Season with black pepper${p.kind === 'cured' ? '' : ' and a pinch of salt'}`}, stir for another minute and serve straight away.`,
  ]
}

function skilletSteps(p: Prot, r: string): string[] {
  return potSteps(p, r)
}

function bakeSteps(p: Prot, r: string): string[] {
  const m = p.name
  if (p.kind === 'fish') {
    return [
      `Heat the oven to 200°C (180°C fan, gas mark 6). ${ricePacket(r)}`,
      `Line a baking tray with baking paper, lay on the ${m}, drizzle with a little oil and season with salt and pepper.`,
      `Bake for ${p.bake}, until it is cooked through and flakes easily (prawns should be pink all over).`,
      `Spoon the ${r} onto plates and top with the ${m} and any juices from the tray.`,
    ]
  }
  const prep = p.kind === 'cured' ? `${p.cut} and scatter over the rice.` : p.kind === 'sausage' ? `Lay the whole sausages on top.` : `Lay the ${m} on top, drizzle with a little oil and season with salt and pepper.`
  return [
    `Heat the oven to 200°C (180°C fan, gas mark 6).`,
    `Tip 1 cup (about 200 g) of rinsed ${r} into a deep ovenproof dish with a good pinch of salt and ${waterNote(r).replace('and expect it to take 25–30 minutes', '(brown rice needs about 20 minutes longer in the oven)')} — boiling hot.`,
    prep,
    `Cover tightly with foil and bake for ${p.bake || '35–40 minutes'}, until the rice is tender and the ${m} is cooked all the way through (no pink in the middle).`,
    `Uncover for the last 5–10 minutes if you want the top browned, rest for 5 minutes, then fluff the rice and serve.`,
  ]
}

function soupSteps(p: Prot, r: string): string[] {
  const m = p.name
  return [
    `Put the ${m} in a large pan with 1 litre (4 cups) of water and a good pinch of salt. Bring to a gentle simmer and cook for ${p.soup} minutes, skimming off any foam.`,
    `Lift the ${m} out onto a board and shred or cut it into small pieces, discarding any bones or skin.`,
    `Add ½ cup (about 100 g) of ${r} to the broth and simmer for 12–15 minutes (25–30 for brown rice) until tender.`,
    `Return the ${m} to the pan, heat through, season with plenty of black pepper and ladle into bowls.`,
  ]
}

function meatballSteps(p: Prot, r: string): string[] {
  const m = p.name
  return [
    ricePacket(r),
    `Season the ${m} with salt and pepper and shape into 10–12 small balls with damp hands.`,
    `Heat a splash of oil in a frying pan over medium heat and fry the balls for 8–10 minutes, turning, until browned all over and cooked through with no pink in the middle.`,
    `Spoon the ${r} onto plates, top with the balls and spoon over the pan juices.`,
  ]
}

function stripSteps(p: Prot, r: string): string[] {
  const m = p.name
  return [
    ricePacket(r),
    `Slice the ${m} into thin strips (cut the meat off the bone first, if it has one) and season with salt and pepper.`,
    `Heat a splash of oil in a wok or large frying pan over very high heat. Stir-fry the strips for 3–5 minutes until browned and cooked through (no pink in the middle for pork).`,
    `Add a splash of water to loosen the pan juices, toss for 30 seconds and serve over the ${r}.`,
  ]
}

/* ------------------------------ potatoes ------------------------------ */

function potatoDrafts(p: Prot): Draft[] {
  const m = p.name
  const list: Draft[] = []
  if (p.bake && p.kind !== 'cured') {
    list.push({
      name: `Tray-baked ${m} and potatoes`,
      time: 55,
      serves: 2,
      basics: SEASON,
      blurb: 'One tray, two ingredients and nothing to wash up but the tray.',
      uses: [p.name, 'potatoes'],
      steps:
        p.kind === 'fish'
          ? [
              'Heat the oven to 220°C (200°C fan, gas mark 7). Cut the potatoes into 2 cm chunks, toss in oil, salt and pepper on a large tray and roast for 30 minutes, turning once.',
              `Push the potatoes to one side, add the ${m}, drizzle with oil and season.`,
              `Roast for ${p.bake} more, until the ${m} is cooked through and flakes easily and the potatoes are golden and tender.`,
            ]
          : [
              'Heat the oven to 220°C (200°C fan, gas mark 7). Cut the potatoes into 2 cm chunks and toss with oil, salt and pepper on a large tray.',
              `Nestle the ${m} among the potatoes, drizzle with oil and season well.`,
              `Roast for ${p.bake}, turning the potatoes once, until the ${m} is cooked all the way through (no pink, and the juices run clear) and the potatoes are golden and tender.`,
            ],
    })
  }
  list.push({
    name: `Pan-fried ${m} with crispy potatoes`,
    time: 40,
    serves: 2,
    basics: SEASON,
    blurb: 'Golden potatoes and a proper pan-fried main.',
    uses: [p.name, 'potatoes'],
    steps: [
      'Cut the potatoes into 2 cm cubes and boil in salted water for 6–8 minutes until just tender. Drain well and let them steam dry.',
      'Heat a generous splash of oil in a large frying pan over medium-high heat and fry the potatoes for 10–12 minutes, turning now and then, until golden and crisp. Season and keep warm.',
      p.kind === 'mince'
        ? `In the same pan, cook the ${m} ${p.fry}. Season well.`
        : p.kind === 'cured'
          ? `${p.cut}. Fry ${p.fry}.`
          : `Pat the ${m} dry, season, and cook in a little oil ${p.fry}.`,
      `Serve the ${m} on top of the potatoes with the pan juices.`,
    ],
  })
  list.push({
    name: `${cap(m)} with creamy mash`,
    time: 40,
    serves: 2,
    basics: [...SEASON, 'butter', 'a splash of milk (optional)'],
    blurb: 'Comfort food at its simplest.',
    uses: [p.name, 'potatoes'],
    steps: [
      'Peel and chop the potatoes, cover with cold salted water, bring to the boil and simmer for 15–20 minutes until completely tender.',
      'Drain, return to the warm pan and mash with a knob of butter, a splash of milk if you have it, salt and pepper until smooth.',
      p.kind === 'mince'
        ? `Meanwhile cook the ${m} in a splash of oil ${p.fry}. Season well.`
        : p.kind === 'cured'
          ? `Meanwhile ${p.cut.toLowerCase()} and fry ${p.fry}.`
          : `Meanwhile, season the ${m} and cook in a splash of oil ${p.fry}.`,
      `Pile the mash onto plates and serve the ${m} alongside or on top.`,
    ],
  })
  return list
}


const lcFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)

// Slot a vegetable step into an existing method. "side" methods cook the veg in the pan after the meat.
function withVeg(steps: string[], v: (typeof VEG)[number], at: number, side = false): string[] {
  const last = steps.length - 1
  const step =
    v.when === 'start'
      ? `In the same pan, ${lcFirst(v.prep)}.`
      : side
        ? `Add the ${v.name} to the pan and warm through for 2 minutes.`
        : `${v.prep} for the final 2 minutes.`
  const i = v.when === 'start' ? (side ? last : at) : last
  return [...steps.slice(0, i), step, ...steps.slice(i)]
}

/* ------------------------------ beans & rice ------------------------------ */

const LEGUMES = ['chickpeas', 'beans', 'kidney beans', 'black beans', 'cannellini beans', 'butter beans', 'mixed beans', 'borlotti beans']

function legumeDrafts(l: string, r: string): Draft[] {
  const tin = `Drain and rinse a 400 g tin of ${l}.`
  const uses = [l, r]
  return [
    {
      name: `${cap(l)} and ${r} one-pot`, time: 30, serves: 2, uses, basics: [...SEASON, 'stock cube (optional)'],
      blurb: 'A pantry supper in one pan.',
      steps: [
        tin,
        `Heat a splash of oil in a wide pan with a lid over medium heat. Stir in 1 cup (about 200 g) of ${r} for a minute, then pour in ${waterNote(r)}.`,
        `Add the ${l}, season generously with salt and pepper, bring to a simmer, cover and cook on low for 15 minutes (about 30 for brown rice) until the rice is tender and the liquid is absorbed.`,
        'Rest, covered, for 5 minutes, then fluff with a fork and serve.',
      ],
    },
    {
      name: `${cap(l)} ${r} bowl`, time: 20, serves: 2, uses, basics: [...SEASON, 'a splash of water'],
      blurb: 'Warm, savoury and ready in 20 minutes.',
      steps: [
        ricePacket(r),
        tin,
        `Warm a splash of oil in a pan, add the ${l} with 3 tablespoons of water and cook for 5 minutes, pressing a few with a spoon so the sauce turns creamy. Season well with salt and pepper.`,
        `Spoon the ${r} into bowls and pile the ${l} on top.`,
      ],
    },
    {
      name: `Pan-crisped ${l} on ${r}`, time: 25, serves: 2, uses, basics: SEASON,
      blurb: 'Crisp-edged beans over fluffy rice.',
      steps: [
        ricePacket(r),
        `${tin} Pat them very dry with kitchen paper.`,
        `Heat a generous splash of oil in a frying pan over medium-high heat and fry the ${l} for 8–10 minutes, shaking the pan now and then, until golden and crisp at the edges. Season with salt and pepper.`,
        `Spoon the ${r} onto plates and top with the ${l}.`,
      ],
    },
    {
      name: `Baked ${l} and ${r}`, time: 50, serves: 2, uses, basics: SEASON,
      blurb: 'Tip it in a dish and let the oven do the work.',
      steps: [
        'Heat the oven to 200°C (180°C fan, gas mark 6).',
        `${tin} Tip 1 cup (about 200 g) of rinsed ${r} into a deep ovenproof dish with a pinch of salt and pour over ${waterNote(r).replace('and expect it to take 25–30 minutes', '(brown rice needs about 20 minutes longer in the oven)')} — boiling hot.`,
        `Stir in the ${l}, season with pepper, cover tightly with foil and bake for 30–35 minutes until the rice is tender and the liquid is absorbed.`,
        'Rest for 5 minutes, fluff with a fork and serve.',
      ],
    },
  ]
}

/* ------------------------------- builder ------------------------------- */

function riceDrafts(p: Prot, r: string): Draft[] {
  const m = p.name
  const base = { serves: 2, uses: [p.name, r] }
  const D = (d: Omit<Draft, 'serves' | 'uses'>): Draft => ({ ...base, ...d })
  const out: Draft[] = []

  if (p.kind === 'poultry') {
    out.push(
      D({ name: `${cap(m)} and ${r} one-pot`, time: 40, basics: [...SEASON, 'stock cube (optional)'], blurb: 'Everything cooks in one pan, so the rice drinks up all the flavour.', steps: potSteps(p, r) }),
      D({ name: `Pan-fried ${m} with ${r}`, time: 30, basics: SEASON, blurb: 'Golden meat, fluffy rice, nothing complicated.', steps: panSteps(p, r) }),
      D({ name: `Baked ${m} and ${r}`, time: 55, basics: SEASON, blurb: 'Put it all in one dish, cover, and let the oven do the work.', steps: bakeSteps(p, r) }),
      D({ name: `${cap(m)} ${r} bowl`, time: 30, basics: SEASON, blurb: 'Sliced meat on warm rice, with the pan juices spooned over.', steps: bowlSteps(p, r) }),
      D({ name: `Simple ${m} and ${r} soup`, time: 40, basics: ['salt', 'black pepper', 'stock cube (optional)'], blurb: 'Gentle, comforting and made from just two ingredients.', steps: soupSteps(p, r) }),
    )
  } else if (p.kind === 'red') {
    out.push(
      D({ name: `Pan-seared ${m} with ${r}`, time: 25, basics: SEASON, blurb: 'A hot pan, a few minutes each side, and dinner is done.', steps: panSteps(p, r) }),
      D({ name: `${cap(m)} ${r} bowl`, time: 30, basics: SEASON, blurb: 'Sliced, juicy meat piled over warm rice.', steps: bowlSteps(p, r) }),
      D({ name: `${cap(m)} strips with ${r}`, time: 25, basics: SEASON.concat('a splash of water'), blurb: 'Fast, hot and savoury.', steps: stripSteps(p, r) }),
      D({ name: `${cap(m)} and ${r} one-pot`, time: 45, basics: [...SEASON, 'stock cube (optional)'], blurb: 'Slow-simmered together so the rice tastes of the meat.', steps: potSteps(p, r) }),
    )
  } else if (p.kind === 'mince') {
    out.push(
      D({ name: `${cap(m)} fried ${r}`, time: 25, basics: SEASON, blurb: 'Cold leftover rice turns into something far better than leftovers.', steps: friedSteps(p, r) }),
      D({ name: `${cap(m)} and ${r} skillet`, time: 35, basics: [...SEASON, 'stock cube (optional)'], blurb: 'Brown it, add the rice and water, and leave it be.', steps: skilletSteps(p, r) }),
      D({ name: `${cap(m)} ${r} bowl`, time: 25, basics: [...SEASON, 'a splash of water'], blurb: 'Juicy, savoury mince over fluffy rice.', steps: bowlSteps(p, r) }),
      D({ name: `${cap(m)} balls with ${r}`, time: 30, basics: SEASON, blurb: 'Little browned balls with the pan juices spooned over rice.', steps: meatballSteps(p, r) }),
    )
  } else if (p.kind === 'sausage') {
    out.push(
      D({ name: `Sausage fried ${r}`, time: 30, basics: SEASON, blurb: 'Sliced sausage and crispy rice in one pan.', steps: friedSteps(p, r) }),
      D({ name: `Sausage and ${r} one-pot`, time: 40, basics: [...SEASON, 'stock cube (optional)'], blurb: 'Browned sausages, rice and water: dinner in a single pan.', steps: potSteps(p, r) }),
      D({ name: `Sausage ${r} bowl`, time: 30, basics: SEASON, blurb: 'Sliced, golden sausages on top of warm rice.', steps: bowlSteps(p, r) }),
      D({ name: `Baked sausages and ${r}`, time: 55, basics: SEASON, blurb: 'Put it all in a dish and let the oven do the work.', steps: bakeSteps(p, r) }),
    )
  } else if (p.kind === 'cured') {
    out.push(
      D({ name: `${cap(m)} fried ${r}`, time: 25, basics: ['oil', 'black pepper'], blurb: 'Salty, savoury and ready in 25 minutes.', steps: friedSteps(p, r) }),
      D({ name: `${cap(m)} and ${r} pilaf`, time: 35, basics: ['oil', 'black pepper', 'stock cube (optional)'], blurb: 'A one-pan pilaf, flavoured by the meat.', steps: potSteps(p, r) }),
      D({ name: `${cap(m)} ${r} bowl`, time: 20, basics: ['oil', 'black pepper'], blurb: 'The quickest supper in the book.', steps: bowlSteps(p, r) }),
      D({
        name: `Baked ${m} ${r}`,
        time: 50,
        basics: ['salt', 'black pepper'],
        blurb: 'A cosy rice bake with all the flavour of the meat.',
        steps: [
          'Heat the oven to 200°C (180°C fan, gas mark 6).',
          `Tip 1 cup (about 200 g) of rinsed ${r} into a deep ovenproof dish and pour over ${waterNote(r).replace('and expect it to take 25–30 minutes', '(brown rice needs about 20 minutes longer in the oven)')} — boiling hot. Season with black pepper, but hold back on salt.`,
          `${p.cut} and scatter over the top.`,
          'Cover tightly with foil and bake for 30–35 minutes until the rice is tender and the liquid is absorbed. Uncover for 5 minutes, then fluff and serve.',
        ],
      }),
    )
  } else {
    out.push(
      D({ name: `Pan-fried ${m} with ${r}`, time: 25, basics: SEASON, blurb: 'Crisp outside, tender inside, with simple rice.', steps: panSteps(p, r) }),
      D({ name: `Oven-baked ${m} with ${r}`, time: 30, basics: SEASON, blurb: 'Almost no effort, almost no mess.', steps: bakeSteps(p, r) }),
      D({ name: `${cap(m)} ${r} bowl`, time: 25, basics: SEASON, blurb: 'Flaked fish over warm rice, with the pan juices.', steps: bowlSteps(p, r) }),
      D({ name: `${cap(m)} fried ${r}`, time: 25, basics: SEASON, blurb: 'A quick fried rice with a seafood twist.', steps: friedSteps(p, r) }),
      D({ name: `${cap(m)} and ${r} one-pot`, time: 35, basics: SEASON, blurb: 'The fish steams on top of the rice for the last few minutes.', steps: potSteps(p, r) }),
    )
  }
  return out
}

export type SimpleRecipe = Omit<Recipe, 'id'>

export function makeSimple(): SimpleRecipe[] {
  const out: SimpleRecipe[] = []
  const seen = new Set<string>()
  const add = (d: Draft, fam: string) => {
    const key = d.name.toLowerCase()
    if (seen.has(key)) return
    const ids: string[] = []
    for (const n of d.uses) {
      const ing = BY_NAME.get(n)
      if (!ing) return // unknown ingredient: skip rather than crash
      ids.push(ing.id)
    }
    seen.add(key)
    out.push({
      name: d.name,
      cat: 'meal',
      time: d.time,
      serves: d.serves,
      uses: [...new Set(ids)],
      basics: d.basics,
      steps: d.steps,
      blurb: d.blurb,
      img: '',
      fam,
      plain: true,
    })
  }

  // 1) protein + rice, several methods each
  for (const p of PROTS) for (const r of RICES) for (const d of riceDrafts(p, r)) add(d, 'simple')

  // 2) protein + veg + rice: one-pot, bowl and fried rice
  for (const p of PROTS) {
    for (const r of POT_RICES) {
      for (const v of VEG) {
        const base = { serves: 2, uses: [p.name, v.name, r], basics: [...SEASON, 'stock cube (optional)'] }
        add({ ...base, name: `${cap(p.name)}, ${v.name} & ${r} one-pot`, time: 40, blurb: 'Meat, veg and rice cooked together in one pan.', steps: potSteps(p, r, v) }, 'simple')
        if (p.name !== 'chicken drumsticks') {
          add({ ...base, name: `${cap(p.name)} & ${v.name} fried ${r}`, time: 30, blurb: 'A quick, flexible fried rice.', steps: withVeg(friedSteps(p, r), v, 2) }, 'simple')
        }
        if (p.kind !== 'cured') {
          add({ ...base, name: `${cap(p.name)} & ${v.name} ${r} bowl`, time: 30, blurb: 'Everything on one plate, nothing fancy.', steps: withVeg(bowlSteps(p, r), v, 0, true) }, 'simple')
        }
        if (p.kind === 'poultry' || p.kind === 'red' || p.kind === 'fish') {
          add({ ...base, name: `Pan-fried ${p.name} with ${v.name} & ${r}`, time: 30, blurb: 'A pan-fried main with the veg cooked in the same pan.', steps: withVeg(panSteps(p, r), v, 0, true) }, 'simple')
        }
      }
    }
  }

  // 2b) beans and rice
  for (const l of LEGUMES) for (const r of RICES) for (const d of legumeDrafts(l, r)) add(d, 'simple')

  // 3) protein + potatoes
  for (const p of PROTS) for (const d of potatoDrafts(p)) add(d, 'simple')

  return out
}
