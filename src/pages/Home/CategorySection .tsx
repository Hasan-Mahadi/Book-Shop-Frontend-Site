/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Category = {
  name: string;
  image: string;
  count: number;
};

const CategorySection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const requiredCategories = [
      'Fiction',
      'Science',
      'SelfDevelopment',
      'Poetry',
      'Religious',
    ];

    const categoryMap = new Map<string, Category>();

    requiredCategories.forEach((cat) => {
      categoryMap.set(cat, {
        name: cat,
        image: '',
        count: 0,
      });
    });

    allProducts.forEach((product: any) => {
      if (requiredCategories.includes(product.category)) {
        const existing = categoryMap.get(product.category);
        if (existing) {
          categoryMap.set(product.category, {
            ...existing,
            count: existing.count + 1,
            image: existing.image || product.image,
          });
        }
      }
    });

    const sortedCategories = Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    setCategories(sortedCategories);
  }, [allProducts]);

  const categoryImages: Record<string, string> = {
    Fiction:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    Science:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    SelfDevelopment:
      ' https://img.freepik.com/free-photo/improvement-summary-personal-development-workflow_53876-125155.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    Poetry:
      'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    Religious:
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  };

  return (
    <section className="lg:py-10 lg:pb-28 lg:-mt-14 container mx-auto bg-gradient-to-b from-gray-200 to-white dark:from-gray-900 dark:to-gray-800">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="flip-right"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
      >
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover books that match your interests across our diverse
            collection of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:px-30 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link
                to={{
                  pathname: '/allbooks',
                  search: `?category=${encodeURIComponent(category.name)}`,
                }}
                className="block h-full"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      categoryImages[category.name] ||
                      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
                    }
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg sm:text-xl truncate">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {category.count} {category.count === 1 ? 'book' : 'books'}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-300 rounded-xl pointer-events-none" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link
            to="/allbooks"
            className="inline-flex items-center px-6 py-3 border border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            Browse All Categories
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
