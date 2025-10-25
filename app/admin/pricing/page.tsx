"use client";

import { useEffect, useState } from "react";
import { Container, TextInput, Button, Box, Title, Group } from "@mantine/core";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { HeroSection } from "./components/HeroSection";

export default function AdminPricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", price: "", features: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Verileri yükle
  const loadPlans = async () => {
    const res = await fetch("/api/pricing");
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const resetForm = () => {
    setForm({ name: "", price: "", features: "" });
    setEditIndex(null);
  };

  // Yeni plan ekle veya güncelle
  const handleSubmit = async () => {
    const plan = { ...form, features: form.features.split(",").map(f => f.trim()) };

    if (editIndex !== null) {
      // Güncelle
      await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: editIndex, updatedPlan: plan }),
      });
    } else {
      // Yeni ekle
      await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
      });
    }

    await loadPlans();
    resetForm();
  };

  // Sil
  const handleDelete = async (index: number) => {
    await fetch("/api/pricing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    await loadPlans();
  };

  // Düzenle
  const handleEdit = (index: number) => {
    const plan = plans[index];
    setForm({ name: plan.name, price: plan.price, features: plan.features.join(", ") });
    setEditIndex(index);
  };

  return (
    <>
    <Header/>
    <HeroSection/>
    <Container size="sm" py={40}>
      <Title order={2} mb="lg" c="rgb(52, 73, 94)">
        Fiyatlandırma Yönetimi
      </Title>

      {/* Form */}
      <Box mb="xl">
        <TextInput
          label="Plan Adı"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Fiyat"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Özellikler (virgülle ayır)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.currentTarget.value })}
          mb="sm"
        />
        <Button fullWidth color="teal" onClick={handleSubmit}>
          {editIndex !== null ? "Güncelle" : "Plan Ekle"}
        </Button>
        {editIndex !== null && (
          <Button fullWidth color="red" mt="sm" variant="outline" onClick={resetForm}>
            İptal
          </Button>
        )}
      </Box>

      {/* Mevcut planlar */}
      {plans.map((plan, idx) => (
        <Box key={idx} mb="md" p="md" style={{ border: "1px solid #ddd" }}>
          <strong>{plan.name}</strong> - {plan.price}
          <br />
          Özellikler: {plan.features.join(", ")}
          <Group mt="sm">
            <Button size="xs" color="blue" onClick={() => handleEdit(idx)}>
              Düzenle
            </Button>
            <Button size="xs" color="red" onClick={() => handleDelete(idx)}>
              Sil
            </Button>
          </Group>
        </Box>
      ))}
    </Container>
    <FooterSection/>
    </>
  );
}
