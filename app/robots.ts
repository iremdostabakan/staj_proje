import type { MetadataRoute } from "next"
import { SITE } from "../lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/api/*",
          "/docs/*.pdf",   // non-ASCII adlar için güvenli desen
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}

