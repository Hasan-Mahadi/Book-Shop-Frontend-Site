import Benner from './Benner';
import PCarousel from './PCarousel';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import FeaturedProducts from './FeaturedProducts';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 4000 });
  }, []);

  return (
    <div>
      <PCarousel></PCarousel>
     
      <FeaturedProducts />
      <h1
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
        className="font-bold text-center pt-10 pb-3 text-2xl"
      >
        CHILDREN’S BOOKS
      </h1>
      <Benner></Benner>
    </div>
  );
};

export default Home;
