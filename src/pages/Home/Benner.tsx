import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Book {
  id: number;
  image: string;
  name: string;
  description: string;
  upcoming: boolean;
  details?: string;
}

const Banner: React.FC = () => {
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Sample book data
  const books: Book[] = [
    {
      id: 1,
      image:
        'https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg',
      name: 'The Silent Reader',
      description: 'A journey through the world of silent contemplation',
      upcoming: true,
      details:
        'This book will be released on June 15, 2024. Pre-order available soon!',
    },
    {
      id: 2,
      image:
        'https://img.freepik.com/free-photo/3d-view-books-cartoon-style_52683-117188.jpg',
      name: 'Cosmic Pages',
      description: 'Exploring the universe through literature',
      upcoming: true,
      details:
        'Coming in July 2024. A groundbreaking collection of space-themed stories.',
    },
    {
      id: 3,
      image:
        'https://img.freepik.com/free-vector/modern-school-education-knowledge-concept_3446-665.jpg',
      name: 'The Knowledge Tree',
      description: 'Grow your mind with these essential reads',
      upcoming: true,
      details:
        'Educational series launching in August 2024. Perfect for students.',
    },
    {
      id: 4,
      image:
        'https://img.freepik.com/free-vector/realistic-world-book-day-theme_23-2148476893.jpg',
      name: 'Literary Wonders',
      description: 'Discover the magic of classic literature',
      upcoming: true,
      details: 'Modern retellings of classics, arriving September 2024.',
    },
    {
      id: 5,
      image:
        'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149331952.jpg',
      name: 'Pages of Time',
      description: 'Historical novels that shaped generations',
      upcoming: true,
      details: 'Historical fiction collection coming October 2024.',
    },
    {
      id: 6,
      image:
        'https://img.freepik.com/free-psd/books-icon-isolated-3d-render-illustration_47987-7695.jpg',
      name: 'The Infinite Library',
      description: 'Stories without end from around the world',
      upcoming: true,
      details: 'International anthology releasing November 2024.',
    },
    {
      id: 7,
      image:
        'https://img.freepik.com/free-psd/pile-books-icon-isolated-3d-render-illustration_47987-15486.jpg',
      name: "Scholar's Choice",
      description: 'Academic works recommended by experts',
      upcoming: true,
      details: 'Academic reference books coming December 2024.',
    },
    {
      id: 8,
      image:
        'https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg',
      name: 'The Silent Reader',
      description: 'A journey through the world of silent contemplation',
      upcoming: true,
      details:
        'This book will be released on June 15, 2024. Pre-order available soon!',
    },
    // ... (rest of your book data remains the same)
  ];

  const handleDetailsClick = (book: Book): void => {
    setSelectedBook(book);
    setIsDialogOpen(true);
    plugin.current.stop(); // Pause autoplay when modal opens
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    plugin.current.reset(); // Resume autoplay when modal closes
  };

  const renderCarousel = (): React.JSX.Element => (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-lg md:max-w-xl mb-20 lg:pt-5 lg:max-w-6xl "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      data-aos="fade-up"
    >
      <CarouselContent>
        {books.map((book) => (
          <CarouselItem
            key={book.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            data-aos="zoom-in"
            data-aos-delay={book.id * 100}
          >
            <div className="group relative h-full">
              <Card className="overflow-hidden border-none shadow-none hover:shadow-md transition-shadow duration-300 h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative flex-grow">
                    <img
                      className="w-full rounded-t-lg h-[100px] md:h-[120px] lg:h-[124px] object-cover"
                      src={book.image}
                      alt={book.name}
                    />
                    {book.upcoming && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                        Upcoming
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white mb-3 line-clamp-2">
                      {book.description}
                    </p>
                    <Button
                      onClick={() => handleDetailsClick(book)}
                      className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        data-aos="fade-right"
      />
      <CarouselNext
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        data-aos="fade-left"
      />
    </Carousel>
  );

  return (
    <div className="relative mt-0 flex justify-center container mx-auto">
      {renderCarousel()}

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBook?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img
                src={selectedBook?.image}
                alt={selectedBook?.name}
                className="w-full md:w-1/2 h-auto rounded-lg object-cover"
              />
              <div className="space-y-2">
                {selectedBook?.upcoming && (
                  <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-md mb-2">
                    Upcoming Release
                  </span>
                )}
                <p className="text-gray-700 dark:text-white">
                  {selectedBook?.description}
                </p>
                <p className="text-sm text-gray-600 mt-2 dark:text-white">
                  {selectedBook?.details}
                </p>
                <div className="pt-4">
                  <Button
                    onClick={closeDialog}
                    className="bg-gray-700 hover:bg-gray-800 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Banner;
