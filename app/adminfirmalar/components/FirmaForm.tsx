"use client";

import { useState } from "react";
import { useFirmaContext } from "../../context/FirmaContext";
import {
  TextInput,
  Button,
  Textarea,
  FileInput,
  Paper,
  Title,
  Container,
  Text,
} from "@mantine/core";

export default function FirmaForm() {
  const { addFirma } = useFirmaContext();

  const [firmaAd, setfirmaAd] = useState("");
  const [logo, setLogo] = useState<File | null>(null); // formda file upload
  const [sektor, setSektor] = useState("");
  const [firmaEmail, setFirmaEmail] = useState("");
  const [webAdres, setWebAdres] = useState("");
  const [yetkiliAdi, setYetkiliAdi] = useState("");
  const [yetkiliTelefon, setYetkiliTelefon] = useState("");
  const [yetkiliEmail, setYetkiliEmail] = useState("");
  const [hakkimizda, setHakkimizda] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!firmaAd || !logo || !sektor || !firmaEmail || !yetkiliAdi || !yetkiliTelefon || !yetkiliEmail || !hakkimizda) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    const logoBase64 = await fileToBase64(logo);

    const res = await addFirma(firmaAd, {
      logo: logoBase64,
      sektor,
      firmaEmail,
      webAdres,
      yetkiliAdi,
      yetkiliTelefon,
      yetkiliEmail,
      hakkimizda,
    });

    if (!res.success) {
      setError(res.message || "Bir hata oluştu.");
      return;
    }
console.log("burda")
    // Başarılı ekleme sonrası formu temizle
    setfirmaAd("");
    setLogo(null);
    setSektor("");
    setFirmaEmail("");
    setWebAdres("");
    setYetkiliAdi("");
    setYetkiliTelefon("");
    setYetkiliEmail("");
    setHakkimizda("");
    setError("")
  };

  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Container size="md" py="md">
      <Paper shadow="md" radius="md" p="lg" withBorder>
        <Title order={3} mb="md">
          Firma Ekle
        </Title>

        {error && (
          <Text color="red" mb="md">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextInput
              label="Firma Adı"
              placeholder="Firmanın adını girin"
              value={firmaAd}
              onChange={(e) => setfirmaAd(e.currentTarget.value)}
              required
            />

            <FileInput
              label="Logo Görseli"
              placeholder="Logoyu yükleyin"
              value={logo}
              onChange={setLogo}
              accept="image/*"
              required
            />

            <TextInput
              label="Sektör"
              placeholder="Firmanın sektörünü girin"
              value={sektor}
              onChange={(e) => setSektor(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Firma E-posta"
              placeholder="Firmanın e-posta adresi"
              value={firmaEmail}
              onChange={(e) => setFirmaEmail(e.currentTarget.value)}
              type="email"
              required
            />

            <TextInput
              label="Web Adres"
              placeholder="Firmanın web adresi (opsiyonel)"
              value={webAdres}
              onChange={(e) => setWebAdres(e.currentTarget.value)}
            />

            <TextInput
              label="Yetkili Adı Soyadı"
              placeholder="Yetkilinin adı ve soyadı"
              value={yetkiliAdi}
              onChange={(e) => setYetkiliAdi(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Yetkili Telefon"
              placeholder="Yetkilinin telefon numarası"
              value={yetkiliTelefon}
              onChange={(e) => setYetkiliTelefon(e.currentTarget.value)}
              type="tel"
              required
            />

            <TextInput
              label="Yetkili E-posta"
              placeholder="Yetkilinin e-posta adresi"
              value={yetkiliEmail}
              onChange={(e) => setYetkiliEmail(e.currentTarget.value)}
              type="email"
              required
            />

            <Textarea
              label="Hakkımızda"
              placeholder="Firma hakkında kısa bilgi"
              value={hakkimizda}
              onChange={(e) => setHakkimizda(e.currentTarget.value)}
              minRows={3}
              autosize
              required
            />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <Button type="submit" size="md">
                Ekle
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
