import fs from 'fs';
import path from 'path';
import HeroSection from './components/HeroSection';
import DocumentsClient from './components/DocumentsClient';

import { Header } from '../components/Header';
import { FooterSection } from '../components/FooterSection';

// PDF dosya adlarını okunabilir hale getiren basit fonksiyon
function formatTitle(fileName: string) {
  return fileName
    .replace('.pdf', '') // .pdf uzantısını kaldır
    .replace(/_/g, ' ') // _ karakterlerini boşluk yap
    .split(' ') // Boşluklara göre ayır
    .map((word) => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
    })
    .join(' ');
}

export default function MevzuatlarPage() {
  // 1. public/docs klasörünün tam yolunu bul
  const docsDirectory = path.join(process.cwd(), 'public', 'docs');

  // 2. Klasördeki tüm dosya adlarını oku
  const fileNames = fs.readdirSync(docsDirectory);

  // 3. Dosya adlarını veri formatına çevir
  const documentsData = fileNames.map((file, index) => ({
    id: index + 1, // Her dosyaya benzersiz ID
    title: formatTitle(file), // Dosya adını okunabilir hale getir
    fileUrl: `/docs/${file}`, // public altındaki URL
  }));

  // 4. Listeyi Client Component'e gönder
  return (
    <>
      <Header />
      <HeroSection />
      <DocumentsClient documents={documentsData} />
      <FooterSection/>
    </>
  );
}
