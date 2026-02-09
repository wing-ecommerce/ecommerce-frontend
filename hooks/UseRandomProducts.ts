import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/product.service';

/**
 * Hook to fetch random products from the backend
 * @param count - Number of random products to fetch (default: 4)
 * @returns { products, loading, error }
 */
export function useRandomProducts(count: number = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all products from backend
        const allProducts = await productService.getAllProducts();

        // Shuffle and pick random products
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
        const randomProducts = shuffled.slice(0, count);

        setProducts(randomProducts);
      } catch (err) {
        console.error('Error fetching random products:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [count]);

  return { products, loading, error };
}