import { Product } from '@/contexts/CartContext';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Silk Blouse',
    price: 129.99,
    image: '/api/placeholder/400/500',
    category: 'women',
    description: 'A luxurious silk blouse perfect for both office and evening wear. Made from 100% mulberry silk with a flowing silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Navy', 'Blush'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Tailored Wool Coat',
    price: 299.99,
    image: '/api/placeholder/400/500',
    category: 'women',
    description: 'Classic wool coat with modern tailoring. Features a belted waist and premium wool blend for warmth and style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Cotton Dress',
    price: 89.99,
    image: '/api/placeholder/400/500',
    category: 'women',
    description: 'Comfortable yet elegant cotton dress with a flattering A-line silhouette. Perfect for casual outings or weekend brunches.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Sage'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Designer Leather Handbag',
    price: 199.99,
    image: '/api/placeholder/400/500',
    category: 'accessories',
    description: 'Handcrafted leather handbag with gold-tone hardware. Features multiple compartments and adjustable strap.',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Burgundy'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Classic Trench Coat',
    price: 259.99,
    image: '/api/placeholder/400/500',
    category: 'men',
    description: 'Timeless trench coat crafted from water-resistant gabardine. Double-breasted design with belt and storm flap.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki', 'Navy', 'Black'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Merino Wool Sweater',
    price: 149.99,
    image: '/api/placeholder/400/500',
    category: 'men',
    description: 'Luxurious merino wool crew neck sweater. Soft, breathable, and naturally odor-resistant.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Grey', 'Navy', 'Burgundy'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Italian Leather Shoes',
    price: 349.99,
    image: '/api/placeholder/400/500',
    category: 'men',
    description: 'Handcrafted Italian leather oxfords with leather sole. Perfect for formal occasions and business wear.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Gold Chain Necklace',
    price: 79.99,
    image: '/api/placeholder/400/500',
    category: 'accessories',
    description: 'Delicate gold-plated chain necklace. Adjustable length with secure clasp closure.',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return sampleProducts.slice(2, 6);
};