import { Review } from './ReviewCard';

/**
 * Calculate average rating from an array of reviews
 */
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
};

/**
 * Calculate rating breakdown for reviews
 */
export const getRatingBreakdown = (reviews: Review[]) => {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    const rating = Math.floor(review.rating) as keyof typeof breakdown;
    if (rating in breakdown) {
      breakdown[rating]++;
    }
  });
  
  return breakdown;
};

/**
 * Get featured reviews (highest rated, most helpful, verified)
 */
export const getFeaturedReviews = (reviews: Review[], count: number = 3): Review[] => {
  return reviews
    .filter(review => review.verified)
    .sort((a, b) => {
      // Sort by rating first, then by helpful count
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.helpful - a.helpful;
    })
    .slice(0, count);
};

/**
 * Format review source for display
 */
export const formatReviewSource = (source: Review['source']): string => {
  const sourceMap = {
    Google: 'Google Reviews',
    Yelp: 'Yelp',
    Facebook: 'Facebook Reviews',
    Website: 'Direct Review'
  };
  return sourceMap[source] || source;
};

/**
 * Generate review schema markup
 */
export const generateReviewSchema = (review: Review, businessName: string) => {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    datePublished: typeof review.date === 'string' ? review.date : review.date.toISOString(),
    reviewBody: review.content,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: businessName
    }
  };
};

/**
 * Generate aggregate rating schema markup
 */
export const generateAggregateRatingSchema = (
  reviews: Review[], 
  businessName: string
) => {
  const averageRating = calculateAverageRating(reviews);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toString(),
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.slice(0, 5).map(review => generateReviewSchema(review, businessName))
  };
};

/**
 * Filter reviews by date range
 */
export const filterReviewsByDateRange = (
  reviews: Review[],
  startDate: Date,
  endDate: Date
): Review[] => {
  return reviews.filter(review => {
    const reviewDate = typeof review.date === 'string' ? new Date(review.date) : review.date;
    return reviewDate >= startDate && reviewDate <= endDate;
  });
};

/**
 * Get review statistics
 */
export const getReviewStatistics = (reviews: Review[]) => {
  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(r => r.verified).length;
  const averageRating = calculateAverageRating(reviews);
  const ratingBreakdown = getRatingBreakdown(reviews);
  
  // Calculate percentage of 4-5 star reviews
  const positiveReviews = ratingBreakdown[5] + ratingBreakdown[4];
  const positivePercentage = totalReviews > 0 
    ? Math.round((positiveReviews / totalReviews) * 100) 
    : 0;
  
  // Get most reviewed services
  const serviceCount = reviews.reduce((acc, review) => {
    if (review.service) {
      acc[review.service] = (acc[review.service] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const topServices = Object.entries(serviceCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([service, count]) => ({ service, count }));
  
  return {
    totalReviews,
    verifiedReviews,
    averageRating,
    ratingBreakdown,
    positivePercentage,
    topServices
  };
};