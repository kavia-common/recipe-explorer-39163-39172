const MOCK_RECIPES = [
  {
    id: 1,
    title: 'Lemon Herb Grilled Chicken',
    time: '35m',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    categories: ['Dinner', 'Grill', 'Healthy'],
    description: 'Juicy grilled chicken marinated with lemon and fresh herbs.',
    ingredients: [
      '2 chicken breasts',
      '2 tbsp olive oil',
      '1 lemon (zest and juice)',
      '2 cloves garlic, minced',
      'Fresh thyme and rosemary',
      'Salt and pepper'
    ],
    instructions: [
      'Whisk marinade ingredients together.',
      'Coat chicken and marinate for 20 minutes.',
      'Grill on medium-high heat 6-7 minutes per side.',
      'Rest and serve with lemon wedges.'
    ]
  },
  {
    id: 2,
    title: 'Creamy Mushroom Pasta',
    time: '25m',
    image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop',
    categories: ['Dinner', 'Vegetarian', 'Pasta'],
    description: 'Rich and creamy mushroom sauce tossed with al dente pasta.',
    ingredients: [
      '200g pasta',
      '200g mushrooms, sliced',
      '1 cup cream',
      '2 cloves garlic',
      '2 tbsp butter',
      'Parmesan, parsley, salt and pepper'
    ],
    instructions: [
      'Cook pasta until al dente.',
      'Sauté mushrooms with butter and garlic.',
      'Add cream and simmer to thicken.',
      'Toss with pasta and finish with parmesan and parsley.'
    ]
  },
  {
    id: 3,
    title: 'Avocado Toast with Egg',
    time: '10m',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    categories: ['Breakfast', 'Healthy', 'Quick'],
    description: 'Crispy toast topped with creamy avocado and a soft egg.',
    ingredients: [
      '2 slices sourdough',
      '1 ripe avocado',
      '1 egg',
      'Chili flakes, lemon, salt'
    ],
    instructions: [
      'Toast the bread.',
      'Mash avocado with lemon and salt.',
      'Fry or poach an egg.',
      'Assemble and sprinkle chili flakes.'
    ]
  }
];

// PUBLIC_INTERFACE
export class RecipeService {
  /** Service for fetching recipe data, uses mock data if mock=true. */
  constructor(apiBase, { mock = false } = {}) {
    this.apiBase = apiBase;
    this.mock = mock || !apiBase;
  }

  async list() {
    /** Returns list of recipes. */
    if (this.mock) {
      // Simulate latency
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_RECIPES;
    }
    const res = await fetch(`${this.apiBase.replace(/\/$/, '')}/recipes`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return res.json();
  }

  async get(id) {
    /** Returns a single recipe by id. */
    if (this.mock) {
      await new Promise((r) => setTimeout(r, 100));
      const rec = MOCK_RECIPES.find((r) => String(r.id) === String(id));
      if (!rec) throw new Error('Not found');
      return rec;
    }
    const res = await fetch(`${this.apiBase.replace(/\/$/, '')}/recipes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch recipe');
    return res.json();
  }
}
