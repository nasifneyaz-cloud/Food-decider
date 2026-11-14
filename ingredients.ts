// Ingredient database. One line per ingredient: name|emoji|group|roles
// "roles" are single-letter tags the recipe generator uses to build sensible combinations.
//  V cooking veg   S salad veg    G leafy greens   O starchy veg    W stuffable veg
//  F fruit  C citrus  J smoothie fruit  j juice  m dried fruit
//  D cheese K milk/cream/yogurt z yogurt-like E eggs u butter
//  T roasting meat  I mince/cured/sausage  Q cooking fish  f ready-to-eat fish
//  L legumes/tofu  l ready sauced beans  g soft-cooking pulses
//  R grains  r plain rice  i risotto grains  N pasta  n asian noodles  B sliced bread  P wraps/flatbreads
//  e oats  b breadcrumbs  k crackers/snacks  p popcorn
//  H fresh herb  X savoury seasoning  x sweet spice/flavour  Y curry paste/powder
//  U nuts/seeds  M spreads  A pasta sauce  c curry liquid  Z stir-fry sauce  y stock/flavour base
//  v vinegar/dressing/condiment  d dips  s sweetener  w treats  a tea  o coffee  h cocoa  q fizzy

export type GroupId = 'v' | 'f' | 'd' | 'm' | 'l' | 'g' | 'h' | 'n' | 'p' | 's' | 'k'

export interface Group {
  id: GroupId
  label: string
  emoji: string
}

export const GROUPS: Group[] = [
  { id: 'v', label: 'Vegetables', emoji: '🥕' },
  { id: 'f', label: 'Fruit', emoji: '🍎' },
  { id: 'd', label: 'Dairy & eggs', emoji: '🧀' },
  { id: 'm', label: 'Meat & fish', emoji: '🍗' },
  { id: 'l', label: 'Beans & tofu', emoji: '🫘' },
  { id: 'g', label: 'Grains & bakery', emoji: '🍞' },
  { id: 'h', label: 'Herbs & spices', emoji: '🌿' },
  { id: 'n', label: 'Nuts & seeds', emoji: '🥜' },
  { id: 'p', label: 'Tins, jars & sauces', emoji: '🥫' },
  { id: 's', label: 'Sweet things', emoji: '🍯' },
  { id: 'k', label: 'Drinks', emoji: '☕' },
]

export interface Ingredient {
  id: string
  name: string
  emoji: string
  group: GroupId
  roles: string
  popular: boolean
}

// The 26 everyday ingredients shown first.
export const POPULAR = [
  'eggs', 'bread', 'milk', 'cheese', 'yogurt', 'butter', 'rice', 'pasta', 'oats',
  'tomatoes', 'onion', 'garlic', 'potatoes', 'carrots', 'spinach', 'mushrooms',
  'peppers', 'cucumber', 'chickpeas', 'beans', 'tinned tuna', 'chicken', 'bananas',
  'apples', 'lemons', 'peas',
]

const RAW = `
tomatoes|🍅|v|VSW
cherry tomatoes|🍅|v|VS
onion|🧅|v|V
red onion|🧅|v|VS
spring onions|🧅|v|VS
shallots|🧅|v|V
leeks|🥬|v|V
potatoes|🥔|v|O
new potatoes|🥔|v|O
sweet potatoes|🍠|v|OW
carrots|🥕|v|VS
parsnips|🥕|v|OV
beetroot|🟣|v|VS
swede|🥔|v|O
turnips|🥔|v|O
celeriac|🥔|v|O
butternut squash|🎃|v|OVW
pumpkin|🎃|v|OV
courgette|🥒|v|VSW
aubergine|🍆|v|VW
peppers|🫑|v|VSW
cucumber|🥒|v|S
mushrooms|🍄|v|V
portobello mushrooms|🍄|v|VW
peas|🟢|v|V
sweetcorn|🌽|v|VS
green beans|🫛|v|V
broccoli|🥦|v|V
cauliflower|🥦|v|V
cabbage|🥬|v|VS
red cabbage|🥬|v|VS
brussels sprouts|🥬|v|V
celery|🥬|v|VS
fennel|🌿|v|VS
radishes|🔴|v|S
asparagus|🌱|v|V
pak choi|🥬|v|VG
bean sprouts|🌱|v|S
mangetout|🫛|v|VS
sugar snap peas|🫛|v|VS
baby corn|🌽|v|V
broad beans|🫛|v|V
okra|🫛|v|V
spinach|🥬|v|G
kale|🥬|v|GV
rocket|🥗|v|GS
lettuce|🥬|v|GS
baby gem lettuce|🥬|v|GS
watercress|🌿|v|GS
chard|🥬|v|GV
cavolo nero|🥬|v|GV
spring greens|🥬|v|GV
endive|🥬|v|S
radicchio|🥬|v|S
avocado|🥑|v|S
olives|🫒|v|S
artichoke hearts|🌿|v|VS
roasted red peppers|🫑|v|VS
sun-dried tomatoes|🍅|v|S
apples|🍎|f|F
pears|🍐|f|F
bananas|🍌|f|FJ
oranges|🍊|f|FCJ
lemons|🍋|f|FCJ
limes|🍋|f|FCJ
grapefruit|🍊|f|FCJ
clementines|🍊|f|FCJ
satsumas|🍊|f|FCJ
blood oranges|🍊|f|FCJ
strawberries|🍓|f|FJ
blueberries|🫐|f|FJ
raspberries|🍓|f|FJ
blackberries|🫐|f|FJ
cherries|🍒|f|FJ
grapes|🍇|f|F
mango|🥭|f|FJ
pineapple|🍍|f|FJ
peaches|🍑|f|FJ
nectarines|🍑|f|F
plums|🍑|f|F
apricots|🍑|f|F
kiwi|🥝|f|FJ
melon|🍈|f|FJ
watermelon|🍉|f|FJ
pomegranate|🍎|f|F
figs|🍇|f|F
papaya|🍈|f|FJ
passion fruit|🍈|f|FJ
coconut|🥥|f|F
rhubarb|🌱|f|F
cranberries|🍒|f|F
redcurrants|🍒|f|F
lychees|🍈|f|F
frozen berries|🫐|f|FJ
frozen mango|🥭|f|FJ
tinned peaches|🍑|f|F
tinned pineapple|🍍|f|F
tinned pears|🍐|f|F
dates|🌴|f|Fm
raisins|🍇|f|Fm
sultanas|🍇|f|Fm
dried apricots|🍑|f|Fm
prunes|🍑|f|Fm
dried cranberries|🍒|f|Fm
dried figs|🍇|f|Fm
mixed dried fruit|🍇|f|Fm
eggs|🥚|d|E
milk|🥛|d|K
cheese|🧀|d|D
cheddar|🧀|d|D
yogurt|🥛|d|Kz
Greek yogurt|🥛|d|Kz
coconut yogurt|🥥|d|Kz
kefir|🥛|d|Kz
skyr|🥛|d|Kz
butter|🧈|d|u
ghee|🧈|d|u
cream|🥛|d|K
soured cream|🥛|d|K
creme fraiche|🥛|d|K
buttermilk|🥛|d|K
oat milk|🥛|d|K
almond milk|🥛|d|K
soy milk|🥛|d|K
mozzarella|🧀|d|D
parmesan|🧀|d|D
feta|🧀|d|D
halloumi|🧀|d|D
goat's cheese|🧀|d|D
cream cheese|🧀|d|D
cottage cheese|🧀|d|D
ricotta|🧀|d|D
mascarpone|🧀|d|D
blue cheese|🧀|d|D
brie|🧀|d|D
paneer|🧀|d|DL
red leicester|🧀|d|D
gouda|🧀|d|D
chicken|🍗|m|T
chicken thighs|🍗|m|T
chicken breast|🍗|m|T
chicken drumsticks|🍗|m|T
turkey|🦃|m|T
turkey mince|🥩|m|I
beef steak|🥩|m|T
beef mince|🥩|m|I
lamb chops|🍖|m|T
lamb mince|🥩|m|I
pork chops|🥩|m|T
pork mince|🥩|m|I
gammon|🍖|m|T
duck breast|🍗|m|T
sausages|🌭|m|I
bacon|🥓|m|I
ham|🍖|m|I
chorizo|🌭|m|I
salami|🍖|m|I
pancetta|🥓|m|I
salmon|🐟|m|Q
cod|🐟|m|Q
haddock|🐟|m|Q
trout|🐟|m|Q
sea bass|🐟|m|Q
white fish fillets|🐟|m|Q
prawns|🦐|m|Q
squid|🦑|m|Q
mussels|🦪|m|Q
tinned tuna|🐟|m|f
tinned salmon|🐟|m|f
sardines|🐟|m|f
mackerel|🐟|m|f
smoked mackerel|🐟|m|f
smoked salmon|🍣|m|f
anchovies|🐟|m|f
crab|🦀|m|f
chickpeas|🟡|l|L
beans|🫘|l|L
kidney beans|🫘|l|L
black beans|🫘|l|L
cannellini beans|🫘|l|L
butter beans|🫘|l|L
borlotti beans|🫘|l|L
haricot beans|🫘|l|L
mixed beans|🫘|l|L
lentils|🟤|l|Lg
green lentils|🟤|l|L
puy lentils|🟤|l|L
red lentils|🟠|l|g
split peas|🟢|l|g
black-eyed peas|🫘|l|L
edamame|🫛|l|L
tofu|⬜|l|L
smoked tofu|⬜|l|L
tempeh|🟫|l|L
soya mince|🟫|l|LI
baked beans|🫘|l|l
refried beans|🫘|l|l
falafel|🧆|l|l
bread|🍞|g|B
sourdough|🍞|g|B
wholemeal bread|🍞|g|B
rye bread|🍞|g|B
bagels|🥯|g|B
crumpets|🥞|g|B
baguette|🥖|g|B
ciabatta|🥖|g|B
brioche|🍞|g|B
English muffins|🥯|g|B
bread rolls|🥖|g|B
tortilla wraps|🌯|g|P
pitta bread|🫓|g|P
naan bread|🫓|g|P
flatbread|🫓|g|P
pizza base|🍕|g|P
taco shells|🌮|g|P
rice|🍚|g|Rr
basmati rice|🍚|g|Rr
brown rice|🍚|g|Rr
jasmine rice|🍚|g|Rr
wild rice|🍚|g|R
arborio rice|🍚|g|i
pearl barley|🌾|g|Ri
quinoa|🌾|g|R
couscous|🌾|g|R
bulgur wheat|🌾|g|R
freekeh|🌾|g|R
pasta|🍝|g|N
spaghetti|🍝|g|N
penne|🍝|g|N
fusilli|🍝|g|N
tagliatelle|🍝|g|N
macaroni|🍝|g|N
orzo|🍝|g|Ni
gnocchi|🥟|g|N
egg noodles|🍜|g|n
rice noodles|🍜|g|n
udon noodles|🍜|g|n
soba noodles|🍜|g|n
vermicelli|🍜|g|n
oats|🥣|g|e
granola|🥣|g|e
muesli|🥣|g|e
breadcrumbs|🍞|g|b
popcorn|🍿|g|p
crackers|🍘|g|k
oatcakes|🍘|g|k
rice cakes|🍘|g|k
breadsticks|🥖|g|k
tortilla chips|🌮|g|k
pretzels|🥨|g|k
basil|🌿|h|H
parsley|🌿|h|H
coriander|🌿|h|H
mint|🌿|h|H
dill|🌿|h|H
chives|🌿|h|H
thyme|🌿|h|H
rosemary|🌿|h|H
sage|🌿|h|H
tarragon|🌿|h|H
lemongrass|🌿|h|HX
bay leaves|🍃|h|X
oregano|🌿|h|X
mixed herbs|🌿|h|X
Italian seasoning|🌿|h|X
garlic|🧄|h|X
fresh ginger|🫚|h|X
chilli peppers|🌶️|h|X
cumin|🟤|h|X
ground coriander|🟤|h|X
turmeric|🟡|h|X
paprika|🌶️|h|X
smoked paprika|🌶️|h|X
chilli flakes|🌶️|h|X
chilli powder|🌶️|h|X
cayenne pepper|🌶️|h|X
za'atar|🌿|h|X
fennel seeds|🌿|h|X
mustard seeds|🟤|h|X
cumin seeds|🟤|h|X
saffron|🟠|h|X
five spice|🟤|h|X
sumac|🔴|h|X
garlic powder|🧄|h|X
onion powder|🧅|h|X
ras el hanout|🟤|h|X
jerk seasoning|🌶️|h|X
fajita seasoning|🌶️|h|X
taco seasoning|🌮|h|X
cajun seasoning|🌶️|h|X
curry leaves|🍃|h|X
mustard powder|🟡|h|X
garam masala|🟤|h|Y
curry powder|🟡|h|Y
curry paste|🟠|h|Y
red curry paste|🔴|h|Y
green curry paste|🟢|h|Y
tikka masala paste|🟠|h|Y
harissa|🌶️|h|Y
cinnamon|🟤|h|x
nutmeg|🟤|h|x
ground ginger|🟤|h|x
cloves|🟤|h|x
cardamom|🟢|h|x
allspice|🟤|h|x
mixed spice|🟤|h|x
star anise|⭐|h|x
vanilla extract|🍦|h|x
almonds|🌰|n|U
flaked almonds|🌰|n|U
walnuts|🌰|n|U
cashews|🥜|n|U
peanuts|🥜|n|U
pecans|🌰|n|U
pistachios|🌰|n|U
hazelnuts|🌰|n|U
pine nuts|🌰|n|U
brazil nuts|🌰|n|U
macadamia nuts|🌰|n|U
mixed nuts|🥜|n|U
sunflower seeds|🌻|n|U
pumpkin seeds|🎃|n|U
sesame seeds|🌰|n|U
chia seeds|⚫|n|U
flaxseed|🌾|n|U
hemp seeds|🌱|n|U
poppy seeds|⚫|n|U
desiccated coconut|🥥|n|U
peanut butter|🥜|n|M
almond butter|🌰|n|M
tahini|🌰|n|M
tinned tomatoes|🥫|p|Ac
passata|🥫|p|Ac
pesto|🌿|p|A
tomato pasta sauce|🍝|p|A
arrabbiata sauce|🌶️|p|A
white sauce|🥛|p|A
salsa|🍅|p|Ad
coconut milk|🥥|p|c
coconut cream|🥥|p|c
tomato puree|🥫|p|y
stock cubes|🧊|p|y
vegetable stock|🥫|p|y
chicken stock|🥫|p|y
beef stock|🥫|p|y
miso paste|🥫|p|yZ
soy sauce|🥫|p|Z
teriyaki sauce|🥫|p|Z
hoisin sauce|🥫|p|Z
oyster sauce|🥫|p|Z
sweet chilli sauce|🌶️|p|Z
fish sauce|🥫|p|Z
black bean sauce|🥫|p|Z
sriracha|🌶️|p|Z
BBQ sauce|🥫|p|Z
hot sauce|🌶️|p|Z
Worcestershire sauce|🥫|p|Z
balsamic vinegar|🍇|p|v
apple cider vinegar|🍎|p|v
red wine vinegar|🍷|p|v
rice vinegar|🍚|p|v
wholegrain mustard|🟡|p|v
mayonnaise|🥫|p|v
ketchup|🍅|p|v
mango chutney|🥭|p|v
vinaigrette|🥗|p|v
caesar dressing|🥗|p|v
tinned sweetcorn|🌽|p|VS
capers|🫒|p|S
gherkins|🥒|p|S
jalapeños|🌶️|p|S
pickled onions|🧅|p|S
sauerkraut|🥬|p|S
kimchi|🥬|p|S
hummus|🫘|p|d
guacamole|🥑|p|d
tzatziki|🥒|p|d
baba ganoush|🍆|p|d
olive tapenade|🫒|p|d
honey|🍯|s|s
maple syrup|🍁|s|s
brown sugar|🟤|s|s
caster sugar|⚪|s|s
golden syrup|🍯|s|s
agave syrup|🍯|s|s
jam|🍓|s|sM
strawberry jam|🍓|s|sM
marmalade|🍊|s|sM
lemon curd|🍋|s|sM
chocolate spread|🍫|s|M
dark chocolate|🍫|s|w
milk chocolate|🍫|s|w
chocolate chips|🍫|s|w
marshmallows|🍡|s|w
biscuits|🍪|s|w
digestive biscuits|🍪|s|w
ice cream|🍨|s|w
custard|🍮|s|w
black tea|🫖|k|a
green tea|🍵|k|a
earl grey tea|🫖|k|a
chamomile tea|🫖|k|a
peppermint tea|🫖|k|a
chai tea|🫖|k|a
rooibos tea|🫖|k|a
hibiscus tea|🫖|k|a
fruit tea|🫖|k|a
jasmine tea|🍵|k|a
matcha|🍵|k|a
ground coffee|☕|k|o
instant coffee|☕|k|o
espresso|☕|k|o
cold brew|☕|k|o
decaf coffee|☕|k|o
hot chocolate powder|☕|k|h
cocoa powder|🍫|k|h
malted drink powder|🥛|k|h
sparkling water|🫧|k|q
soda water|🫧|k|q
tonic water|🫧|k|q
ginger beer|🫧|k|q
lemonade|🍋|k|q
orange juice|🧃|k|j
apple juice|🧃|k|j
cranberry juice|🧃|k|j
pineapple juice|🧃|k|j
pomegranate juice|🧃|k|j
grape juice|🧃|k|j
coconut water|🥥|k|j
`

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const popularSet = new Set(POPULAR)

const parsed: Ingredient[] = RAW.split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .map((line) => {
    const [name, emoji, group, roles] = line.split('|')
    return {
      id: slug(name),
      name,
      emoji,
      group: group as GroupId,
      roles,
      popular: popularSet.has(name),
    }
  })

export const INGREDIENTS: Ingredient[] = parsed
export const BY_ID: Map<string, Ingredient> = new Map(parsed.map((i) => [i.id, i]))
export const BY_NAME: Map<string, Ingredient> = new Map(parsed.map((i) => [i.name, i]))
export const POPULAR_INGREDIENTS: Ingredient[] = POPULAR.map((n) => BY_NAME.get(n)!).filter(Boolean)

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
