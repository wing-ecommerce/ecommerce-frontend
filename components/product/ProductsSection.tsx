import ProductGrid from './ProductGrid';
import { Product } from '@/types/product';

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
  activeCategory: string;
  onAddToCart?: (slug: string) => void;
}

export default function ProductsSection({ 
  products, 
  loading, 
  activeCategory, 
  onAddToCart 
}: ProductsSectionProps) {
  return (
    <section className="pt-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-gray-700 font-bold">
            {activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
          </h2>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading} 
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
}