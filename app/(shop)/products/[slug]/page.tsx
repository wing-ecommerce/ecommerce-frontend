'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product, ProductSize } from '@/types/product';
import { productService } from '@/services/product.service';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import SignInModal from '@/components/ui/SignInModal';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, isSignInModalOpen, openSignInModal, closeSignInModal, isLoading: cartLoading } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizeVariant, setSelectedSizeVariant] = useState<ProductSize | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        const foundProduct = await productService.getProductBySlug(slug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image || '');
          
          // Set default size variant (first available size with stock)
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            const availableSize = foundProduct.sizes.find(s => s.stock > 0) || foundProduct.sizes[0];
            setSelectedSizeVariant(availableSize);
          }
          
          // Fetch similar products
          const similar = await productService.getAllProductsByCategory(foundProduct.categoryId);
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

  const handleSizeSelect = (sizeVariant: ProductSize) => {
    setSelectedSizeVariant(sizeVariant);
  };

  const handleAddToCart = async () => {
    if (!product || !selectedSizeVariant) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    // Check if selected size is in stock
    if (selectedSizeVariant.stock <= 0) {
      alert(`Size ${selectedSizeVariant.size} is out of stock.`);
      return;
    }

    setAddingToCart(true);

    try {
      await addToCart(product.id, selectedSizeVariant.id, 1);
    } catch (error) {
      // Error handled in CartContext
    } finally {
      setAddingToCart(false);
    }
  };

  const getThumbnailPhotos = () => {
    if (!product) return [];
    
    if (product.additionalPhotos && product.additionalPhotos.length > 0) {
      return product.additionalPhotos;
    }
    
    return product.image ? [product.image] : [];
  };

  if (loading || authLoading) {
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
  const inStock = product.stock > 0;
  const selectedSizeInStock = selectedSizeVariant && selectedSizeVariant.stock > 0;

  return (
    <>
      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="order-2 lg:order-1 space-y-4">
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
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">Home</Link> / 
              <Link href="/products" className="hover:text-gray-700"> Products</Link> / 
              <span className="text-gray-900 font-medium"> {product.name}</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl lg:text-4xl font-bold text-green-600">
                ${selectedSizeVariant ? selectedSizeVariant.effectivePrice.toFixed(2) : product.price.toFixed(2)}
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

            {product.categoryName && (
              <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                {product.categoryName} COLLECTION
              </p>
            )}

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Stock:</span>
              {selectedSizeVariant ? (
                <span className={`font-semibold ${selectedSizeInStock ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedSizeInStock ? `${selectedSizeVariant.stock} available for size ${selectedSizeVariant.size}` : `Size ${selectedSizeVariant.size} - Out of Stock`}
                </span>
              ) : (
                <span className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {inStock ? 'Available' : 'Out of Stock'}
                </span>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-800">
                    Size: {selectedSizeVariant?.size || 'Select a size'}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((sizeVariant) => {
                    const isOutOfStock = sizeVariant.stock <= 0;
                    const isSelected = selectedSizeVariant?.id === sizeVariant.id;
                    
                    return (
                      <button
                        key={sizeVariant.id}
                        onClick={() => handleSizeSelect(sizeVariant)}
                        disabled={isOutOfStock}
                        className={`py-2.5 rounded-lg border-2 text-sm font-medium transition relative ${
                          isSelected
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : isOutOfStock
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                        title={isOutOfStock ? 'Out of stock' : `${sizeVariant.stock} available`}
                      >
                        {sizeVariant.size}
                        {isOutOfStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs bg-white px-1">✕</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedSizeVariant && selectedSizeVariant.priceOverride && (
                  <p className="text-sm text-gray-600 mt-2">
                    Price for size {selectedSizeVariant.size}: ${selectedSizeVariant.priceOverride.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div>
              <button 
                onClick={handleAddToCart}
                disabled={!selectedSizeInStock || addingToCart || !selectedSizeVariant || cartLoading}
                className={`w-full py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  selectedSizeInStock && selectedSizeVariant && !cartLoading
                    ? addingToCart
                      ? 'bg-green-400 text-white cursor-wait'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartLoading || addingToCart
                  ? 'Adding...' 
                  : !selectedSizeVariant 
                  ? 'Select a size' 
                  : selectedSizeInStock 
                  ? 'Add to Cart' 
                  : 'Out of Stock'}
              </button>
            </div>

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
            </div>
          </div>
        </div>

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