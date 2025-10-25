"use client";

import { useOdemeContext } from "../../../app/context/OdemeContext";
import { Card, Text, Button, Container } from "@mantine/core";

export default function OdemeList({ onBack }: { onBack: () => void }) {
  const { odemeler, removeOdeme } = useOdemeContext();

  if (odemeler.length === 0) {
    return (
      <Container>
        <Text>Henüz ödeme eklenmedi.</Text>
        <Button mt="md" onClick={onBack}>Geri</Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="md">
      {odemeler.map((odeme) => (
        <Card key={odeme.id} withBorder shadow="sm" mb="md">
          <Text><b>Firma:</b> {odeme.firmaAdi}</Text>
          <Text><b>Tutar:</b> {odeme.tutar} ₺</Text>
          <Text><b>Son Ödeme:</b> {odeme.sonOdemeTarihi}</Text>
          <Text><b>Durum:</b> {odeme.odemeDurumu}</Text>
          <Text><b>Telefon:</b> {odeme.phoneNumber}</Text>
          <Button mt="sm" color="red" onClick={() => removeOdeme(odeme.id)}>
            Sil
          </Button>
        </Card>
      ))}
      <Button onClick={onBack}>Geri</Button>
    </Container>
  );
}
