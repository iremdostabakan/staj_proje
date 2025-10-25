"use client";

import { useState } from "react";
import { useFirmaContext, Firma } from "../../context/FirmaContext";
import {
  TextInput,
  Button,
  Textarea,
  FileInput,
  Paper,
  Title,
  Container,
} from "@mantine/core";

export default function FirmaEditForm({
  firma,
  onCancel,
}: {
  firma: Firma;
  onCancel: () => void;
}) {
  const { updateFirma } = useFirmaContext();

  const [ad, setAd] = useState(firma.ad);
  const [logo, setLogo] = useState<File | null>(null); // formda file upload olacaksa böyle kalabilir
  const [sektor, setSektor] = useState(firma.sektor);
  const [firmaEmail, setFirmaEmail] = useState(firma.firmaEmail);
  const [webAdres, setWebAdres] = useState(firma.webAdres);

  const [yetkiliAdi, setYetkiliAdi] = useState(firma.yetkiliAdi);
  const [yetkiliTelefon, setYetkiliTelefon] = useState(firma.yetkiliTelefon);
  const [yetkiliEmail, setYetkiliEmail] = useState(firma.yetkiliEmail);

  const [hakkimizda, setHakkimizda] = useState(firma.hakkimizda);



  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let logoBase64 = firma.logo; // eski logo varsayılan
    if (logo) {
      logoBase64 = await fileToBase64(logo);
    }

    await updateFirma(firma.id, { ad, logo: logoBase64, sektor, firmaEmail, webAdres, yetkiliAdi, yetkiliTelefon, yetkiliEmail, hakkimizda });


    onCancel(); // düzenleme modunu kapat
  };

  return (
    <Container size="md" py="md">
      <Paper shadow="md" radius="md" p="lg" withBorder>
        <Title order={3} mb="md">
          Firma Düzenle
        </Title>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextInput
              label="Firma Adı"
              value={ad}
              onChange={(e) => setAd(e.currentTarget.value)}
              required
              readOnly // ✅ artık değiştirilemez
            />

            <FileInput
              label="Logo Görseli"
              placeholder="Yeni logo seç (opsiyonel)"
              value={logo}
              onChange={setLogo}
              accept="image/*"
            />

            <TextInput
              label="Sektör"
              value={sektor}
              onChange={(e) => setSektor(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Firma E-posta"
              value={firmaEmail}
              onChange={(e) => setFirmaEmail(e.currentTarget.value)}
              type="email"
              required
            />

            <TextInput
              label="Web Adres"
              value={webAdres}
              onChange={(e) => setWebAdres(e.currentTarget.value)}
              placeholder="https://"
            />

            <TextInput
              label="Yetkili Adı Soyadı"
              value={yetkiliAdi}
              onChange={(e) => setYetkiliAdi(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Yetkili Telefon"
              value={yetkiliTelefon}
              onChange={(e) => setYetkiliTelefon(e.currentTarget.value)}
              type="tel"
              required
            />

            <TextInput
              label="Yetkili E-posta"
              value={yetkiliEmail}
              onChange={(e) => setYetkiliEmail(e.currentTarget.value)}
              type="email"
              required
            />

            <Textarea
              label="Hakkımızda"
              value={hakkimizda}
              onChange={(e) => setHakkimizda(e.currentTarget.value)}
              minRows={3}
              autosize
              required
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <Button variant="light" color="gray" onClick={onCancel}>
                İptal
              </Button>
              <Button type="submit" size="md">
                Kaydet
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );

}
