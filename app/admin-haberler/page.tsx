"use client";
import AdminGuard from "../components/AdminGuard";

import { useEffect, useState } from "react";
import {
  Card, Text, Image, Button, Container, SimpleGrid, TextInput, Textarea, FileButton, Stack,
  Group,
  Title,
  Divider
} from "@mantine/core";
import { Header } from "../components/Header";
import { HeroSection } from "./components/HeroSection";
import { FooterSection } from "../components/FooterSection";

type Haber = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
};

export default function AdminHaberler() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [editingHaber, setEditingHaber] = useState<Haber | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    const res = await fetch("/api/haberler");
    const data: Haber[] = await res.json();
    setHaberler(data);
  };

  const handleEdit = (haber: Haber) => {
    setEditingHaber(haber);
    setTitle(haber.title);
    setDescription(haber.description);
    setImage(haber.image);
  };

  const handleUpdateOrCreate = async () => {
    if (editingHaber) {
      // Düzenleme
      await fetch(`/api/haberler/${editingHaber._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image }),
      });

    } else {
      // Yeni ekleme
      await fetch(`/api/haberler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image }),
      });
    }

    // Formu temizle
    setEditingHaber(null);
    setTitle("");
    setDescription("");
    setImage("");
    fetchHaberler();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu haberi silmek istediğine emin misin?")) return;

    await fetch(`/api/haberler/${id}`, {
      method: "DELETE",
    });

    fetchHaberler(); // Listeyi güncelle
  };


  return (
    <AdminGuard>
      <Header />
      <HeroSection />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Başlık */}
          <Title order={1} c="rgb(52, 73, 94)" style={{ textAlign: "center" }}>
            Haberler Yönetimi
          </Title>

          {/* Ekle / Düzenle Formu */}
          <Card shadow="lg" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <TextInput
                label="Başlık"
                placeholder="Haber başlığı girin"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
              />
              <Textarea
                label="Açıklama"
                placeholder="Haber açıklamasını girin"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                minRows={4}
                required
              />
              {/* Dosya seçme */}
              <FileButton
                accept="image/*"
                onChange={async (file) => {
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => setImage(reader.result as string);
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    const result = reader.result;
                    if (result && typeof result === "string") setImage(result);
                  };

                }}
              >
                {(props) => (
                  <Button {...props} variant="outline" color="blue">
                    {image ? "Görsel Değiştir" : "Görsel Seç"}
                  </Button>
                )}
              </FileButton>

              {/* Önizleme */}
              {image && image.trim() !== "" ? (
                <Image
                  src={image}
                  alt="Seçilen Görsel"
                  height={180}
                  radius="md"
                  mt="sm"
                  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                />
              ) : (
                <Text c="dimmed" mt="sm">
                  Henüz görsel seçilmedi
                </Text>
              )}

              <Button
                mt="sm"
                onClick={() => {
                  if (!image) {
                    alert("Lütfen bir görsel seçin!");
                    return;
                  }
                  handleUpdateOrCreate();
                }}
              >
                {editingHaber ? "Güncelle" : "Ekle"}
              </Button>
            </Stack>
          </Card>

          <Divider label="Mevcut Haberler" labelPosition="center" my="xl" />

          {/* Haberler Kartları */}
          <SimpleGrid cols={3} spacing="lg" >
            {haberler.map((haber) => (
              <Card key={haber._id} shadow="md" radius="md" withBorder>
                <Stack gap="sm">
                  <Image src={haber.image} alt={haber.title} height={160} radius="md" fit="cover" />
                  <Text fw={600} size="lg" lineClamp={1}>
                    {haber.title}
                  </Text>
                  <Text size="sm" lineClamp={2} c="dimmed">
                    {haber.description}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {new Date(haber.createdAt).toLocaleDateString()}
                  </Text>

                  <Group gap="sm" align="apart" mt="sm">
                    <Button
                      variant="outline"
                      color="blue"
                      size="xs"
                      onClick={() => handleEdit(haber)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      size="xs"
                      onClick={() => handleDelete(haber._id!)}
                    >
                      Sil
                    </Button>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
      <FooterSection/>
    </AdminGuard>
  );


}
