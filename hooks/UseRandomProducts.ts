import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export function useRandomProducts(count: number = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Get random products from the API
        const shuffled = [...data.products].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, count);
        
        setProducts(randomProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [count]);

  return { products, loading, error };
}