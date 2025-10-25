"use client";
import { useRouter } from "next/navigation"; // ekle

import { useState } from "react";
import { useFirmaContext, Firma } from "../../context/FirmaContext";
import { Card, Image, Text, Button, Container } from "@mantine/core";
import FirmaEditForm from "./FormEdit";

export default function FirmaList() {
  const { firmalar, removeFirma } = useFirmaContext();
  const [editingFirma, setEditingFirma] = useState<Firma | null>(null);
  const router = useRouter();
  if (editingFirma) {
    return <FirmaEditForm firma={editingFirma} onCancel={() => setEditingFirma(null)} />;
  }

  if (firmalar.length === 0) {
    return <Text>Henüz firma eklenmedi.</Text>;
  }

  return (
    <Container size="xl" py="md">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {firmalar.map((firma) => (
          <Card
            key={firma.id}
            withBorder
            padding="lg"
            radius="md"
            style={{
              flex: "1 1 280px",
              maxWidth: 280,
              height: 450,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Card.Section mb="sm" style={{ height: 200, overflow: "hidden" }}>
              <Image
                src={firma.logo || "https://placehold.co/280x180?text=No+Logo"}
                alt={`${firma.ad} logosu`}
                height={200}
                fit="cover"
                radius={0}
              />
            </Card.Section>

            <Text fw={500} size="lg" mb="xs" lineClamp={1}>
              {firma.ad}
            </Text>

            {firma.hakkimizda && (
              <Text size="sm" c="dimmed" lineClamp={3}>
                {firma.hakkimizda}
              </Text>
            )}

            <Card.Section mt="md" style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                variant="light"
                color="blue"
                fullWidth
                size="sm"
                onClick={() => setEditingFirma(firma)}
              >
                Düzenle
              </Button>
              <Button
                variant="light"
                color="red"
                fullWidth
                size="sm"
                onClick={() => removeFirma(firma.id)}
              >
                Sil
              </Button>
              <Button
                variant="light"
                color="green"
                fullWidth
                size="sm"
                onClick={() => router.push(`/adminfirmalar/${firma.id}`)}
              >
                Detay
              </Button>
            </Card.Section>
          </Card>
        ))}
      </div>
    </Container>
  );
}
