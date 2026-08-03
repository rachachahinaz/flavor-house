export const categories = [
  'All', 'Pizza', 'Burger', 'Tacos', 'Sandwich', 'Pasta', 'Meals', 'Salads', 'Drinks', 'Desserts'
];

// Tailles disponibles
export const sizes = {
  pizza: [
    { id: 'L', label: 'L', priceMultiplier: 1 },
    { id: 'XL', label: 'XL', priceMultiplier: 1.3 },
    { id: 'XXL', label: 'XXL', priceMultiplier: 1.6 },
    { id: 'Mega', label: 'Mega', priceMultiplier: 2 }
  ],
  tacos: [
    { id: 'normal', label: 'Normal', priceMultiplier: 1 },
    { id: 'L', label: 'L', priceMultiplier: 1.3 },
    { id: 'XL', label: 'XL', priceMultiplier: 1.6 },
    { id: 'XXL', label: 'XXL', priceMultiplier: 2 }
  ]
};

export const products = [
  // ===== PIZZA =====
  { 
    id: 1, 
    name: 'Pizza Blanche', 
    category: 'Pizza', 
    basePrice: 1200, 
    rating: 4.8, 
    time: '20 min', 
    image: 'https://i.pinimg.com/736x/7b/cf/b6/7bcfb62de522fa909e856a0e79542f5b.jpg', 
    ingredients: 'White sauce, Chicken, Mozzarella, Mushrooms',
    description: 'Delicious white pizza with chicken and mushrooms',
    hasSize: true,
    sizeType: 'pizza'
  },
  { 
    id: 2, 
    name: 'Pizza 4 Fromages', 
    category: 'Pizza', 
    basePrice: 1400, 
    rating: 4.9, 
    time: '22 min', 
    image: 'https://i.pinimg.com/736x/38/93/fd/3893fd139e9f8ab28e8fa27c1a694e32.jpg', 
    ingredients: 'Mozzarella, Gouda, Parmesan, Bleu',
    description: 'Four cheese pizza with creamy texture',
    hasSize: true,
    sizeType: 'pizza'
  },
  { 
    id: 3, 
    name: 'Pizza Viande', 
    category: 'Pizza', 
    basePrice: 1300, 
    rating: 4.7, 
    time: '20 min', 
    image: 'https://i.pinimg.com/736x/92/cf/e9/92cfe9047e7eeb027e155a248f9c8060.jpg', 
    ingredients: 'Beef, Sauce, Cheese, Vegetables',
    description: 'Meat lovers pizza with beef and cheese',
    hasSize: true,
    sizeType: 'pizza'
  },
  { 
    id: 4, 
    name: 'Pizza Poulet', 
    category: 'Pizza', 
    basePrice: 1200, 
    rating: 4.6, 
    time: '18 min', 
    image: 'https://i.pinimg.com/1200x/a6/9a/c2/a69ac23425364e0e79c4336b942a1216.jpg', 
    ingredients: 'Chicken, Sauce, Cheese, Vegetables',
    description: 'Chicken pizza with fresh vegetables',
    hasSize: true,
    sizeType: 'pizza'
  },
  { 
    id: 5, 
    name: 'Pizza Mixte', 
    category: 'Pizza', 
    basePrice: 1500, 
    rating: 4.9, 
    time: '25 min', 
    image: 'https://i.pinimg.com/1200x/d9/ed/10/d9ed108d451da94588d8186729e82de0.jpg', 
    ingredients: 'Chicken, Beef, Cheese, Vegetables',
    description: 'Mixed pizza with chicken and beef',
    hasSize: true,
    sizeType: 'pizza'
  },
  { 
    id: 6, 
    name: 'Pizza Sauce Tomate', 
    category: 'Pizza', 
    basePrice: 1100, 
    rating: 4.5, 
    time: '18 min', 
    image: 'https://i.pinimg.com/736x/38/92/13/38921351a3d0956e026eef63a7fa5300.jpg', 
    ingredients: 'Tomato sauce, Cheese, Basil',
    description: 'Classic tomato sauce pizza',
    hasSize: true,
    sizeType: 'pizza'
  },

  // ===== BURGER =====
  { 
    id: 7, 
    name: 'Cheeseburger', 
    category: 'Burger', 
    basePrice: 850, 
    rating: 4.9, 
    time: '15 min', 
    image: 'https://i.pinimg.com/736x/6e/38/42/6e38426bc608f20e182b60b80aca0e40.jpg', 
    ingredients: 'Beef, Cheese, Lettuce, Tomato, Sauce',
    description: 'Classic cheeseburger with fresh ingredients',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 8, 
    name: 'Double Burger', 
    category: 'Burger', 
    basePrice: 1050, 
    rating: 4.8, 
    time: '18 min', 
    image: 'https://i.pinimg.com/736x/35/d0/6c/35d06c6c350f94b6aad308580601d1b7.jpg', 
    ingredients: 'Double Beef, Double Cheese, Bacon, Sauce',
    description: 'Double beef burger with bacon',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 10, 
    name: 'Chicken Burger', 
    category: 'Burger', 
    basePrice: 800, 
    rating: 4.8, 
    time: '14 min', 
    image: 'https://i.pinimg.com/736x/e2/29/ef/e229efd0283d5f4d8df255d10fc9833f.jpg', 
    ingredients: 'Chicken, Cheese, Lettuce, Sauce',
    description: 'Grilled chicken burger',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 12, 
    name: 'Spicy Burger', 
    category: 'Burger', 
    basePrice: 880, 
    rating: 4.6, 
    time: '15 min', 
    image: 'https://i.pinimg.com/736x/48/09/1a/48091a58c2f8b44f7e212888cb1be9a6.jpg', 
    ingredients: 'Beef, Spicy Sauce, Cheese, Jalapenos',
    description: 'Spicy burger with jalapenos',
    hasSize: false,
    sizeType: null
  },

  // ===== TACOS =====
  { 
    id: 13, 
    name: 'Chicken Tacos', 
    category: 'Tacos', 
    basePrice: 750, 
    rating: 4.7, 
    time: '12 min', 
    image: 'https://i.pinimg.com/1200x/f2/36/40/f23640d4541910d488eb282c28271289.jpg', 
    ingredients: 'Chicken, Cheese, Sauce, Vegetables',
    description: 'Chicken tacos with cheese and vegetables',
    hasSize: true,
    sizeType: 'tacos'
  },
  { 
    id: 14, 
    name: 'Meat Tacos', 
    category: 'Tacos', 
    basePrice: 800, 
    rating: 4.6, 
    time: '12 min', 
    image: 'https://i.pinimg.com/736x/c7/01/d7/c701d70348da8330d373cbe3fb116e8c.jpg', 
    ingredients: 'Beef, Cheese, Sauce, Vegetables',
    description: 'Beef tacos with cheese',
    hasSize: true,
    sizeType: 'tacos'
  },
  { 
    id: 15, 
    name: 'Mixed Tacos', 
    category: 'Tacos', 
    basePrice: 850, 
    rating: 4.8, 
    time: '14 min', 
    image: 'https://i.pinimg.com/1200x/15/72/0b/15720bff0163795535e07da34f14b306.jpg', 
    ingredients: 'Chicken, Beef, Cheese, Sauce',
    description: 'Mixed tacos with chicken and beef',
    hasSize: true,
    sizeType: 'tacos'
  },

  // ===== SANDWICH =====
  { 
    id: 17, 
    name: 'Special Sandwich', 
    category: 'Sandwich', 
    basePrice: 650, 
    rating: 4.8, 
    time: '10 min', 
    image: 'https://i.pinimg.com/736x/d9/07/e5/d907e5639e3c501cf4ed36ea5b2ee4a5.jpg', 
    ingredients: 'Chicken, Cheese, Vegetables, Special Sauce',
    description: 'Special sandwich with secret sauce',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 18, 
    name: 'Chicken Sandwich', 
    category: 'Sandwich', 
    basePrice: 550, 
    rating: 4.5, 
    time: '8 min', 
    image: 'https://i.pinimg.com/1200x/09/b9/5a/09b95aad25dc547aa00f46a73dce2a2a.jpg', 
    ingredients: 'Chicken, Lettuce, Tomato, Sauce',
    description: 'Grilled chicken sandwich',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 19, 
    name: 'Meat Sandwich', 
    category: 'Sandwich', 
    basePrice: 600, 
    rating: 4.6, 
    time: '8 min', 
    image: 'https://i.pinimg.com/736x/e5/2a/b7/e52ab76920ec408724494fba9d8b5796.jpg', 
    ingredients: 'Beef, Cheese, Vegetables, Sauce',
    description: 'Beef sandwich with cheese',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 20, 
    name: 'Liver Sandwich (Kabda)', 
    category: 'Sandwich', 
    basePrice: 500, 
    rating: 4.4, 
    time: '7 min', 
    image: 'https://i.pinimg.com/1200x/b3/63/ac/b363ac1316c92d2265a40b998d2d23e1.jpg', 
    ingredients: 'Liver, Onions, Spices, Bread',
    description: 'Traditional liver sandwich',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 21, 
    name: 'Escalope Sandwich', 
    category: 'Sandwich', 
    basePrice: 600, 
    rating: 4.7, 
    time: '9 min', 
    image: 'https://i.pinimg.com/1200x/17/1f/2b/171f2b69641e4ccad574e870334ef089.jpg', 
    ingredients: 'Escalope, Cheese, Vegetables, Sauce',
    description: 'Crispy escalope sandwich',
    hasSize: false,
    sizeType: null
  },

  // ===== PASTA =====
  { 
    id: 22, 
    name: 'Alfredo Pasta', 
    category: 'Pasta', 
    basePrice: 950, 
    rating: 4.8, 
    time: '18 min', 
    image: 'https://i.pinimg.com/736x/26/13/9c/26139cc85f59683e8e953eb161215f2c.jpg', 
    ingredients: 'Pasta, Cream, Parmesan, Chicken',
    description: 'Creamy Alfredo pasta with chicken',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 23, 
    name: 'Carbonara Pasta', 
    category: 'Pasta', 
    basePrice: 900, 
    rating: 4.7, 
    time: '16 min', 
    image: 'https://i.pinimg.com/736x/d5/13/84/d513842a5df920975b0354d8d2df06ea.jpg', 
    ingredients: 'Pasta, Eggs, Bacon, Parmesan',
    description: 'Classic Carbonara pasta',
    hasSize: false,
    sizeType: null
  },

  // ===== MEALS =====
  { 
    id: 24, 
    name: 'Grilled Chicken', 
    category: 'Meals', 
    basePrice: 1100, 
    rating: 4.7, 
    time: '25 min', 
    image: 'https://i.pinimg.com/1200x/eb/9c/1c/eb9c1cbef13d58b00d2a381d5275b1e7.jpg', 
    ingredients: 'Chicken, Spices, Vegetables, Rice',
    description: 'Grilled chicken with rice and vegetables',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 25, 
    name: 'Steak with Fries', 
    category: 'Meals', 
    basePrice: 1300, 
    rating: 4.9, 
    time: '25 min', 
    image: 'https://i.pinimg.com/736x/c5/2c/c9/c52cc992b7bf4d163e110d883f44ed9a.jpg', 
    ingredients: 'Beef Steak, Fries, Sauce, Salad',
    description: 'Grilled steak with fries',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 26, 
    name: 'Mixed Grill', 
    category: 'Meals', 
    basePrice: 1500, 
    rating: 4.9, 
    time: '30 min', 
    image: 'https://i.pinimg.com/1200x/8c/0d/fe/8c0dfe3dec51ff40e79856284a496e5b.jpg', 
    ingredients: 'Chicken, Beef, Sausages, Fries',
    description: 'Mixed grill platter',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 27, 
    name: 'Cordon Bleu', 
    category: 'Meals', 
    basePrice: 1200, 
    rating: 4.8, 
    time: '22 min', 
    image: 'https://i.pinimg.com/736x/77/bc/f1/77bcf17e8a0b5a8f2092a3bcce2b531d.jpg', 
    ingredients: 'Chicken, Cheese, Ham, Fries',
    description: 'Cordon bleu with cheese and ham',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 28, 
    name: 'Escalope Plate', 
    category: 'Meals', 
    basePrice: 1150, 
    rating: 4.6, 
    time: '20 min', 
    image: 'https://i.pinimg.com/1200x/17/1f/2b/171f2b69641e4ccad574e870334ef089.jpg', 
    ingredients: 'Escalope, Fries, Salad, Sauce',
    description: 'Crispy escalope with fries',
    hasSize: false,
    sizeType: null
  },

  // ===== SALADS =====
  { 
    id: 29, 
    name: 'Caesar Salad', 
    category: 'Salads', 
    basePrice: 550, 
    rating: 4.5, 
    time: '8 min', 
    image: 'https://i.pinimg.com/1200x/4d/0a/fe/4d0afe34ee56ef842647730b7497ad97.jpg', 
    ingredients: 'Lettuce, Chicken, Parmesan, Croutons',
    description: 'Classic Caesar salad',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 30, 
    name: 'Green Salad', 
    category: 'Salads', 
    basePrice: 400, 
    rating: 4.3, 
    time: '5 min', 
    image: 'https://i.pinimg.com/736x/af/0c/d8/af0cd8296b7538581beca458c372b3a3.jpg', 
    ingredients: 'Lettuce, Cucumber, Tomato, Olive Oil',
    description: 'Fresh green salad',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 31, 
    name: 'Mixed Salad', 
    category: 'Salads', 
    basePrice: 480, 
    rating: 4.4, 
    time: '6 min', 
    image: 'https://i.pinimg.com/1200x/0b/a3/cd/0ba3cdacf7b76aea1bc2843a0e678d58.jpg', 
    ingredients: 'Lettuce, Tomato, Onions, Olives',
    description: 'Mixed salad with vegetables',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 32, 
    name: 'Tuna Salad', 
    category: 'Salads', 
    basePrice: 600, 
    rating: 4.6, 
    time: '7 min', 
    image: 'https://i.pinimg.com/736x/23/af/b0/23afb0c47a670b9d417808d28650c399.jpg', 
    ingredients: 'Tuna, Lettuce, Tomato, Olives',
    description: 'Tuna salad with vegetables',
    hasSize: false,
    sizeType: null
  },

  // ===== DRINKS =====
  { 
    id: 33, 
    name: 'Coca Cola', 
    category: 'Drinks', 
    basePrice: 200, 
    rating: 4.3, 
    time: '2 min', 
    image: 'https://i.pinimg.com/1200x/ae/2d/65/ae2d65d73a98f127fdc0b320b2482c8b.jpg', 
    ingredients: 'Cola, Ice',
    description: 'Classic Coca Cola',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 34, 
    name: 'Fanta', 
    category: 'Drinks', 
    basePrice: 200, 
    rating: 4.2, 
    time: '2 min', 
    image: 'https://i.pinimg.com/736x/e4/30/13/e43013180276de763ce278767f37766c.jpg', 
    ingredients: 'Orange, Ice',
    description: 'Fanta orange',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 35, 
    name: 'Sprite', 
    category: 'Drinks', 
    basePrice: 200, 
    rating: 4.1, 
    time: '2 min', 
    image: 'https://i.pinimg.com/736x/42/1c/77/421c77ff2d8b6120d8ed66318adce6a9.jpg', 
    ingredients: 'Lemon, Ice',
    description: 'Sprite lemon',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 36, 
    name: 'Hamoud', 
    category: 'Drinks', 
    basePrice: 200, 
    rating: 4.0, 
    time: '2 min', 
    image: 'https://i.pinimg.com/736x/cd/5c/17/cd5c1715768528cfd89b79c03d903ca5.jpg', 
    ingredients: 'Lemon, Ice',
    description: 'Hamoud lemon soda',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 37, 
    name: 'Water', 
    category: 'Drinks', 
    basePrice: 100, 
    rating: 4.5, 
    time: '1 min', 
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=200&fit=crop',
    ingredients: 'Mineral Water',
    description: 'Mineral water',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 38, 
    name: 'Orange Juice', 
    category: 'Drinks', 
    basePrice: 250, 
    rating: 4.6, 
    time: '3 min', 
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop', 
    ingredients: 'Fresh Orange Juice',
    description: 'Fresh orange juice',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 40, 
    name: 'Milkshake', 
    category: 'Drinks', 
    basePrice: 350, 
    rating: 4.8, 
    time: '5 min', 
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=200&fit=crop', 
    ingredients: 'Milk, Ice Cream, Syrup',
    description: 'Milkshake with ice cream',
    hasSize: false,
    sizeType: null
  },

  // ===== DESSERTS =====
  { 
    id: 41, 
    name: 'Tiramisu', 
    category: 'Desserts', 
    basePrice: 450, 
    rating: 4.9, 
    time: '5 min', 
    image: 'https://i.pinimg.com/736x/24/67/4f/24674f0c57a8812cd33cb6cb7758cd98.jpg', 
    ingredients: 'Coffee, Mascarpone, Cocoa, Ladyfingers',
    description: 'Classic tiramisu',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 42, 
    name: 'Cheesecake', 
    category: 'Desserts', 
    basePrice: 500, 
    rating: 4.8, 
    time: '5 min', 
    image: 'https://i.pinimg.com/736x/dc/4a/d2/dc4ad2c665b89e56cdecdc66015eb03e.jpg', 
    ingredients: 'Cream Cheese, Biscuits, Strawberries',
    description: 'Cheesecake with strawberries',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 43, 
    name: 'Brownie', 
    category: 'Desserts', 
    basePrice: 400, 
    rating: 4.7, 
    time: '4 min', 
    image: 'https://i.pinimg.com/736x/56/d5/2f/56d52f3421788b8ffac106821b2340cb.jpg', 
    ingredients: 'Chocolate, Nuts, Cream',
    description: 'Chocolate brownie',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 44, 
    name: 'Chocolate Fondant', 
    category: 'Desserts', 
    basePrice: 480, 
    rating: 4.9, 
    time: '6 min', 
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop', 
    ingredients: 'Chocolate, Butter, Eggs, Sugar',
    description: 'Warm chocolate fondant',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 45, 
    name: 'Crepe Nutella', 
    category: 'Desserts', 
    basePrice: 350, 
    rating: 4.7, 
    time: '4 min', 
    image: 'https://i.pinimg.com/736x/80/9b/6f/809b6ffcc3afe2a97202ef3fe57da94b.jpg', 
    ingredients: 'Crepe, Nutella, Banana',
    description: 'Crepe with Nutella and banana',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 46, 
    name: 'Waffle', 
    category: 'Desserts', 
    basePrice: 380, 
    rating: 4.6, 
    time: '5 min', 
    image: 'https://i.pinimg.com/736x/d5/38/e5/d538e545e95c7e2be4436c02e2ae2180.jpg', 
    ingredients: 'Waffle, Cream, Strawberries',
    description: 'Waffle with cream',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 47, 
    name: 'Ice Cream', 
    category: 'Desserts', 
    basePrice: 300, 
    rating: 4.5, 
    time: '2 min', 
    image: 'https://i.pinimg.com/736x/1e/41/56/1e4156bd74e9aefdd0ce71afb1467db8.jpg', 
    ingredients: 'Vanilla, Chocolate, Strawberry',
    description: 'Ice cream 3 flavors',
    hasSize: false,
    sizeType: null
  },
  { 
    id: 48, 
    name: 'Fruit Salad', 
    category: 'Desserts', 
    basePrice: 350, 
    rating: 4.4, 
    time: '3 min', 
    image: 'https://i.pinimg.com/736x/39/f1/10/39f11081af5aa208137fd43d93dfb456.jpg', 
    ingredients: 'Apple, Banana, Orange, Strawberries',
    description: 'Fresh fruit salad',
    hasSize: false,
    sizeType: null
  },
];

// Fonction pour calculer le prix selon la taille
export const getPriceWithSize = (product, sizeId) => {
  if (!product.hasSize) return product.basePrice || product.price;
  
  const sizeMap = {
    pizza: sizes.pizza,
    tacos: sizes.tacos
  };
  
  const availableSizes = sizeMap[product.sizeType] || [];
  const size = availableSizes.find(s => s.id === sizeId) || availableSizes[0];
  
  return Math.round(product.basePrice * size.priceMultiplier);
};

// Fonction pour obtenir les tailles disponibles pour un produit
export const getAvailableSizes = (product) => {
  if (!product.hasSize) return [];
  
  const sizeMap = {
    pizza: sizes.pizza,
    tacos: sizes.tacos
  };
  
  return sizeMap[product.sizeType] || [];
};