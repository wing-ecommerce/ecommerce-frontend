import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CheckoutHeader = () => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Continue Shopping</span>
          </button>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              {/* Step 1: Cart */}
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                Cart
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              
              {/* Step 2: Checkout */}
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                Checkout
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              
              {/* Step 3: Payment */}
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs font-bold">3</span>
                </div>
                Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;