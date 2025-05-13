import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import { FaFacebook, FaLinkedin, FaTwitter, FaBookOpen } from 'react-icons/fa';
import {
  MdLibraryBooks,
  MdLocalShipping,
  MdSupportAgent,
  MdDiscount,
} from 'react-icons/md';
import { Button } from '@/components/ui/button';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true,
    });
  }, []);

  const { theme } = useTheme();

  return (
    <div className={theme}>
      <main className="py-12   container mx-auto   bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-18"
          data-aos="fade-down"
        >
          <div className="container mx-auto px-6 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              About Our Platforms
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Discover book reviews, author interviews, reading recommendations,
              and the latest in publishing news
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl pt-14  container mx-auto mb-20">
          {/* Mission */}
          <div
            data-aos="fade-right"
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
                <MdLibraryBooks className="text-blue-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              To democratize access to knowledge and literature by providing an
              extensive collection of quality books at affordable prices,
              delivered with exceptional service.
            </p>
            <ul className="space-y-3">
              {[
                'Make reading accessible to everyone',
                'Support authors and publishers',
                'Foster lifelong learning',
                'Build a community of readers',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 dark:text-indigo-400 mr-2 mt-1">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <FaBookOpen className="text-indigo-600 dark:text-blue-400 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              To become the most trusted online bookstore globally, transforming
              how people discover, purchase, and experience books in the digital
              age.
            </p>
            <ul className="space-y-3">
              {[
                'Innovative book discovery platform',
                'Personalized reading recommendations',
                'Sustainable book distribution',
                'Global literary community hub',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 dark:text-blue-400 mr-2 mt-1">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto mb-20">
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Why Choose BookShop ?
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <MdLibraryBooks className="text-3xl text-blue-600 dark:text-indigo-400" />
                ),
                title: 'Extensive Collection',
                desc: '200,000+ titles across all genres and categories',
              },
              {
                icon: (
                  <MdLocalShipping className="text-3xl text-blue-600 dark:text-indigo-400" />
                ),
                title: 'Fast Shipping',
                desc: 'Reliable delivery within 2-5 business days',
              },
              {
                icon: (
                  <MdSupportAgent className="text-3xl text-blue-600 dark:text-indigo-400" />
                ),
                title: '24/7 Support',
                desc: 'Dedicated customer service team',
              },
              {
                icon: (
                  <MdDiscount className="text-3xl text-blue-600 dark:text-indigo-400" />
                ),
                title: 'Great Deals',
                desc: 'Regular discounts and loyalty rewards',
              },
            ].map((feature, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 dark:bg-indigo-900/30 p-4 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Team Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2
            data-aos="fade-up"
            className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-12"
          >
            Meet Our Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Hasan Mahadi',
                role: 'Founder & CEO',
                bio: 'Book enthusiast with 15+ years in publishing industry',
                img: 'https://tutor-link-frontend-lovat.vercel.app/_next/image?url=https%3A%2F%2Fi.postimg.cc%2F8PdHvMKN%2Fmy-photo3.jpg&w=1920&q=75',
              },
              {
                name: 'Michael Chen',
                role: 'Head of Operations',
                bio: 'Logistics expert ensuring your books arrive quickly',
                img: 'https://tutor-link-frontend-lovat.vercel.app/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fclose-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg&w=1920&q=75',
              },
              {
                name: 'Jahid Hossain',
                role: 'Customer Experience',
                bio: 'Dedicated to making your shopping experience exceptional',
                img: 'https://tutor-link-frontend-lovat.vercel.app/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fhandsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg%3Fuid%3DR104361349%26ga%3DGA1.1.1841229347.1715426784%26semt%3Dais_hybrid%26w%3D740&w=1920&q=75',
              },
            ].map((member, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 150}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-indigo-400 mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Contact Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div
            data-aos="zoom-in"
            className="bg-gray-700 dark:bg-indigo-700 rounded-xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Have Questions?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help you with any questions about our books or
              services.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-md mx-auto">
              <div>
                <p className="font-semibold mb-1">Email Us</p>
                <a
                  href="mailto:support@bookshop.com"
                  className="hover:underline opacity-90"
                >
                  support@bookshop.com
                </a>
              </div>
              <div>
                <p className="font-semibold mb-1">Call Us</p>
                <a
                  href="tel:+1234567890"
                  className="hover:underline opacity-90"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Social Media */}
        <section className="max-w-2xl mx-auto text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
          >
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-6">
            {[
              {
                icon: <FaFacebook className="text-2xl" />,
                url: 'https://facebook.com/bookshop',
                color:
                  'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
              },
              {
                icon: <FaLinkedin className="text-2xl" />,
                url: 'https://linkedin.com/company/bookshop',
                color:
                  'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300',
              },
              {
                icon: <FaTwitter className="text-2xl" />,
                url: 'https://twitter.com/bookshop',
                color:
                  'text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200',
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} transition-colors`}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>
        {/* Back to Home */}
        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Link to="/">
            <Button
              variant="outline"
              className="inline-flex items-center px-10 py-3 border border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              Back To Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;
