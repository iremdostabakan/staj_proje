// /Duyurular/data/duyurular.ts

// Duyuru verileri için tip tanımı
export interface Duyuru {
  id: string
  title: string
  image: string
  date: string
  link: string
}

// Tüm sayfalarda kullanılacak ortak veri
export const mockDuyurular: Duyuru[] = [
  {
    id: "1",
    title: "TÜBİTAK 2024 Proje Çağrıları Açıldı",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "15 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
  {
    id: "2",
    title: "Bilim İnsanları İçin Yeni Burs Programı",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "12 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
  {
    id: "3",
    title: "Teknoloji Transfer Ofisi Eğitim Programı",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "10 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
  {
    id: "4",
    title: "Ar-Ge Projeleri İçin Destek Programları",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "8 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
   // Daha fazla duyuru ekleyebilirsin
  {
    id: "5",
    title: "Yeni İnovasyon Yarışması Başvuruları Başladı",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "5 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
  {
    id: "6",
    title: "Ulusal Bilim Fuarı Tarihleri Belli Oldu",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    date: "2 Ocak 2024",
    link: "https://tubitak.gov.tr",
  },
]