const Newssection = () => {
  return (
    <div>
      {/* Newsletter */}
      <section className="py-16 bg-gray-100 dark:bg-black">
        <div
          className="container mx-auto px-6 max-w-4xl text-center"
          data-aos="zoom-in"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Stay Updated on Books
          </h2>
          <p className="text-gray-600 mb-6 dark:text-white">
            Subscribe to our newsletter for the latest book reviews, author
            interviews, and reading recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 dark:text-white py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
            />
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newssection;
