"use client";

import { useEffect, useState } from "react";
import {Card, Button, Container, Modal,FileButton,Image,Group,Text,SimpleGrid } from "@mantine/core";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { HeroSection } from "./components/HeroSection";


interface MediaItem {
  _id: string;
  title: string;
  url: string;
}

export default function AdminMedyaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [opened, setOpened] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [title, setTitle] = useState("");
  const [image,setImage] = useState<string>("");

  const fetchMedia = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSave = async () => {
    if (!image) return alert("Görsel gerekli!");
    const body = { url: image };

    if (editItem) {
      await fetch(`/api/media/${editItem._id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/media", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }

    setOpened(false);
    setTitle("");
    setImage("");
    setEditItem(null);
    fetchMedia();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    fetchMedia();
  };

 return (
    <>
      <Header />
      <HeroSection />
      <Container mt={50}>
        <Button color="blue" onClick={() => setOpened(true)} mb="md">
          Yeni Medya Ekle
        </Button>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="lg">
          {media.map((item) => (
            <Card key={item._id} shadow="sm" padding="sm" radius="md" withBorder>
              <Image src={item.url} alt="Medya" height={120} radius="md" fit="cover" />
              <Group justify="center" mt="sm">
                <Button
                  size="xs"
                  color="yellow"
                  onClick={() => {
                    setEditItem(item);
                    setImage(item.url);
                    setOpened(true);
                  }}
                >
                  Düzenle
                </Button>
                <Button size="xs" color="red" onClick={() => handleDelete(item._id)}>
                  Sil
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={editItem ? "Medya Düzenle" : "Yeni Medya"}
          size="lg"
          centered
        >
          <Text mb="sm">Bilgisayarınızdan bir görsel seçin:</Text>

          <FileButton
            onChange={(file) => {
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => setImage(reader.result as string);
              reader.readAsDataURL(file);
            }}
            accept="image/*"
          >
            {(props) => (
              <Button {...props} fullWidth color={image ? "green" : "blue"} mb="sm">
                {image ? "Görsel Değiştir" : "Görsel Seç"}
              </Button>
            )}
          </FileButton>

          {image && (
            <Image
              src={image}
              alt="Seçilen Görsel"
              width="100%"
              radius="md"
              mb="sm"
              style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
            />
          )}

          <Button fullWidth color="blue" onClick={handleSave}>
            {editItem ? "Güncelle" : "Ekle"}
          </Button>
        </Modal>

        <FooterSection />
      </Container>
    </>
  );
}
