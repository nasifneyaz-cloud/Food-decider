export const SOURCE_SHORT = 'UNEP Food Waste Index Report 2024 (with WRAP)'
export const SOURCE_URL = 'https://www.unep.org/resources/publication/food-waste-index-report-2024'

export interface Figure {
  to: number
  dec?: number
  pre?: string
  post: string
  label: string
  src: string
}

// The four headline figures under the hero.
export const FIGURES: Figure[] = [
  {
    to: 1.05,
    dec: 2,
    post: ' bn t',
    label: 'tonnes of food wasted worldwide in 2022: 132 kg per person, about 19% of all food available to consumers.',
    src: 'UNEP Food Waste Index 2024',
  },
  {
    to: 60,
    post: '%',
    label: 'came from households: 631 million tonnes, or 79 kg per person every year.',
    src: 'UNEP Food Waste Index 2024',
  },
  {
    to: 1,
    post: ' bn+',
    label: 'meals binned every single day, while 783 million people were affected by hunger.',
    src: 'UNEP Food Waste Index 2024',
  },
  {
    to: 8,
    post: '–10%',
    label: 'of global greenhouse gas emissions come from food loss and waste.',
    src: 'UNEP',
  },
]

// Where the 1.05 bn tonnes came from (UNEP Food Waste Index Report 2024).
export const SECTORS = [
  { label: 'Households', share: 60, mt: 631, color: 'bg-tomato' },
  { label: 'Food service', share: 28, mt: 290, color: 'bg-mustard' },
  { label: 'Retail', share: 12, mt: 131, color: 'bg-forest-2' },
]

export interface Habit {
  emoji: string
  title: string
  text: string
  why: string
}

export const HABITS: Habit[] = [
  {
    emoji: '🌿',
    title: 'Keep herbs like flowers',
    text: 'Trim the stems and stand soft herbs such as parsley, coriander and mint in a glass of water in the fridge, with a loose bag on top. Basil prefers the counter.',
    why: 'Their stems keep drinking, so they stay perky for days longer.',
  },
  {
    emoji: '🍞',
    title: 'Freeze bread sliced',
    text: 'Slice a loaf before it goes stale and freeze it. Toast slices straight from the freezer, one or two at a time.',
    why: 'You only defrost what you will actually eat. No more stale heels.',
  },
  {
    emoji: '🧅',
    title: 'Onions away from potatoes',
    text: 'Keep both in a cool, dark, airy place, but not in the same bag or basket.',
    why: 'Stored side by side they tend to spoil faster than they would apart.',
  },
  {
    emoji: '🥛',
    title: 'Milk off the fridge door',
    text: 'The door is the warmest, most changeable spot. Give milk a shelf at the back, where the temperature is colder and steadier.',
    why: 'Steady cold means it stays fresh up to its date.',
  },
  {
    emoji: '📦',
    title: 'Make an “eat me first” box',
    text: 'Pop anything half-used or close to its date in one clear box at eye level. Look in it before you shop and before you cook.',
    why: 'Out of sight is out of mind. In sight, it gets eaten.',
  },
  {
    emoji: '🧊',
    title: 'Freeze a scraps bag for stock',
    text: 'Onion ends, carrot peelings, celery tops and herb stalks go into a bag in the freezer. When it is full, simmer with water for about 45 minutes.',
    why: 'Free stock from things you would have binned. Go easy on strong cabbage-family scraps, which can turn it bitter.',
  },
]

export const PLAN_STEPS = [
  { n: '1', title: 'Look before you shop', text: 'Open the fridge, freezer and cupboard first. Tick what you find in the finder and write down only what is missing.' },
  { n: '2', title: 'Plan around what is there', text: 'Pick two or three meals that use the oldest items first. A recipe with one thing missing beats a whole new shop.' },
  { n: '3', title: 'Store it to last', text: 'Use the habits above: eat-me-first box, freezer for bread and scraps, herbs in water. Small moves, big difference.' },
]
