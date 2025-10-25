"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Paper, Title, Text, ThemeIcon } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [phoneNumber, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/odeme/generateCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Telefonu localStorage’a kaydet
        localStorage.setItem("phoneNumber", phoneNumber);
        router.push("/Odeme/verify");
      } else {
        setError(data.message || "Bir hata oluştu");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Sunucu hatası");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#2C3E50",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          style={{
            width: 360,
            backgroundColor: "white",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          {/* Telefon ikon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <ThemeIcon size={56} radius="xl" color="#34495E">
              <IconPhone size={28} color="white" />
            </ThemeIcon>
          </motion.div>

          {/* Başlık & açıklama */}
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Title order={3} mb="xs" c="dark">
              Güvenli Ödeme
            </Title>
            <Text size="sm" c="dimmed" mb="lg">
              Telefon numaranızla güvenli ödeme yapın
            </Text>
          </motion.div>

          {/* Input & Button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TextInput
              label="Telefon Numarası"
              placeholder="(5XX) XXX-XXXX"
              size="md"
              radius="md"
              value={phoneNumber}
              onChange={(e) => setPhone(e.currentTarget.value)}
              styles={{
                input: {
                  borderColor: "#bdc3c7",
                  ":focus": {
                    borderColor: "#34495E",
                  },
                },
              }}
            />

            {error && (
              <Text c="red" size="sm" mt="sm">
                {error}
              </Text>
            )}

            <Button
              onClick={handleLogin}
              fullWidth
              size="md"
              radius="md"
              mt="md"
              styles={{
                root: {
                  backgroundColor: "#34495E",
                  ":hover": { backgroundColor: "#2C3E50" },
                  transition: "all 0.3s ease",
                },
              }}
            >
              SMS Kodu Gönder
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginTop: 24 }}
          >
            <Text size="xs" c="dimmed">
              🔒 SSL ile güvenli bağlantı
            </Text>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: 8,
                fontSize: 11,
                color: "#7f8c8d",
              }}
            >
              <span>256-bit SSL</span>
              <span>PCI DSS</span>
              <span>Güvenli</span>
            </div>
          </motion.div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}
