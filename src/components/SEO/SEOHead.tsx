import { useEffect } from 'react';
import { generateSEOTags, updateDocumentHead, SEOProps } from '../../utils/seo';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ children, ...seoProps }) => {
  useEffect(() => {
    const seoData = generateSEOTags(seoProps);
    updateDocumentHead(seoData);
  }, [seoProps]);

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Haitham El Abdioui",
            "jobTitle": "Software Engineering Student",
            "description": "Passionate software engineering student specializing in full-stack development, cloud technologies, and modern web frameworks.",
            "url": "https://haithamelabdioui.dev",
            "sameAs": [
              "https://github.com/elabdioui",
              "https://www.linkedin.com/in/haithamelabdioui/"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Casablanca",
              "addressCountry": "Morocco"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "EMSI Casablanca"
            },
            "knowsAbout": [
              "Software Engineering",
              "Full Stack Development",
              "React",
              "ASP.NET",
              "Python",
              "Cloud Technologies",
              "Web Development"
            ]
          })
        }}
      />
    </>
  );
};