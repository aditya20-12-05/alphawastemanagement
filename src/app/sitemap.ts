import type { MetadataRoute } from "next";

/* --------------------------------------------------------------------------
   Sitemap generator. Next.js detects this file (special name `sitemap.ts`)
   at the app-root segment and serves the result at /sitemap.xml.

   We list every static page with sensible change-frequency and priority
   hints for search-engine crawlers. Update when routes change.
-------------------------------------------------------------------------- */

const SITE = "https://www.alphawastemanagement.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/process`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/products`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/partner`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
