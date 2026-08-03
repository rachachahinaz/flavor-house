export const reviews = [
  {
    id: 1,
    productId: 1, // Pizza Blanche
    user: 'Ahmed K.',
    avatar: '👨',
    rating: 5,
    comment: 'La meilleure pizza blanche que j\'ai jamais goûtée !',
    date: '2024-12-15'
  },
  {
    id: 2,
    productId: 1, // Pizza Blanche
    user: 'Sofia M.',
    avatar: '👩',
    rating: 4,
    comment: 'Très bonne pizza, livraison rapide !',
    date: '2024-12-14'
  },
  {
    id: 3,
    productId: 7, // Cheeseburger
    user: 'Karim B.',
    avatar: '👨',
    rating: 5,
    comment: 'Le meilleur cheeseburger en Algérie !',
    date: '2024-12-13'
  },
  {
    id: 4,
    productId: 7, // Cheeseburger
    user: 'Leila R.',
    avatar: '👩',
    rating: 4,
    comment: 'Très bon burger, viande fraîche et sauce délicieuse.',
    date: '2024-12-12'
  },
  {
    id: 5,
    productId: 13, // Chicken Tacos
    user: 'Youssef H.',
    avatar: '👨',
    rating: 5,
    comment: 'Les tacos poulet sont incroyables !',
    date: '2024-12-11'
  },
  {
    id: 6,
    productId: 22, // Alfredo Pasta
    user: 'Nadia Z.',
    avatar: '👩',
    rating: 5,
    comment: 'Pasta Alfredo parfaite, crémeuse et délicieuse.',
    date: '2024-12-10'
  },
  {
    id: 7,
    productId: 41, // Tiramisu
    user: 'Samir L.',
    avatar: '👨',
    rating: 5,
    comment: 'Le tiramisu est à tomber par terre !',
    date: '2024-12-09'
  },
  {
    id: 8,
    productId: 24, // Grilled Chicken
    user: 'Houda F.',
    avatar: '👩',
    rating: 4,
    comment: 'Poulet grillé bien assaisonné, bon rapport qualité-prix.',
    date: '2024-12-08'
  }
];

// Fonction pour obtenir les avis d'un produit
export const getReviewsByProductId = (productId) => {
  return reviews.filter(review => review.productId === productId);
};

// Fonction pour obtenir la note moyenne d'un produit
export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return total / productReviews.length;
};
