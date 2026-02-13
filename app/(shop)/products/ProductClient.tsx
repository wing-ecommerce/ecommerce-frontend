'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryFilter from '../../../components/product/CategoryFilter';
import ProductsSection from '../../../components/product/ProductsSection';
import { Product, Category } from '@/types/product';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Get category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch categories and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const fetchedCategories = await categoryService.getAllCategories();
        setCategories(fetchedCategories);
        
        // Check if there's a category in URL
        const categoryParam = searchParams.get('category');
        
        if (categoryParam && categoryParam !== 'All') {
          // Find category by name
          const selectedCategory = fetchedCategories.find(
            c => c.name === categoryParam || c.slug === categoryParam
          );
          
          if (selectedCategory) {
            // Fetch products for this category
            const categoryProducts = await productService.getAllProductsByCategory(
              selectedCategory.id
            );
            setProducts(categoryProducts);
            setFilteredProducts(categoryProducts);
            setActiveCategory(selectedCategory.name);
          } else {
            // Category not found, fetch all
            const fetchedProducts = await productService.getAllProducts();
            setProducts(fetchedProducts);
            setFilteredProducts(fetchedProducts);
            setActiveCategory('All');
            // Update URL to reflect 'All'
            router.push('/products');
          }
        } else {
          // Fetch all products
          const fetchedProducts = await productService.getAllProducts();
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
          setActiveCategory('All');
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, router]);

  // Filter products by category and update URL
  const handleCategoryFilter = async (category: string) => {
    setActiveCategory(category);
    
    try {
      if (category === 'All') {
        // Update URL to remove category param
        router.push('/products');
        
        // If we already have all products, just use them
        if (products.length > 0) {
          setFilteredProducts(products);
        } else {
          const fetchedProducts = await productService.getAllProducts();
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
        }
      } else {
        // Find category by name
        const selectedCategory = categories.find(c => c.name === category);
        
        if (selectedCategory) {
          // Update URL with category parameter (using slug for cleaner URLs)
          router.push(`/products?category=${encodeURIComponent(selectedCategory.slug)}`);
          
          // Fetch products for this category
          setLoading(true);
          const categoryProducts = await productService.getAllProductsByCategory(
            selectedCategory.id
          );
          setFilteredProducts(categoryProducts);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      setLoading(false);
    }
  };

  // Handle add to cart
  const handleAddToCart = (slug: string) => {
    console.log('Add to cart:', slug);
    // Add your cart logic here
  };

  // Build category list with "All" option
  const categoryNames = ['All', ...categories.map(c => c.name)];

  return (
    <>
      <CategoryFilter 
        categories={categoryNames}
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