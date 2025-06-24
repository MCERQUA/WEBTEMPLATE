import React from 'react';
import { StarRating } from './StarRating';
import { CheckCircle, ThumbsUp, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: Date | string;
  content: string;
  source: 'Google' | 'Yelp' | 'Facebook' | 'Website';
  verified: boolean;
  helpful: number;
  service?: string;
  businessResponse?: {
    content: string;
    date: Date | string;
  };
}

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  className?: string;
}

const sourceColors = {
  Google: 'bg-blue-100 text-blue-800',
  Yelp: 'bg-red-100 text-red-800',
  Facebook: 'bg-indigo-100 text-indigo-800',
  Website: 'bg-green-100 text-green-800'
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpful,
  className = ''
}) => {
  const reviewDate = typeof review.date === 'string' ? new Date(review.date) : review.date;
  
  return (
    <article 
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className="font-semibold text-gray-900"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{review.author}</span>
            </h3>
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                Verified Customer
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={review.rating.toString()} />
              <meta itemProp="bestRating" content="5" />
              <StarRating rating={review.rating} size="sm" />
            </div>
            
            <time 
              className="text-sm text-gray-600"
              itemProp="datePublished"
              dateTime={reviewDate.toISOString()}
            >
              {format(reviewDate, 'MMMM d, yyyy')}
            </time>
            
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${sourceColors[review.source]}`}>
              {review.source}
            </span>
            
            {review.service && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {review.service}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed" itemProp="reviewBody">
          {review.content}
        </p>
      </div>

      {/* Business Response */}
      {review.businessResponse && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-gray-900">Business Response</span>
            <time className="text-xs text-gray-600 ml-auto">
              {format(
                typeof review.businessResponse.date === 'string' 
                  ? new Date(review.businessResponse.date) 
                  : review.businessResponse.date, 
                'MMM d, yyyy'
              )}
            </time>
          </div>
          <p className="text-sm text-gray-700">
            {review.businessResponse.content}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onHelpful?.(review.id)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          aria-label="Mark review as helpful"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </article>
  );
};