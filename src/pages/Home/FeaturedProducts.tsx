// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';
// import { useGetProductsQuery } from '@/redux/features/auth/authApi';
// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useAuth } from '@/redux/useAuth';
// import { Product } from '../ProductManagment/productTypes';

// const FeaturedProducts = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { data, error, isLoading } = useGetProductsQuery({ limit: 8 });

//   const products = (data?.result || []) as Product[];

//   useEffect(() => {
//     AOS.init({
//       duration: 2000,
//       easing: 'ease-in-out',
//       once: true,
//     });
//   }, []);

//   const handleViewAll = () => {
//     navigate('/allbooks');
//   };

//   const handleViewDetails = (productId: string) => {
//     if (isAuthenticated) {
//       navigate(`/products/${productId}`);
//     } else {
//       navigate('/login', {
//         state: {
//           from: `/products/${productId}`,
//           message: 'Please login to view product details',
//         },
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//         {[...Array(6)].map((_, index) => (
//           <div key={index} className="flex flex-col space-y-3">
//             <Skeleton className="h-60 w-full rounded-2xl" />
//             <Skeleton className="h-4 w-3/4 rounded-lg" />
//             <Skeleton className="h-4 w-1/2 rounded-lg" />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     console.error('Error fetching products:', error);
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-500 text-lg font-medium">
//           Error fetching products.
//         </p>
//         <p className="text-gray-500 mt-2">Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//       <div
//         className="text-center mb-12"
//         data-aos="flip-right"
//         data-aos-easing="ease-out-cubic"
//         data-aos-duration="1000"
//       >
//         <h2 className="text-4xl font-bold text-gray-900 mb-3  ">
//           <span className="text-gray-800 dark:text-white">
//             Featured Products
//           </span>
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
//           Discover our curated collection of premium products
//         </p>
//       </div>

//       {products.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="group relative"
//                 data-aos="flip-left"
//                 data-aos-easing="ease-out-cubic"
//                 data-aos-duration="1000"
//               >
//                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-gray-800 rounded-2xl opacity-25 group-hover:opacity-50 blur transition-all duration-300"></div>
//                 <Card className="p-0 pt-0 mt-0 pb-3 relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2">
//                   <div className="h-36 overflow-hidden relative m-0 p-0">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-105 p-0 m-0"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
//                     <span className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       Featured
//                     </span>
//                   </div>
//                   <CardHeader className="">
//                     <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
//                       {product.name}
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 font-medium">
//                       by {product.author}
//                     </p>
//                   </CardHeader>
//                   <CardContent className="mt-auto pt-0">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-lg font-bold text-gray-900">
//                           ${product.price}
//                         </p>
//                         <div className="flex items-center mt-1">
//                           {[...Array(5)].map((_, i) => (
//                             <svg
//                               key={i}
//                               className={`w-6 h-6 ${i < (product.rating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           ))}
//                           <span className="text-xs text-gray-500 ml-1">
//                             ({product.rating || 0})
//                           </span>
//                         </div>
//                       </div>
//                       <Button
//                         variant="outline"
//                         className="border border-gray-300 hover:bg-gray-800 hover:text-white  hover:border-gray-400 rounded-lg mt-6 ml-1 transition-colors duration-200"
//                         onClick={() =>
//                           product._id && handleViewDetails(product._id)
//                         }
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>

//           <div className="mt-16 text-center" data-aos="fade-up">
//             <Button
//               variant="outline"
//               onClick={handleViewAll}
//               className="inline-flex items-center px-10 py-3 border border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-lg"
//             >
//               View All
//             </Button>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-16">
//           <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//             <svg
//               className="w-12 h-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-xl font-medium text-gray-900 mb-2">
//             No featured products available
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             We're currently updating our collection. Please check back soon.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeaturedProducts;

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '@/redux/useAuth';
import { Product } from '../ProductManagment/productTypes';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ArrowRight, Eye, ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, error, isLoading } = useGetProductsQuery({ limit: 8 });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<string | null>(null);

  const products = (data?.result || []) as Product[];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true,
      mirror: false,
    });
  }, []);

  const handleViewAll = () => {
    navigate('/allbooks');
  };

  // const handleViewDetails = (productId: string) => {
  // if (isAuthenticated) {
  // navigate(`/products/${productId}`);
  // } else {
  // navigate('/login', {
  // state: {
  // from: `/products/${productId}`,
  // message: 'Please login to view product details',
  // },
  // });
  // }
  // };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: {
        message: !isAuthenticated
          ? 'You are viewing as guest. Please login to order.'
          : '',
      },
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleQuickView = (productId: string) => {
    setQuickView(quickView === productId ? null : productId);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 container mx-auto">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <Skeleton className="h-60 w-full rounded-xl" />
            <div className="space-y-2 px-2">
              <Skeleton className="h-5 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-16 rounded-lg" />
                <Skeleton className="h-9 w-24 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12" data-aos="fade-up">
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl inline-block max-w-md container mx-auto">
          <p className="text-red-500 dark:text-red-400 text-lg font-medium">
            Error loading products
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please refresh the page or try again later
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl container mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          Featured Products
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          Discover our handpicked collection of premium products
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative"
                data-aos="zoom-in-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product._id!)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-red-50 transition-colors duration-200"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${wishlist.includes(product._id!) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Quick View Button */}
                <button
                  onClick={() => handleQuickView(product._id!)}
                  className="absolute top-3 left-3 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-blue-50 transition-colors duration-200"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                </button>

                {/* Quick View Modal */}
                {quickView === product._id && (
                  <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center p-4 rounded-xl">
                    <div className="bg-white p-4 rounded-lg max-w-xs">
                      <h3 className="font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description || 'No description available'}
                      </p>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          product._id && handleViewDetails(product._id)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                )}

                <Card className="relative h-full flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 rounded-xl overflow-hidden">
                  {/* Product Image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
                    <Badge className="absolute bottom-3 left-3 bg-gray-600 hover:bg-gray-800">
                      Featured
                    </Badge>
                  </div>

                  {/* Product Content */}
                  <CardHeader className="px-4">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      by {product.author}
                    </p>
                  </CardHeader>

                  <CardContent className="px-4  mt-auto">
                    {/* Rating */}
                    <div className="flex items-center  gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-5 ${star <= (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({product.rating || 0})
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${product.price?.toFixed(2)}
                        </p>
                        {product.price && (
                          <p className="text-sm text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700"
                          onClick={() =>
                            product._id && handleViewDetails(product._id)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gray-700 hover:bg-gray-900"
                          onClick={() =>
                            product._id && handleViewDetails(product._id)
                          }
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="400">
            <Button
              onClick={handleViewAll}
              variant="outline"
              className="inline-flex items-center px-10 py-3 border border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl"
          data-aos="fade-up"
        >
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            New Arrivals Coming Soon
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We're refreshing our collection with exciting new products
          </p>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
