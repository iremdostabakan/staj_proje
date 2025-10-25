// app/page.tsx

// 1. SEO ve Metadata araçlarını içe aktarıyoruz
import { composeMetadata } from "../lib/seo";
import type { Metadata } from "next";

// 2. Bu sayfaya özel meta etiketleri oluşturuyoruz (Sunucu Tarafı)
export async function generateMetadata(): Promise<Metadata> {
  const metadata = composeMetadata({
    title: "Ana Sayfa",
    description: "Kütahya Tasarım Teknokent: Geleceğin teknolojisini şekillendiren AR-GE ve inovasyon projeleri için Kütahya'daki merkez üssünüz.",
    path: "/",
  });
  return metadata;
}

// 3. Az önce oluşturduğumuz Client Component'i içe aktarıyoruz
// Not: Eğer component'leriniz app klasörü içindeyse yolu ./components/HomePageClient şeklinde düzenleyin.
import HomePageClient from "./components/HomePageClient";

// 4. Sayfa component'i (Sunucu Tarafı)
export default function Page() {
  // Client component'i burada render ediyoruz
  return <HomePageClient />;
}
