import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (slug: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const inStock = product.inStock ?? (product.stock > 0);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group block"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
        
        {/* Only show discount badge if discount exists and > 0 */}
        {product.discount != null && product.discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </span>
        )}
        
        {/* Only show out of stock badge if actually out of stock */}
        {!inStock && (
          <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {product.categoryName && (
          <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
            {product.categoryName}
          </span>
        )}
        
        <h3 className="text-lg font-bold mt-2 mb-4 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div
          className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition bg-green-500 text-white hover:bg-green-600"
        >
          <Eye className="w-5 h-5" />
          <span>View Details</span>
        </div>
      </div>
    </Link>
  );
}