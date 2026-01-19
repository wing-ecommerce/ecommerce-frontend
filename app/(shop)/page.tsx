'use client';
import HeroSection from "../../components/home/HeroSection";
import BestSellingSection from "../../components/home/BestSelling";
import CTASection from "../../components/home/CTASection";
import LoadingSection from "../../components/home/LoadingSection";
import { useRandomProducts } from "../../hooks/UseRandomProducts";

export default function HomePage() {
  const { products, loading } = useRandomProducts(4);

  // Handle add to cart
  const handleAddToCart = (slug: string) => {
    console.log('Add to cart:', slug);
    // Add your cart logic here
  };

  return (
    <>
      <HeroSection />
      {loading ? (
        <LoadingSection />
      ) : (
        <BestSellingSection 
          title="Best Selling Products"
          products={products}
          onAddToCart={handleAddToCart}
        />
      )}
      
      <CTASection />
    </>
  );
}