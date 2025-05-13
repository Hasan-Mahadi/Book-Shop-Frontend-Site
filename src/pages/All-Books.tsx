/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/redux/features/auth/authApi';
import { FaStar } from 'react-icons/fa';
// import { useAuth } from '@/redux/useAuth';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const AllBooks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  // State for pagination and filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); // Set default limit to 20
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [localRatings, setLocalRatings] = useState<Record<string, number>>({});
  const [updateProduct] = useUpdateProductMutation();

  // Get all products for filter options
  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  // Extract unique categories and authors for dropdowns
  // const uniqueCategories = [
  // ...new Set(allProducts.map((product: any) => product.category)),
  // ];
  const uniqueAuthors = [
    ...new Set(allProducts.map((product: any) => product.author)),
  ];

  // Main query with all filters
  const { data, isLoading, error, refetch } = useGetProductsQuery(
    {
      page,
      limit,
      searchTerm: searchTerm || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      category: category || undefined,
      author: author || undefined,
    },
    { pollingInterval: 10 },
  ); // Fetch new data every 5 seconds

  const products = data?.result || [];

  // Update local ratings when products change
  useEffect(() => {
    const newLocalRatings: Record<string, number> = {};
    products.forEach((product: any) => {
      if (product.rating) {
        newLocalRatings[product._id] = product.rating;
      }
    });
    setLocalRatings(newLocalRatings);
  }, [products]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, minPrice, maxPrice, category, author, limit]);

  // Rating handler with immediate UI update
  const handleRating = async (productId: string, newRating: number) => {
    try {
      // Update local state immediately
      setLocalRatings((prev) => ({
        ...prev,
        [productId]: newRating,
      }));

      // Send update to server
      await updateProduct({
        id: productId,
        data: { rating: newRating },
      }).unwrap();

      // Refetch data to ensure consistency
      refetch();
    } catch (error) {
      console.error('Failed to update rating:', error);
      // Revert on error
      setLocalRatings((prev) => ({
        ...prev,
        [productId]:
          products.find((p: any) => p._id === productId)?.rating || 0,
      }));
    }
  };

  // Search and filter handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setCategory('');
    setAuthor('');
    setPage(1);
    setLimit(20); // Reset to default limit of 20
  };

  // const handleViewDetails = (productId: string) => {
    // if (isAuthenticated) {
      // navigate(`/products/${productId}`);
    // } else {
      // navigate(`/products/${productId}`, {
        // state: {
          // from: `/products/${productId}`,
          // message: 'Please login to view product details',
        // },
      // });
    // }
  // };


  const handleViewDetails = (productId: string) => {
  navigate(`/products/${productId}`);
  };

  // Page size options
  const pageSizeOptions = [
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' },
    { value: 30, label: '30 per page' },
    { value: 40, label: '40 per page' },
    { value: 50, label: '50 per page' },
  ];

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error loading books!</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1
        className="text-3xl font-bold text-center   text-gray-800 dark:text-white pt-12 mb-6"
        data-aos="flip-right"
      >
        All Books
      </h1>

      {/* Search and Filter Section - Compact Layout */}
      <div className="bg-white dark:text-black p-4 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Search Input - Smaller Width */}
            <div className="flex-1 min-w-[150px]">
              <input
                type="text"
                placeholder="Title, author, category"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Price Range - Compact */}
            <div className="flex-1 min-w-[150px]">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter - Compact */}

            {/* Category Filter - Compact */}
            <div className="flex-1 min-w-[150px]">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as
                      | 'Fiction'
                      | 'Science'
                      | 'SelfDevelopment'
                      | 'Poetry'
                      | 'Religious',
                  )
                }
              >
                <option value="">All Categories</option>
                {[
                  'Fiction',
                  'Science',
                  'SelfDevelopment',
                  'Poetry',
                  'Religious',
                ]
                  .filter((cat) =>
                    [
                      'Fiction',
                      'Science',
                      'SelfDevelopment',
                      'Poetry',
                      'Religious',
                    ].includes(cat),
                  )
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Author Filter - Compact */}
            <div className="flex-1 min-w-[150px]">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="">All Authors</option>
                {uniqueAuthors.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
            </div>

            {/* Items per page - Compact */}
            <div className="flex-1 min-w-[120px]">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {pageSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-600 transition text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600 text-sm">
        Showing Books {products.length}
      </div>

      {/* Books Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No books found matching your criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="w-full h-40 flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-black dark:text-black">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 dark:text-black text-sm">
                    Author: {product.author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-800 font-medium">
                    Price: ${product.price}
                  </p>

                  <div className="mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(product._id, star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-xl focus:outline-none"
                        >
                          <FaStar
                            className={
                              star <=
                              (hoverRating || localRatings[product._id] || 0)
                                ? 'text-yellow-500'
                                : 'text-gray-400'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              {/* Page {totalPages} of {totalPages} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBooks;
