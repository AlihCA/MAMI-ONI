import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name:'Blue Flowy Sleepwear',
    price: 120,
    image: 'src/assets/CLOTHES/p1.jpg',
    category: 'casual',
    rating: 4.5,
    reviews: 145,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    description: 'A comfortable and stylish t-shirt with unique tape details.'
  },
  {
    id: '2',
    name: 'Black Off-Shoulder',
    price: 240,
    originalPrice: 260,
    image: 'src/assets/CLOTHES/p2.jpg',
    category: 'casual',
    rating: 3.5,
    reviews: 89,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Grey'],
    description: 'Sexy Black Clothing'
  },
  {
    id: '3',
    name: 'Jorts',
    price: 180,
    image: 'src/assets/CLOTHES/p3.jpg',
    category: 'formal',
    rating: 4.5,
    reviews: 203,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Green'],
    description: 'Trendy Streetwear Short'
  },
  {
    id: '4',
    name: 'Conservative Tube Top',
    price: 130,
    originalPrice: 160,
    image: 'src/assets/CLOTHES/p4.jpg',
    category: 'casual',
    rating: 4.5,
    reviews: 167,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    description: 'A mix of respect and sexy'
  },
  {
    id: '5',
    name: 'Long Sleeve Off-Shoulder',
    price: 212,
    originalPrice: 232,
    image: 'src/assets/CLOTHES/p6.jpg',
    category: 'formal',
    rating: 5.0,
    reviews: 234,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Pink'],
    description: 'Nilalamig na sexy style.'
  },
  {
    id: '6',
    name: 'Square-neck Dress',
    price: 145,
    image: 'src/assets/CLOTHES/p7.jpg',
    category: 'casual',
    rating: 4.0,
    reviews: 98,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    description: 'Coquette Fairy Style'
  },
  {
    id: '7',
    name: 'Stripped Vest',
    price: 80,
    image: 'src/assets/CLOTHES/p8.jpg',
    category: 'casual',
    rating: 3.0,
    reviews: 67,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Black'],
    description: 'Comfortable loose fit vest perfect for summer.'
  },
  {
    id: '8',
    name: '22 Jersey',
    price: 210,
    image: 'src/assets/CLOTHES/p9.jpg',
    category: 'casual',
    rating: 4.5,
    reviews: 156,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    description: 'Sporty Street Wear'
  }
];

export const categories = [
  { id: 'all', name: 'All', count: products.length },
  { id: 'casual', name: 'Casual', count: products.filter(p => p.category === 'casual').length },
  { id: 'formal', name: 'Formal', count: products.filter(p => p.category === 'formal').length },
];