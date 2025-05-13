import { FaStar, FaRegClock, FaBookOpen, FaChevronRight } from 'react-icons/fa';
import { GiBookmarklet, GiBookshelf } from 'react-icons/gi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function SpecialOffers() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const offers = [
    {
      id: 1,
      title: 'Summer Reading Bundle',
      description:
        'Get 3 bestsellers for the price of 2. Curated by our experts.',
      discount: '30% OFF',
      icon: <FaBookOpen className="text-3xl text-blue-500 dark:text-white" />,
      tag: 'Limited Time',
      bgColor:
        'bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700',
    },
    {
      id: 2,
      title: 'Premium Membership',
      description:
        'Join our club for exclusive discounts, early access, and free shipping.',
      discount: '20% OFF',
      icon: <FaStar className="text-3xl text-blue-500 dark:text-white" />,
      tag: 'Popular',
      bgColor:
        'bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700',
    },
    {
      id: 3,
      title: 'Classics Collection',
      description:
        'Timeless literature at special prices. Build your personal library.',
      discount: '25% OFF',
      icon: (
        <GiBookmarklet className="text-3xl text-blue-500 dark:text-white" />
      ),
      tag: 'Curated',
      bgColor:
        'bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700',
    },
  ];

  return (
    <section className="lg:p-30 lg:-mt-28 container mx-auto ">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-14"
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Exclusive Book Offers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our special promotions and build your perfect collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`${offer.bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2 border border-blue-100 dark:border-gray-600`}
              data-aos="fade-up"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-blue-100 dark:border-gray-600">
                    {offer.icon}
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-gray-600 dark:text-white text-sm font-medium rounded-full flex items-center">
                    {offer.tag === 'Limited Time' && (
                      <FaRegClock className="mr-1" />
                    )}
                    {offer.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-white">
                  {offer.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-white">
                    {offer.discount}
                  </span>
                  <button className="inline-flex items-center px-2 py-1 border  border-gray-800 text-gray-800 dark:border-white dark:text-white rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700 transition-all duration-300">
                    Grab Offer
                    <FaChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-5 mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 dark:border-white dark:text-white rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700 transition-all duration-300">
            View All Offers
            <GiBookshelf className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
