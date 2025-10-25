"use client";

import {
  Card,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Title,
  FileInput,
  Text,
  Box,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { IconUpload, IconFile } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function EtkinlikForm() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setFile(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      // Dosyayı form verilerine ekle
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/etkinlikler", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        notifications.show({
          title: "Başarılı",
          message: "Etkinlik başarıyla oluşturuldu",
          color: "green",
        });
        // Formu sıfırla
        event.currentTarget.reset();
        setFile(null);
        setFileName("");
      } else {
        throw new Error(result.error || "Etkinlik oluşturulamadı");
      }
    } catch (error: any) {
      notifications.show({
        title: "Hata",
        message: error.message || "Etkinlik oluşturulurken bir hata oluştu",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder radius="lg" shadow="sm" p="lg">
      <Title order={3} mb="md">
        Etkinlik Ekle
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            name="title"
            label="Başlık"
            placeholder="Etkinlik başlığı"
            required
          />
          
          <FileInput
            name="file"
            label="Kapak Fotoğrafı"
            placeholder="Dosya seçin"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
            required
          />
          
          {fileName && (
            <Box 
              p="sm" 
              style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <Group gap="sm">
                <IconFile size={20} />
                <Text size="sm" fw={500}>
                  Seçilen dosya: {fileName}
                </Text>
              </Group>
            </Box>
          )}
          
          <Textarea
            name="topic"
            label="Konu"
            placeholder="Etkinliğin konusu"
            minRows={2}
            required
          />
          
          <Group grow>
            <TextInput name="date" label="Tarih" type="date" required />
            <TextInput name="time" label="Saat" type="time" required />
          </Group>
          
          <TextInput
            name="location"
            label="Konum"
            placeholder="Adres / Salon / Online"
            required
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={loading}>
              Etkinliği Oluştur
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}