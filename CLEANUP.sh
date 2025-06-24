#!/bin/bash
# Cleanup script to remove duplicate components and demo pages

echo "Starting cleanup of WEBTEMPLATE..."

# Remove reviews system components
echo "Removing reviews system..."
rm -f components/reviews/ReviewCard.tsx
rm -f components/reviews/ReviewCarousel.tsx
rm -f components/reviews/ReviewGrid.tsx
rm -f components/reviews/ReviewSummary.tsx
rm -f components/reviews/ReviewsPageExample.tsx
rm -f components/reviews/StarRating.tsx
rm -f components/reviews/index.ts
rm -f components/reviews/utils.ts
rmdir components/reviews

# Remove QuoteRequestForm
echo "Removing QuoteRequestForm..."
rm -f components/business/QuoteRequestForm.tsx

# Remove demo pages
echo "Removing demo pages..."
# Remove all files in demo subdirectories first
find app/demo -type f -delete 2>/dev/null
# Remove demo directories
rm -rf app/demo/business-components
rm -rf app/demo/images
rm -rf app/demo/loading-states
rmdir app/demo

# Remove structured-data-demo
echo "Removing structured-data-demo..."
rm -f app/structured-data-demo/page.tsx
rmdir app/structured-data-demo

# Remove test-tailwind
echo "Removing test-tailwind..."
rm -f app/test-tailwind/page.tsx
rmdir app/test-tailwind

# Remove this cleanup script
echo "Removing cleanup script..."
rm -f CLEANUP.sh

echo "✅ Cleanup complete!"
echo ""
echo "Summary of changes:"
echo "- Removed reviews system (keeping TestimonialCard)"
echo "- Removed QuoteRequestForm (keeping ContactForm)"
echo "- Removed all demo pages"
echo "- Updated component exports"
echo "- Added comprehensive README.md"
echo ""
echo "Your template is now clean and ready to use!"
