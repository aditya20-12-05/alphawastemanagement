import type { MetadataRoute } from "next";

/* --------------------------------------------------------------------------
   Robots policy. Next.js detects this file (special name `robots.ts`) at
   the app-root segment and serves the result at /robots.txt.

   We allow everything (no private sections) and point crawlers at the
   sitemap so they can discover all routes efficiently.
-------------------------------------------------------------------------- */

const SITE = "https://www.alphawastemanagement.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
