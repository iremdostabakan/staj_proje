'use client';

import { Grid, Card, Text, Button, Group, rem } from '@mantine/core';
import { IconEye, IconDownload } from '@tabler/icons-react';

// Doküman öğesinin tip tanımı
type DocumentItem = {
  id: number;
  title: string;
  fileUrl: string;
};

// DocumentsGrid bileşeninin proplarının tip tanımı
type DocumentsGridProps = {
  documents: DocumentItem[];
  searchTerm: string;
};

// Dokümanları listeleyen ana bileşen
export default function DocumentsGrid({ documents, searchTerm }: DocumentsGridProps) {
  // Arama terimine göre dokümanları filtreleme işlemi
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      {/* Filtrelenmiş dokümanları haritalayarak her biri için bir Card bileşeni oluşturma */}
      {filteredDocs.map((doc) => (
        <Grid.Col key={doc.id} span={{ base: 12, sm: 6, md: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            {/* Dokümanın başlığını gösteren metin */}
            <Text fw={500} mb="md">
              {doc.title}
            </Text>
            <Group justify="space-between">
              {/* "Görüntüle" butonu */}
              <Button
                variant="light"
                color="blue"
                leftSection={<IconEye size={16} />}
                component="a"
                href={doc.fileUrl}
                target="_blank" // Yeni sekmede açılmasını sağlar
              >
                Görüntüle
              </Button>
              {/* "İndir" butonu */}
              <Button
                variant="filled"
                color="green"
                leftSection={<IconDownload size={16} />}
                component="a"
                href={doc.fileUrl}
                download // Dosyanın indirilmesini sağlar
              >
                İndir
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
