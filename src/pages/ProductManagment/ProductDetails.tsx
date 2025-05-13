import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '@/redux/features/auth/authApi';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '@/utils/ErrorMessage';
import LoadingSpinner from '@/utils/LoadingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // আপনার রিডাক্স স্টোরের টাইপ


// Define the Product type
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  description?: string;
  brand?: string;
  category?: string;
  stock: number;
  specifications?: string[];
  features?: string[];
}

interface ApiResponse {
  result: Product;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductQuery(id || '');
  const user = useSelector((state: RootState) => state.auth.user);


  // Access the product data directly from data (not data.result)
  const product = (data as unknown as ApiResponse)?.result;

  // const handleBuyNow = () => {
    // if (product) {
      // navigate('/checkout', { state: { product } });
    // }
  // };


  const handleBuyNow = () => {
  if (!user) {
    navigate('/login', { state: { from: `/product/${id}` } });
    return;
  }

  if (product) {
    navigate('/checkout', { state: { product } });
  }
};


  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load product details" />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= (product.rating || 0)
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.rating?.toFixed(1) || 'No'} ratings)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-800">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold dark:text-black mb-2">
                Description
              </h2>
              <p className="text-gray-700">
                {product.description || 'No description available.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Brand</h3>
                <p className="text-gray-800">{product.brand || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Category
                </h3>
                <p className="text-gray-800">{product.category || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  In Stock
                </h3>
                <p className="text-gray-800">
                  {product.stock > 0
                    ? `${product.stock} available`
                    : 'Out of stock'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">SKU</h3>
                <p className="text-gray-800">{product._id || 'N/A'}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className={`flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaShoppingCart className="mr-2" />
                Buy Now
              </button>
            </div>

            {product.stock <= 0 && (
              <p className="mt-3 text-red-500 text-sm">
                This product is currently out of stock
              </p>
            )}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl dark:text-black font-semibold mb-4">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Specifications</h3>
              <ul className="space-y-2">
                {product.specifications?.map((spec: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    • {spec}
                  </li>
                )) || (
                  <p className="text-gray-600">No specifications available</p>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Features</h3>
              <ul className="space-y-2">
                {product.features?.map((feature: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    • {feature}
                  </li>
                )) || <p className="text-gray-600">No features available</p>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
