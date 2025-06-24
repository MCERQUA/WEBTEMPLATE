import React, { useState, useEffect } from 'react';
import { ReviewCard, Review } from './ReviewCard';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { StarRating } from './StarRating';

interface ReviewCarouselProps {
  reviews: Review[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  className?: string;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <div 
      className={`relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12 overflow-hidden ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(autoPlay)}
    >
      {/* Background decoration */}
      <Quote className="absolute top-4 right-4 w-24 h-24 text-primary-200 opacity-20" />
      
      {/* Review Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Real reviews from satisfied customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          {/* Compact Review Display */}
          <div className="text-center">
            <StarRating 
              rating={currentReview.rating} 
              size="lg" 
              className="justify-center mb-4"
            />
            
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
              "{currentReview.content}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <cite className="not-italic">
                <div className="font-semibold text-gray-900">{currentReview.author}</div>
                <div className="text-sm text-gray-600">
                  {currentReview.verified && 'Verified Customer • '}
                  {currentReview.service && `${currentReview.service} • `}
                  via {currentReview.source}
                </div>
              </cite>
            </div>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:shadow-lg"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:shadow-lg"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {showDots && reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Review Counter */}
        <div className="text-center mt-6 text-sm text-gray-600">
          {currentIndex + 1} of {reviews.length} reviews
        </div>
      </div>
    </div>
  );
};

// Alternative minimal carousel for sidebar or smaller spaces
export const ReviewCarouselMinimal: React.FC<ReviewCarouselProps> = ({
  reviews,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, reviews.length, autoPlayInterval]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
        <StarRating rating={currentReview.rating} size="sm" />
      </div>
      
      <blockquote className="text-gray-700 mb-4 line-clamp-3">
        "{currentReview.content}"
      </blockquote>
      
      <div className="flex items-center justify-between">
        <cite className="not-italic text-sm">
          <div className="font-medium text-gray-900">{currentReview.author}</div>
          <div className="text-gray-600">{currentReview.source}</div>
        </cite>
        
        <div className="flex gap-1">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full ${
                index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};