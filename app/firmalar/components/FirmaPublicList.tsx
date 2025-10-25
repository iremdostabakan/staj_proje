"use client";

import { useFirmaContext } from "../../context/FirmaContext";
import { Card, Image, Text, Button, Container } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function FirmaPublicList() {
  const { firmalar } = useFirmaContext();
  const router = useRouter();

  if (firmalar.length === 0) {
    return <Text>Henüz firma eklenmedi.</Text>;
  }

  return (
    <Container size="xl" py="md">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {firmalar.map((firma) => (
          <Card
            key={firma.id}
            withBorder
            padding="lg"
            radius="md"
            style={{
              flex: "1 1 280px",
              maxWidth: 280,
              height: 420,
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

            <Card.Section mt="md" style={{ display: "flex" }}>
              <Button
                variant="light"
                color="green"
                fullWidth
                size="sm"
                onClick={() => router.push(`/adminfirmalar/${firma.id}`)} // ✅ Detay sayfasına yönlendir
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
