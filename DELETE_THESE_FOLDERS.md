# Folders to Delete

Please delete the following folders and all their contents:

## Components to Delete
- `/components/reviews/` - Entire reviews system (we're keeping TestimonialCard instead)
- `/components/business/QuoteRequestForm.tsx` - Duplicate form component

## Demo Pages to Delete
- `/app/demo/` - All demo pages
- `/app/structured-data-demo/` - Structured data demo
- `/app/test-tailwind/` - Tailwind test page

## After Deletion
1. The ContactForm in `/components/business/` is already configured for Netlify Forms
2. The TestimonialCard in `/components/business/` handles testimonials
3. The comprehensive README.md now documents the entire project

## Commands to Delete (if using Git locally)
```bash
git rm -r components/reviews
git rm components/business/QuoteRequestForm.tsx
git rm -r app/demo
git rm -r app/structured-data-demo
git rm -r app/test-tailwind
```
