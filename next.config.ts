import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Preserve any links to the old /partner URL that exist in the wild
     (older share previews, screenshots, etc.). 308 = permanent, so search
     engines update their index, and the request method is preserved. */
  async redirects() {
    return [
      {
        source: "/partner",
        destination: "/partnerships",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
