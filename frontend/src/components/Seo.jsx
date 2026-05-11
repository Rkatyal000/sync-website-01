import { Helmet } from "react-helmet-async";

const SITE = {
  name: "SYNC",
  url: "https://media-sync-17.preview.emergentagent.com",
  twitter: "@sync",
  description:
    "SYNC is a single-source cross-media intelligence platform for modern advertising — measure the same people across linear TV, OTT, YouTube, Meta and digital, then connect exposure to real outcomes.",
};

/**
 * Per-page SEO + GEO meta block.
 *
 * Props:
 *  - title:    page title (without site suffix)
 *  - description: meta description
 *  - path:     canonical path, e.g. "/blog"
 *  - image:    absolute or relative og image url
 *  - type:     "website" | "article"
 *  - keywords: string[]
 *  - geo:      { region?: string, locale?: string, placename?: string }
 *  - article:  { author?, datePublished?, tag? }  — only when type === "article"
 *  - jsonLd:   any additional structured data object (optional)
 */
export default function Seo({
  title,
  description = SITE.description,
  path = "/",
  image = "/sync-logo.png",
  type = "website",
  keywords = [],
  geo = { region: "Global", locale: "en" },
  article,
  jsonLd,
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — Where Intelligence Meets Execution`;
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  const baseLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebPage",
    name: fullTitle,
    headline: title || SITE.name,
    description,
    url,
    image: imageUrl,
    inLanguage: geo?.locale || "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/sync-logo.png`,
      },
    },
    ...(type === "article" && article
      ? {
          datePublished: article.datePublished,
          dateModified: article.datePublished,
          author: {
            "@type": "Person",
            name: article.author || SITE.name,
          },
          articleSection: article.tag,
          keywords: keywords.join(", "),
        }
      : {}),
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />

      {/* GEO */}
      {geo?.region && <meta name="geo.region" content={geo.region} />}
      {geo?.placename && <meta name="geo.placename" content={geo.placename} />}
      <meta name="language" content={geo?.locale || "en"} />
      <meta httpEquiv="content-language" content={geo?.locale || "en"} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={(geo?.locale || "en").replace("-", "_")} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={SITE.twitter} />

      {/* Crawl */}
      <meta name="robots" content="index,follow,max-image-preview:large" />

      {/* Article-specific */}
      {type === "article" && article?.datePublished && (
        <meta property="article:published_time" content={article.datePublished} />
      )}
      {type === "article" && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {type === "article" && article?.tag && (
        <meta property="article:section" content={article.tag} />
      )}

      <script type="application/ld+json">{JSON.stringify(baseLd)}</script>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
