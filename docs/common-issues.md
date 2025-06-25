# Common Issues and Solutions

## ESLint Build Errors

### Issue: react/no-unescaped-entities
**Problem**: Unescaped quotes and apostrophes in JSX causing build failures on Netlify.

**Error Examples**:
- `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
- `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`

**Solution**: Replace all unescaped quotes and apostrophes in JSX with HTML entities:
- Single quotes/apostrophes: `'` → `&apos;`
- Double quotes: `"` → `&quot;`

**Files Fixed**:
- `app/about/page.tsx` - Line 98
- `app/contact/page.tsx` - Lines 93, 93
- `app/services/[slug]/page.tsx` - Line 155
- `app/structured-data-demo/page.tsx` - Lines 133-135
- `components/business/ContactForm.tsx` - Lines 228, 228
- `components/business/QuoteRequestForm.tsx` - Lines 320, 320, 604
- `components/business/ServiceAreaChecker.tsx` - Lines 183, 209, 209
- `components/business/TestimonialCard.tsx` - Lines 180, 180
- `components/external/examples/ExternalButtonExample.tsx` - Line 248
- `components/reviews/ReviewCarousel.tsx` - Lines 78, 78, 173, 173

**Prevention**: 
- Use HTML entities for quotes in JSX text content
- Consider using template literals or separate the text into variables when dealing with complex quoted content
- Enable ESLint in your editor to catch these issues during development

### Issue: TypeScript Errors in Form Components
**Problem**: FormField and TextAreaField components missing `onBlur` prop in their interfaces.

**Solution**: The components were using `onBlur` handlers but the prop wasn't defined in the component interfaces. This was resolved by the build system auto-formatting.

### Issue: Invalid Input Type
**Problem**: `type="date"` not allowed in FormField component.

**Solution**: The FormField component's type prop was restricted. This was resolved by updating the component to accept additional input types.

## Build Process
- Always run `npm run build` locally before deploying to catch ESLint errors
- Use `npx eslint . --ext .ts,.tsx --max-warnings 0` to check for linting issues
- Netlify builds with strict ESLint settings that may catch issues not visible in development

## Status: RESOLVED
All ESLint errors have been fixed and the build now passes successfully.
