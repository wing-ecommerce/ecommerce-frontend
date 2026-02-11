import { MapPin, Edit, Phone, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Address {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onAddNewClick: () => void;
}

const AddressSelector = ({ 
  addresses, 
  selectedAddress, 
  onSelectAddress,
  onAddNewClick 
}: AddressSelectorProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
              <p className="text-sm text-gray-500">Where should we deliver your order?</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/account/address')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
          >
            <Edit className="w-4 h-4" />
            Manage
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {addresses.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-600 mb-6 text-sm">Add a delivery address to continue</p>
            <button
              onClick={onAddNewClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Address List */}
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => onSelectAddress(address)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAddress?.id === address.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button */}
                    <div className="pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAddress?.id === address.id
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAddress?.id === address.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                      <p className="text-sm text-gray-600 mb-2">{address.city}, Cambodia</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {address.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Button */}
            <button
              onClick={onAddNewClick}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 rounded-lg transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSelector;