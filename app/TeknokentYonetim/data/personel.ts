export interface PersonelTipi {
  id: string
  ad: string
  pozisyon: string
  resim: string
  cerceve_rengi: string
}

export interface OrganizasyonVerisi {
  ceo: PersonelTipi[]
  koordinator: PersonelTipi[]
  destek_personeli: PersonelTipi[]
}

export const personelVerisi: OrganizasyonVerisi = {
  ceo: [
    {
      id: "ceo-1",
      ad: "Doç. Dr. Durmuş ÖZDEMİR",
      pozisyon: "Genel Müdür",
      resim: "/kedii.webp",
      cerceve_rengi: "#3b82f6",
    },
  ],
  koordinator: [
    {
      id: "koord-1",
      ad: "Yunus Emre TELLİ",
      pozisyon: "İdari ve Mali İşler Koordinatörlüğü",
      resim: "/kedii.webp",
      cerceve_rengi: "#ec4899",
    },
    {
      id: "koord-2",
      ad: "M. Emin BEYTÜL",
      pozisyon: "Kurumsal İletişim Koordinatörlüğü",
      resim: "/kedii.webp",
      cerceve_rengi: "#84cc16",
    },
    {
      id: "koord-3",
      ad: "Muhammed BEKMEZCİ",
      pozisyon: "Girişimcilik ve Proje Koordinatörlüğü",
      resim: "/kedii.webp",
      cerceve_rengi: "#ec4899",
    },
    {
      id: "koord-4",
      ad: "Merve AKIN",
      pozisyon: "Girişimcilik ve Proje Koordinatörlüğü",
      resim: "/kedii.webp",
      cerceve_rengi: "#8b5cf6",
    },

     {
      id: "koord-4",
      ad: "Merve AKIN",
      pozisyon: "Girişimcilik ve Proje Koordinatörlüğü",
      resim: "/kedii.webp",
      cerceve_rengi: "#8b5cf6",
    },

    
  ],
  destek_personeli: [
    {
      id: "destek-1",
      ad: "Lütfullaf ARVAS",
      pozisyon: "Destek Personeli",
      resim: "/kedii.webp",
      cerceve_rengi: "#f59e0b",
    },
    {
      id: "destek-2",
      ad: "Nurten AKKAŞ",
      pozisyon: "Destek Personeli",
      resim: "/kedii.webp",
      cerceve_rengi: "#f59e0b",
    },

    {
      id: "destek-3",
      ad: "Hatice KÜÇÜKARSLAN",
      pozisyon: "Destek Personeli",
      resim: "/kedii.webp",
      cerceve_rengi: "#f59e0b",
    },
    {
      id: "destek-4",
      ad: "Ayşe GÖDE",
      pozisyon: "Destek Personeli",
      resim: "/kedii.webp",
      cerceve_rengi: "#f59e0b",
    },

  ],
}

export function personelEkle(kategori: keyof OrganizasyonVerisi, yeniPersonel: PersonelTipi) {
  personelVerisi[kategori].push(yeniPersonel)
}

export function personelSil(kategori: keyof OrganizasyonVerisi, personelId: string) {
  const index = personelVerisi[kategori].findIndex((p) => p.id === personelId)
  if (index > -1) {
    personelVerisi[kategori].splice(index, 1)
  }
}
