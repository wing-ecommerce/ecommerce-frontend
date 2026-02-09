'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product } from '@/types/product';
import { productService } from '@/services/product.service';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch product by slug
        const foundProduct = await productService.getProductBySlug(slug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image || '');
          
          // Set default size if available
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          
          // Fetch similar products from same category
          const similar = await productService.getAllProductsByCategory(
            foundProduct.categoryId
          );
          
          // Filter out current product and limit to 4
          const filteredSimilar = similar
            .filter((p: Product) => p.slug !== foundProduct.slug)
            .slice(0, 4);
          
          setSimilarProducts(filteredSimilar);
        }
        
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  // Get the photos to display as thumbnails
  const getThumbnailPhotos = () => {
    if (!product) return [];
    
    // If additionalPhotos exists and has items, use them
    if (product.additionalPhotos && product.additionalPhotos.length > 0) {
      return product.additionalPhotos;
    }
    
    // Otherwise, return only the main image if it exists
    return product.image ? [product.image] : [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products" className="text-green-600 hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const thumbnailPhotos = getThumbnailPhotos();
  const inStock = product.inStock ?? (product.stock > 0);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="order-2 lg:order-1 space-y-4">
            {/* Main Image */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm max-w-md mx-auto">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full object-cover aspect-[3/4]"
                />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {thumbnailPhotos.length > 0 && (
              <div className={`grid gap-2 max-w-md mx-auto ${
                thumbnailPhotos.length === 1 ? 'grid-cols-1' : 'grid-cols-4'
              }`}>
                {thumbnailPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(photo)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === photo
                        ? 'border-green-500'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="order-1 lg:order-2 space-y-7">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">Home</Link> / 
              <Link href="/products" className="hover:text-gray-700"> Products</Link> / 
              <span className="text-gray-900 font-medium"> {product.name}</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl lg:text-4xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-2xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount != null && product.discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Category */}
            {product.categoryName && (
              <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                {product.categoryName} COLLECTION
              </p>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Stock:</span>
              <span className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                {inStock ? `${product.stock} available` : 'Out of Stock'}
              </span>
            </div>

            {!inStock && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-semibold">Out of Stock</p>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-800">Size</span>
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-lg border-2 text-sm font-medium transition ${
                        selectedSize === size
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div>
              <button 
                disabled={!inStock}
                className={`w-full py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  inStock
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Product Info Sections */}
            <div className="space-y-6 pt-6 border-t border-gray-200 text-gray-700">
              {product.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Product Details</h3>
                  <p className="text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Material & Care</h3>
                <p className="text-sm">100% Cotton</p>
                <p className="text-sm">Machine-wash cold</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Sold by</h3>
                <p className="text-sm font-medium">Fashion Store</p>
                <ul className="text-sm mt-2 space-y-1 text-gray-600">
                  <li>• 90% Positive Feedback</li>
                  <li>• Fast & Reliable Delivery</li>
                  <li>• 3 Months Warranty on All Products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {similarProducts.map((item) => (
                <Link href={`/products/${item.slug}`} key={item.id} className="group">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.name}</p>
                      <p className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}