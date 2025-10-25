// app/yonetim-kurulu/page.tsx
"use client";

import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

import { HeroSection } from "./components/HeroSection";
import { CorporateCards } from "./components/CorporateCards";
import { BoardMembers } from "./components/BoardMembers";

import {
  IconBuildingBank,
  IconBriefcase,
  IconBaselineDensityMedium,
} from "@tabler/icons-react";





const corporateInfo = [
  {
    title: "Kurumsal Kimlik",
    description:
      "Dumlupınar Teknokent Yönetim Kurulu, Kütahya’nın teknoloji vizyonuna yön veren, üniversite-sanayi iş birliğini esas alan bir karar ve strateji organıdır.",
    icon: IconBuildingBank,
    },
  {
    title: "Görev ve Sorumluluklar",
    description:
      "Yönetim Kurulumuz; stratejik kararlar almak, yeni projeleri değerlendirmek ve Teknokent'in sürdürülebilirliğini sağlamakla görevlidir.",
        icon: IconBriefcase,
    },
  {
    title: "Kurul Üyelerimiz",
    description:
      "Üniversite, kamu ve sanayi temsilcilerinden oluşan kurul üyelerimiz, farklı alanlardaki uzmanlıklarıyla Teknokent’in gelişimine katkı sunmaktadır.",
        icon: IconBaselineDensityMedium,
    },
];
// Yönetim Kurulu Üyeleri verisi
const boardMembers = [
  {
    name: "Prof. Dr. Süleyman KIZILTOPRAK",
    position: "Yönetim Kurulu Başkanı DPÜ Rektörü",
    image: "kızıltoprak.jpeg",
  },
  {
    name: "Mücahit ERACAR",
    position: "GYönetim Kurulu Başkan Vekili - Kütahya İl Özel İdaresi Genel Sekreteri",
    image: "eracar.jpg",
  },
  {
    name: "Eyüp KAHVECİ",
    position: "Üye - Kütahya Belediye Başkanı",
    image: "kahveci.jpeg",
  },
  {
    name: "Hikmet TUNÇ",
    position: "Üye - Altıntaş Belediye Başkanı",
    image: "tunç.jpeg",
  },
  {
    name: "Tunahan ERGİN ",
    position: "Üye - Kütahya 1.OSB Müdürü",
    image: "ergin.jpg",
  },
  {
    name: "Mustafa Selman HATİPOĞLU",
    position: "Üye - Kütahya Ticaret ve Sanayi Odası Temsilcisi",
    image: "hatipoğlu.jpg",
  },
  {
    name: "Hasan ÖZYAŞAR",
    position: "Üye - Tavşanlı Sanayi ve Ticaret Odası Temsilcisi",
    image: "ozzyasar.jpg",
  },
  {
    name: "Yılmaz ÖZEN",
    position: "Üye - Gediz Sanayi ve Ticaret Odası Temsilcisi",
    image: "ozen.jpg",
  },
  {
    name: "Mustafa YENİPAZAR ",
    position: "Üye - Kütahya 30 Ağustos OSB Temsilcisi",
    image: "yenipazar.jpg",
  },
  {
    name: "Prof. Dr. Ahmet TEKİN ",
    position: "Üye - Kütahya Sağlık Bilimleri Üniversitesi Rektörü",
    image: "tekin.jpeg",
  },
  {
    name: "Şeref KAZICIOĞLU ",
    position: "Üye - SİMAV TSO Yön. Kur. Başkanı)",
    image: "kazıcıoğlu.jpeg",
  },
];

export default function YonetimKuruluPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <CorporateCards data={corporateInfo} />
      <BoardMembers members={boardMembers} />
      <FooterSection />
    </>
  );
}