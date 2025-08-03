import { SITE_CONFIG } from './constants';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export const generateSEOTags = ({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  keywords = SITE_CONFIG.keywords,
  image = '/og-image.jpg',
  url = SITE_CONFIG.url,
  type = 'website'
}: SEOProps = {}) => {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      type,
      image,
      siteName: SITE_CONFIG.name,
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
      creator: '@haithamelabdioui'
    },
    canonical: url,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
    viewport: 'width=device-width, initial-scale=1.0'
  };
};

export const updateDocumentHead = (seoData: ReturnType<typeof generateSEOTags>) => {
  // Update title
  document.title = seoData.title;
  
  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords);
  updateMetaTag('author', seoData.author);
  updateMetaTag('robots', seoData.robots);
  updateMetaTag('viewport', seoData.viewport);

  // Open Graph tags
  updateMetaTag('og:title', seoData.openGraph.title, true);
  updateMetaTag('og:description', seoData.openGraph.description, true);
  updateMetaTag('og:url', seoData.openGraph.url, true);
  updateMetaTag('og:type', seoData.openGraph.type, true);
  updateMetaTag('og:image', seoData.openGraph.image, true);
  updateMetaTag('og:site_name', seoData.openGraph.siteName, true);
  updateMetaTag('og:locale', seoData.openGraph.locale, true);

  // Twitter tags
  updateMetaTag('twitter:card', seoData.twitter.card);
  updateMetaTag('twitter:title', seoData.twitter.title);
  updateMetaTag('twitter:description', seoData.twitter.description);
  updateMetaTag('twitter:image', seoData.twitter.image);
  updateMetaTag('twitter:creator', seoData.twitter.creator);

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seoData.canonical);
};