import type { MetadataRoute } from "next";
import { SITE } from "../lib/seo";

// JobListing arayüzünü API'dan gelen veriyle eşleşecek şekilde tanımlıyoruz.
// Slug/ID için _id, son güncellenme için datePosted veya updatedAt kullanılabilir.
interface JobListing {
  _id: string;
  datePosted: string; // veya varsa updatedAt
}

// Gerçek API endpoint'inden tüm iş ilanlarını çeken fonksiyon
async function getAllJobs(): Promise<JobListing[]> {
  try {
    // API endpoint'ine doğrudan fetch isteği atıyoruz.
    // Bu kod sunucuda çalıştığı için tam URL kullanmak en güvenlisidir.
    const response = await fetch(new URL("/api/jobs", SITE.url));

    if (!response.ok) {
      // Hata durumunda boş bir dizi döndürerek sitemap oluşturmanın çökmesini engelliyoruz.
      console.error("Sitemap için iş ilanları alınamadı:", response.statusText);
      return [];
    }

    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error("Sitemap için iş ilanları alınırken bir hata oluştu:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Statik Sayfalar
  // Projenizdeki herkese açık, statik sayfaların listesi
  const staticRoutes = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/About", changefreq: "monthly", priority: 0.8 },
    { path: "/Fiyatlandirma", changefreq: "monthly", priority: 0.7 },
    { path: "/GirisimciFirmalar", changefreq: "monthly", priority: 0.7 },
    { path: "/Iletisim", changefreq: "yearly", priority: 0.5 },
    { path: "/isilanlari", changefreq: "weekly", priority: 0.9 },
    { path: "/Mevzuatlar", changefreq: "yearly", priority: 0.5 },
    { path: "/TeknokentYonetim", changefreq: "monthly", priority: 0.6 },
    { path: "/YardimDokumanlari", changefreq: "yearly", priority: 0.4 },
    { path: "/YonetimKurulu", changefreq: "monthly", priority: 0.6 },
  ].map(({ path, changefreq, priority }) => ({
    url: new URL(path, SITE.url).toString(),
    lastModified: now, // Veya sayfanın gerçek son güncellenme tarihi
    changeFrequency: changefreq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: priority,
  }));

  // 2. Dinamik Sayfalar (İş İlanları)
  // API'dan tüm iş ilanlarını çekip sitemap'e ekliyoruz.
  const jobs = await getAllJobs();
  const jobRoutes = jobs.map((job) => ({
    url: new URL(`/isilanlari/${job._id}`, SITE.url).toString(),
    lastModified: new Date(job.datePosted), // İlanın yayınlanma tarihini kullanıyoruz
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3. Tüm sayfaları birleştirip döndürüyoruz
  return [...staticRoutes, ...jobRoutes];
}
