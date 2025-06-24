import React from 'react';
import { StarRating } from './StarRating';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  totalReviews,
  ratingBreakdown,
  className = ''
}) => {
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-gray-900 mb-2" itemProp="ratingValue">
            {averageRating.toFixed(1)}
          </div>
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="reviewCount" content={totalReviews.toString()} />
          
          <StarRating 
            rating={averageRating} 
            size="lg" 
            showNumeric={false}
            className="justify-center md:justify-start mb-2"
          />
          
          <p className="text-sm text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingBreakdown[stars as keyof typeof ratingBreakdown];
            const percentage = getPercentage(count);
            
            return (
              <div key={stars} className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label={`Filter by ${stars} star reviews`}
                >
                  <span>{stars}</span>
                  <StarRating rating={stars} size="sm" />
                </button>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>All reviews verified</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% authentic reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};