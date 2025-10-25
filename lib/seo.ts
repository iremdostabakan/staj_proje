import type { Metadata } from "next"

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Kütahya Tasarım Teknokent",
  domain: "dumlupinarteknokent.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dumlupinarteknokent.com",
  localeDefault: "tr-TR",
  locales: ["tr-TR", "en-US"],
  shortDescription:
    "Kütahya Tasarım Teknokent – teknoloji odaklı girişimlerin AR-GE ve inovasyona yönelik merkezi.",
  logo: "/logo.png",
  ogImage: "/logo-og.jpg",
  contacts: {
    email: "info@dumlupinarteknokent.com",
    phone: "+90 274 502 11 61",
    legalName: "Kütahya Tasarım Teknokent A.Ş.",
    addressLines: [
      "Çalca OSB Mh. 1. Cd. No: 1",
      "Eskişehir Yolu OSB Bölgesi 5. Km",
      "43100 Kütahya Merkez / Türkiye",
    ],
  },
  socials: {
    x: "https://x.com/KutahyaTekno",
    instagram: "https://instagram.com/kutahyatasarimteknokent",
    linkedin: "https://www.linkedin.com/in/dumlupinar-teknokent/",
    facebook: "https://www.facebook.com/kutahya.teknokent.5/",
  },
} as const

export const absoluteUrl = (path = "/") =>
  new URL(path, SITE.url).toString()

/** Tüm site için varsayılan metadata */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: SITE.localeDefault,
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.name, // ← typo düzeltildi
    description: SITE.shortDescription,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.shortDescription,
    images: [SITE.ogImage],
    site: "@KutahyaTekno",
    creator: "@KutahyaTekno",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/", // metadataBase ile birleşir
    languages: { "tr-TR": "/", "en-US": "/en" },
  },
  viewport: { width: "device-width", initialScale: 1, maximumScale: 5 },
}

/** Sayfa bazında metadata üreten yardımcı */
export function composeMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  const url = absoluteUrl(path)
  const img = image ? absoluteUrl(image) : absoluteUrl(SITE.ogImage)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? defaultMetadata.title?.toString(),
      description: description ?? defaultMetadata.description ?? undefined,
      url,
      images: [{ url: img }],
      siteName: SITE.name,
      type: "website",
      locale: SITE.localeDefault,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}

/** JSON-LD fabrikaları (gerekirse sayfa içinde kullanılacak) */
export const jsonLdOrganization = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.contacts.legalName,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  sameAs: Object.values(SITE.socials),
  email: SITE.contacts.email,
  telephone: SITE.contacts.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.contacts.addressLines[0],
    addressLocality: "Kütahya",
    addressRegion: "TR",
    postalCode: "43100",
    addressCountry: "TR",
  },
})

export const jsonLdContactPage = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": `İletişim - ${SITE.name}`,
  "description": `Kütahya Tasarım Teknokent ile iletişime geçin. Adres, telefon, e-posta ve harita bilgilerimiz.`,
  "url": absoluteUrl("/Iletisim"),
  "mainEntity": {
    "@type": "Organization",
    "name": SITE.name,
    "url": SITE.url,
    "logo": absoluteUrl(SITE.logo),
    "email": SITE.contacts.email,
    "telephone": SITE.contacts.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.contacts.addressLines[0],
      "addressLocality": "Kütahya",
      "addressRegion": "TR",
      "postalCode": "43100",
      "addressCountry": "TR",
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": SITE.contacts.phone,
      "contactType": "customer support", // Genel iletişim için bu uygundur
      "areaServed": "TR",
      "availableLanguage": ["Turkish"]
    }]
  }
});

// Yönetim kurulu üyesi verisinin arayüzünü tanımlıyoruz
interface BoardMember {
  name: string;
  position: string;
  image: string;
}

/**
 * Kişilerden oluşan bir liste için JSON-LD şeması üretir. (Örn: Yönetim Kurulu)
 * @param members - Kişi bilgilerini içeren dizi.
 * @param organizationName - Kişilerin çalıştığı organizasyonun adı.
 */
export const jsonLdPersonList = (members: BoardMember[], organizationName: string) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": members.map((member, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.position,
      "image": absoluteUrl(`/${member.image}`),
      "worksFor": {
        "@type": "Organization",
        "name": organizationName
      }
    }
  }))
});


export const jsonLdFaqPage = (questions: { questionName: string; acceptedAnswerText: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.questionName,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.acceptedAnswerText
    }
  }))
});

// Fiyatlandırma planı verisinin arayüzünü tanımlıyoruz
interface PricingPlan {
  name: string;
  price: string;
}

/**
 * Fiyatlandırma sayfası için bir Teklif Kataloğu (OfferCatalog) JSON-LD şeması üretir.
 * @param plans - Fiyatlandırma planlarını içeren dizi.
 */
export const jsonLdOfferCatalog = (plans: PricingPlan[]) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Kütahya Tasarım Teknokent - Hizmet ve Ücretlendirmeler",
  "itemListElement": plans.map((plan, index) => {
    // Fiyattan para birimini ve sayıyı ayırmaya çalışıyoruz.
    const priceString = plan.price.replace(/[^0-9.,]/g, '').replace(',', '.');
    const priceValue = parseFloat(priceString);

    return {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": plan.name
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": isNaN(priceValue) ? "0" : priceValue.toFixed(2),
        "priceCurrency": "TRY",
        "valueAddedTaxIncluded": false // Fiyatlara KDV dahil değil
      }
    };
  })
});


export const jsonLdWebSite = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.localeDefault,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})
