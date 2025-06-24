import Head from 'next/head'
import { siteConfig } from '@/config/site.config'

export interface MetaTagsProps {
  // Basic meta tags
  title: string
  description: string
  keywords?: string[]
  author?: string
  
  // Open Graph tags
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: 'website' | 'article' | 'product' | 'profile'
  ogSiteName?: string
  ogLocale?: string
  
  // Twitter Card tags
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  
  // Additional SEO tags
  canonical?: string
  robots?: string
  viewport?: string
  themeColor?: string
  
  // Article-specific tags
  articlePublishedTime?: string
  articleModifiedTime?: string
  articleAuthor?: string
  articleSection?: string
  articleTags?: string[]
  
  // Business-specific tags
  geoRegion?: string
  geoPlacename?: string
  geoPosition?: string
  ICBM?: string
}

export function MetaTags({
  title,
  description,
  keywords,
  author = siteConfig.name,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',
  ogSiteName = siteConfig.name,
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  robots = 'index, follow',
  viewport = 'width=device-width, initial-scale=1',
  themeColor = '#ffffff',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags,
  geoRegion,
  geoPlacename,
  geoPosition,
  ICBM
}: MetaTagsProps) {
  const fullTitle = `${title} | ${siteConfig.name}`
  const effectiveOgTitle = ogTitle || fullTitle
  const effectiveOgDescription = ogDescription || description
  const effectiveOgUrl = ogUrl || siteConfig.url
  const effectiveTwitterTitle = twitterTitle || effectiveOgTitle
  const effectiveTwitterDescription = twitterDescription || effectiveOgDescription
  const effectiveTwitterImage = twitterImage || ogImage

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      <meta name="viewport" content={viewport} />
      <meta name="theme-color" content={themeColor} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={effectiveOgTitle} />
      <meta property="og:description" content={effectiveOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={effectiveOgUrl} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:title" content={effectiveTwitterTitle} />
      <meta name="twitter:description" content={effectiveTwitterDescription} />
      {effectiveTwitterImage && <meta name="twitter:image" content={effectiveTwitterImage} />}
      
      {/* Article-specific tags */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
          {articleSection && (
            <meta property="article:section" content={articleSection} />
          )}
          {articleTags && articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Geo tags for local businesses */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
      {geoPosition && <meta name="geo.position" content={geoPosition} />}
      {ICBM && <meta name="ICBM" content={ICBM} />}
      
      {/* Additional tags for local business */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      <meta name="format-detection" content="email=yes" />
    </Head>
  )
}