"use client";

import { useState, useEffect } from "react";
import { useFirmaContext } from "../../../app/context/FirmaContext";
import { useOdemeContext, Odeme } from "../../../app/context/OdemeContext";
import { Select, TextInput, Button, Paper, Container, Title } from "@mantine/core";

export default function OdemeEditForm({ onBack }: { onBack: () => void }) {
  const { firmalar } = useFirmaContext();
  const { odemeler, addOdeme, updateOdeme } = useOdemeContext();

  const [selectedFirma, setSelectedFirma] = useState<string>("");
  const [form, setForm] = useState<Partial<Odeme>>({});

  // İlk firma otomatik seçimi
  useEffect(() => {
    const validFirmalar = firmalar.filter(f => f.id && f.ad);
    if (validFirmalar.length > 0 && !selectedFirma) {
      const firstFirma = validFirmalar[0];
      setSelectedFirma(firstFirma.id);
      handleFirmaChange(firstFirma.id);
    }
  }, [firmalar]);

  const handleFirmaChange = (firmaId: string) => {
    if (!firmaId) return;

    setSelectedFirma(firmaId);

    const firma = firmalar.find((f) => f.id === firmaId);
    if (!firma) return;

    const odeme = odemeler.find((o) => o.firmaId === firmaId);
    if (odeme) {
      setForm({ ...odeme });
    } else {
      setForm({
        firmaId: firma.id,
        firmaAdi: firma.ad,
        tutar: 0,
        sonOdemeTarihi: "",
        odemeDurumu: "Bekliyor",
        phoneNumber: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.firmaId ||
      !form.firmaAdi ||
      form.tutar === undefined ||
      !form.sonOdemeTarihi ||
      !form.odemeDurumu ||
      !form.phoneNumber
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (form.id) {
      await updateOdeme(form.id, {
        firmaId: form.firmaId,
        firmaAdi: form.firmaAdi,
        tutar: form.tutar,
        sonOdemeTarihi: form.sonOdemeTarihi,
        odemeDurumu: form.odemeDurumu,
        phoneNumber: form.phoneNumber,
      });
    } else {
      await addOdeme({
        firmaId: form.firmaId,
        firmaAdi: form.firmaAdi,
        tutar: form.tutar,
        sonOdemeTarihi: form.sonOdemeTarihi,
        odemeDurumu: form.odemeDurumu,
        phoneNumber: form.phoneNumber,
      });
    }

    onBack();
  };

  return (
    <Container size="sm" py="md">
      <Paper shadow="md" radius="md" p="lg" withBorder>
        <Title order={3} mb="md">
          Ödeme Düzenle / Ekle
        </Title>

        <form onSubmit={handleSubmit}>
          <Select
            label="Firma Seç"
            placeholder="Firma seçiniz"
            data={firmalar
              .filter(f => f.id && f.ad) // güvenli filtre
              .map(f => ({ value: f.id, label: f.ad }))}
            value={selectedFirma || ""}
            onChange={(val) => val && handleFirmaChange(val)}
            required
          />

          {selectedFirma && (
            <>
              <TextInput
                label="Tutar"
                type="number"
                value={form.tutar !== undefined ? form.tutar.toString() : ""}
                onChange={(e) =>
                  setForm({ ...form, tutar: Number(e.currentTarget.value) })
                }
                required
              />

              <TextInput
                label="Son Ödeme Tarihi"
                type="date"
                value={form.sonOdemeTarihi || ""}
                onChange={(e) =>
                  setForm({ ...form, sonOdemeTarihi: e.currentTarget.value })
                }
                required
              />

              <TextInput
                label="Telefon Numarası"
                placeholder="5xxxxxxxxx"
                value={form.phoneNumber || ""}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  if (/^\d{0,10}$/.test(val)) {
                    setForm({ ...form, phoneNumber: val });
                  }
                }}
                maxLength={10}
                required
                error={
                  form.phoneNumber && form.phoneNumber.length !== 10
                    ? "Lütfen 10 haneli telefon numarası girin"
                    : undefined
                }
              />

              <Button type="submit" mt="md">
                Kaydet
              </Button>
            </>
          )}
        </form>

        <Button mt="md" variant="light" onClick={onBack}>
          Geri
        </Button>
      </Paper>
    </Container>
  );
}
