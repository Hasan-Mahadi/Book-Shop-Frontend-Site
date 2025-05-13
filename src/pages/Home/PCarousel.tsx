// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// import { Link } from 'react-router-dom';

// const images = [
//   'https://i.postimg.cc/7hGqkrpq/bs-1.jpg',
//   'https://i.postimg.cc/C5szRqFc/bs-2.jpg',
//   'https://i.postimg.cc/G3xF8BS0/bs-3.jpg',
//   'https://i.postimg.cc/G3vCkRkn/bs-4.jpg',
// ];

// const PCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     AOS.init({ duration: 4000 });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div className="relative  w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] mt-17 mx-auto overflow-hidden rounded-lg shadow-lg">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Banner ${index + 1}`}
//             className="w-full object-cover"
//           />
//         ))}
//       </div>

//       <button
//         title="Previous Slide"
//         onClick={prevSlide}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         title="Next Slide"
//         onClick={nextSlide}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//       >
//         <ChevronRight size={24} />
//       </button>

//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         <div className="absolute inset-0    bg-opacity-40 flex items-center justify-center ">
//           <h1
//             data-aos-duration="2000"
//             data-aos-easing="ease-out-cubic"
//             data-aos="zoom-out-left"
//             className="text-blue-300 -mt-40  lg:-mt-120 sm:mr-40 md:mr-80 lg:mr-140 text-lg
//          text-5xl md:text-6xl lg:text-8xl font-bold font-serif "
//           >
//             Grab Your Favorite Book
//             <div className="lg:-mt-28 lg:ml-80 ml-30 ">
//               <button
//                 data-aos-duration="2000"
//                 data-aos-easing="ease-out-cubic"
//                 data-aos="flip-right"
//                 className="bg-transparent lg:text-2xl  hover:bg-blue-500
//              text-white font-semibold hover:text-white w-40 lg:h-12 border
//               border-blue-500 hover:border-transparent rounded"
//               >
//                 <Link to="allbooks">Order Now</Link>
//               </button>
//             </div>
//           </h1>
//         </div>

//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PCarousel;





import { useState, useEffect, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const images = [
  'https://i.postimg.cc/7hGqkrpq/bs-1.jpg',
  'https://i.postimg.cc/C5szRqFc/bs-2.jpg',
  'https://i.postimg.cc/G3xF8BS0/bs-3.jpg',
  'https://i.postimg.cc/G3vCkRkn/bs-4.jpg',
];

const PCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1500,
      once: true
    });
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full max-w-6xl h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] mt-17 mx-auto overflow-hidden rounded-xl shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        title="Previous Slide"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        title="Next Slide"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-24">
        <div className="text-white max-w-lg">
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Grab Your Favorite Book
          </h1>
          <p 
            data-aos="fade-right" 
            data-aos-delay="400"
            className="text-sm sm:text-base md:text-lg mb-6 opacity-90"
          >
           Take Your most favourite books Discover our exclusive collection of bestsellers and timeless classics
          </p>
          <button
            data-aos="fade-up"
            data-aos-delay="600"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link to="allbooks">Order Now</Link>
          </button>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default PCarousel;
