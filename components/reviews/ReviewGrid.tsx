import React, { useState, useMemo } from 'react';
import { ReviewCard, Review } from './ReviewCard';
import { ReviewSummary } from './ReviewSummary';
import { ChevronDown, Filter, X } from 'lucide-react';

interface ReviewGridProps {
  reviews: Review[];
  showSummary?: boolean;
  itemsPerPage?: number;
  className?: string;
}

type SortOption = 'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc' | 'helpful';
type FilterRating = 'all' | '5' | '4' | '3' | '2' | '1';

export const ReviewGrid: React.FC<ReviewGridProps> = ({
  reviews,
  showSummary = true,
  itemsPerPage = 9,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [filterRating, setFilterRating] = useState<FilterRating>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique services
  const services = useMemo(() => {
    const uniqueServices = new Set(reviews.map(r => r.service).filter(Boolean));
    return Array.from(uniqueServices) as string[];
  }, [reviews]);

  // Calculate rating breakdown
  const ratingBreakdown = useMemo(() => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      const rating = Math.floor(review.rating) as keyof typeof breakdown;
      if (rating in breakdown) {
        breakdown[rating]++;
      }
    });
    return breakdown;
  }, [reviews]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews];

    // Apply rating filter
    if (filterRating !== 'all') {
      const ratingNum = parseInt(filterRating);
      filtered = filtered.filter(review => Math.floor(review.rating) === ratingNum);
    }

    // Apply service filter
    if (filterService !== 'all') {
      filtered = filtered.filter(review => review.service === filterService);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = typeof a.date === 'string' ? new Date(a.date) : a.date;
      const dateB = typeof b.date === 'string' ? new Date(b.date) : b.date;

      switch (sortBy) {
        case 'date-desc':
          return dateB.getTime() - dateA.getTime();
        case 'date-asc':
          return dateA.getTime() - dateB.getTime();
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, filterRating, filterService, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);
  const paginatedReviews = filteredAndSortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleHelpful = (reviewId: string) => {
    // This would typically update the review's helpful count
    console.log('Marked as helpful:', reviewId);
  };

  return (
    <div className={className}>
      {showSummary && (
        <ReviewSummary
          averageRating={averageRating}
          totalReviews={reviews.length}
          ratingBreakdown={ratingBreakdown}
          className="mb-8"
        />
      )}

      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="rating-asc">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Rating
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterRating('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filterRating === 'all' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Ratings
                  </button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating.toString() as FilterRating)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterRating === rating.toString() 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating} Stars
                    </button>
                  ))}
                </div>
              </div>

              {services.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Service
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterService('all')}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterService === 'all' 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Services
                    </button>
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => setFilterService(service)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          filterService === service 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(filterRating !== 'all' || filterService !== 'all') && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
                </span>
                <button
                  onClick={() => {
                    setFilterRating('all');
                    setFilterService('all');
                  }}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onHelpful={handleHelpful}
          />
        ))}
      </div>

      {filteredAndSortedReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No reviews match your filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-500">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};