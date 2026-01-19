export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
  colors: string[];
  sizes: string[];
}