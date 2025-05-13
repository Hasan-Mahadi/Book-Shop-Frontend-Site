import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const TestimonialSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  // Generate testimonials from product ratings
  const generateTestimonials = () => {
    const ratedProducts = allProducts.filter(
      (product) => product.rating && product.rating > 0,
    );

    return ratedProducts.slice(0, 3).map((product, index) => ({
      id: product._id || index,
      name: product.author || `Customer ${index + 1}`,
      productName: product.name || 'Book', // Added product name
      role: 'User',
      rating: product.rating,
      comment: `"${product.name} is one of my favorite books this year!"`,
      avatar: product.image || `https://via.placeholder.com/150`,
    }));
  };

  // Calculate overall rating stats
  const calculateRatingStats = () => {
    const ratedProducts = allProducts.filter((product) => product.rating);
    const totalRatings = ratedProducts.length;

    if (totalRatings === 0) return null;

    const averageRating =
      ratedProducts.reduce((sum, product) => sum + product.rating, 0) /
      totalRatings;
    const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars

    ratedProducts.forEach((product) => {
      if (product.rating >= 1 && product.rating <= 5) {
        ratingDistribution[5 - Math.floor(product.rating)]++;
      }
    });

    return {
      average: averageRating.toFixed(1),
      total: totalRatings,
      distribution: ratingDistribution.map((count) =>
        Math.round((count / totalRatings) * 100),
      ),
    };
  };

  const testimonials = generateTestimonials();
  const ratingStats = calculateRatingStats();

  if (!ratingStats || testimonials.length === 0) {
    return null; // Don't render if no ratings available
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 container mx-auto">
      <div className="container  mx-auto px-6 lg:px-36">
        <div
          className="text-center mb-12"
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            What Our Readers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover why readers love our book selections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="flip-right"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {testimonial.productName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Added product name display */}
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Reviewed:{' '}
                  <span className="text-blue-600 dark:text-blue-400">
                    {testimonial.name}
                  </span>
                </p>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-gray-200 dark:text-gray-600 text-3xl absolute -top-2 -left-1" />
                <p className="text-gray-700 dark:text-gray-300 pl-8 italic">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Section */}
        <div
          className="mt-16 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left mb-6 md:mb-0 md:mr-10">
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                {ratingStats.average}
              </div>
              <div className="flex justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${i < Math.floor(Number(ratingStats.average)) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Based on {ratingStats.total} reviews
              </p>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars, index) => (
                <div key={stars} className="flex items-center mb-2">
                  <span className="w-10 text-gray-800 dark:text-white">
                    {stars} star
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 mx-2">
                    <div
                      className="bg-yellow-400 h-3 rounded-full"
                      style={{ width: `${ratingStats.distribution[index]}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-gray-600 dark:text-gray-300 text-sm">
                    {ratingStats.distribution[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
