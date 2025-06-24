#!/bin/bash
# Final cleanup script to remove all duplicate components and unnecessary files

echo "🧹 Starting final cleanup of WEBTEMPLATE..."
echo ""

# Remove reviews system components
echo "📁 Removing reviews system..."
rm -f components/reviews/ReviewCard.tsx
rm -f components/reviews/ReviewCarousel.tsx
rm -f components/reviews/ReviewGrid.tsx
rm -f components/reviews/ReviewSummary.tsx
rm -f components/reviews/ReviewsPageExample.tsx
rm -f components/reviews/StarRating.tsx
rm -f components/reviews/index.ts
rm -f components/reviews/utils.ts
rmdir components/reviews 2>/dev/null

# Remove QuoteRequestForm
echo "📄 Removing QuoteRequestForm..."
rm -f components/business/QuoteRequestForm.tsx

# Remove demo pages
echo "🗑️  Removing all demo pages..."
# Remove all files in demo subdirectories first
find app/demo -type f -delete 2>/dev/null
# Remove demo directories
rm -rf app/demo/business-components
rm -rf app/demo/images
rm -rf app/demo/loading-states
rmdir app/demo 2>/dev/null

# Remove structured-data-demo
echo "🗑️  Removing structured-data-demo..."
rm -f app/structured-data-demo/page.tsx
rmdir app/structured-data-demo 2>/dev/null

# Remove test-tailwind
echo "🗑️  Removing test-tailwind..."
rm -f app/test-tailwind/page.tsx
rmdir app/test-tailwind 2>/dev/null

# Remove other unnecessary files
echo "🗑️  Removing other unnecessary files..."
rm -f public/contact.html  # Static HTML that conflicts with Next.js routing

# Note: Keeping git_config.txt, GIT-UPDATE-REPO.bat, and GIT-PULL-REPO.bat
# as these are useful for repository management

# Remove this cleanup script itself and other cleanup-related files
echo "🗑️  Removing cleanup scripts..."
rm -f CLEANUP.sh
rm -f DELETE_THESE_FOLDERS.md
rm -f FINAL_CLEANUP.sh

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📋 Summary of changes:"
echo "- ✅ Removed reviews system (keeping TestimonialCard)"
echo "- ✅ Removed QuoteRequestForm (keeping ContactForm)"
echo "- ✅ Removed all demo pages"
echo "- ✅ Removed unnecessary files (contact.html)"
echo "- ✅ Kept Git utility files (GIT-UPDATE-REPO.bat, GIT-PULL-REPO.bat, git_config.txt)"
echo "- ✅ Updated documentation files"
echo ""
echo "🚀 Next steps:"
echo "1. Create image directories: mkdir -p public/images/{hero,services,blog,team}"
echo "2. Follow PROJECT_SETUP.md for complete setup instructions"
echo "3. Delete the cleanup-duplicates branch on GitHub"
echo "4. Start customizing with your business information!"
echo ""
echo "Your template is now clean and ready to use!"
