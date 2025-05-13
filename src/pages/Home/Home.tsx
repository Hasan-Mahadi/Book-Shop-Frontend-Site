import Benner from './Benner';
import PCarousel from './PCarousel';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import FeaturedProducts from './FeaturedProducts';

import BlogSection from '../BlogSection';
import Offers from './Offers';
import HomeCategories from './CategorySection ';
import TestimonialSection from './TestimonialSection';
import Newssection from './Newssection';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 4000 });
  }, []);

  return (
    <div>
      <PCarousel></PCarousel>

      <FeaturedProducts />
      <Offers />
      <HomeCategories />
      <BlogSection />
      <TestimonialSection />

      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
      >
        <h1 className="lg:pt-14 text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Upcoming Releases
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
          Discover our newest books coming soon
        </p>
      </div>

      <Benner></Benner>
      <Newssection/>
    </div>
  );
};

export default Home;
