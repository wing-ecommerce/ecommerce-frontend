'use client';
import { useState, useEffect } from 'react';
import CategoryFilter from '../../../components/product/CategoryFilter';
import ProductsSection from '../../../components/product/ProductsSection';
import { Product } from '@/types/product';

const CATEGORIES = ['All', 'Skirt', 'T-Shirt', 'Jeans', 'Dress'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch products from API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Handle add to cart
  const handleAddToCart = (slug: string) => {
    console.log('Add to cart:', slug);
    // Add your cart logic here
  };

  return (
    <>
      <CategoryFilter 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryFilter}
      />
      
      <ProductsSection 
        products={filteredProducts}
        loading={loading}
        activeCategory={activeCategory}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}