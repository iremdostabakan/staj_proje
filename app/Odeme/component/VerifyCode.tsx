"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput } from "@mantine/core";
import {
  Paper,
  Title,
  Text,
  PinInput,
} from "@mantine/core";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";


export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhone] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 👈 BURAYA TAŞI
  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phoneNumber");
    if (storedPhone) setPhone(storedPhone);
  }, []);

    // Sayaç
  useEffect(() => {
    if (timeLeft <= 0) return; // süre bitti
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [timeLeft]);

  const handleVerify = async () => {
    try {
      const res = await fetch("/api/odeme/verifyCode", {//BURAYA DİKKAT ET!!!!!!!!!!
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      console.log("Verify response:", data);

      if (data.success && phoneNumber) {
        // ✅ Telefonu query param olarak gönder
        router.push(`/Odeme/payment?phoneNumber=${phoneNumber}`);
      } else {
        setError(data.message || "Kod hatalı");
      }
    } catch (err) {
      setError("Bir hata oluştu");
    }
  };

    const handleResend = () => {
    // tekrar SMS gönderme isteği
    console.log("Kod yeniden gönderildi!");
    setTimeLeft(60); // sayaç sıfırla
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
            width: 380,
            backgroundColor: "white",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          {/* İkon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#34495E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <MessageSquare size={28} color="white" />
          </div>

          <Title order={3} mb="xs" c="dark">
            SMS Doğrulama
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Telefonunuza gönderilen <b>6 haneli</b> kodu girin
          </Text>

          <Text size="sm" c="dimmed" mb="xs">
            {phoneNumber
              ? `${phoneNumber} numarasına SMS kodu gönderildi`
              : "Kod gönderildi"}
          </Text>

          <PinInput
            length={6} // ✅ 6 haneli oldu
            type="number"
            size="xl"
            radius="md"
            value={code}
            onChange={setCode}
            mb="md"
          />

          {error && (
            <Text c="red" size="sm" mb="sm">
              {error}
            </Text>
          )}

          <Button
            onClick={handleVerify}
            fullWidth
            size="md"
            radius="md"
            styles={{
              root: {
                backgroundColor: "#34495E",
                ":hover": { backgroundColor: "#2C3E50" },
                transition: "all 0.3s ease",
              },
            }}
          >
            Kodu Doğrula
          </Button>

          {/* Sayaç + yeniden gönder */}
          <Text size="sm" c="dimmed" mt="md">
            {timeLeft > 0 ? (
              <>Tekrar gönder ({timeLeft}s)</>
            ) : (
              <Button
                variant="subtle"
                size="sm"
                onClick={handleResend}
                styles={{
                  root: { color: "#34495E", fontWeight: "bold" },
                }}
              >
                Kodu Yeniden Gönder
              </Button>
            )}
          </Text>
        </Paper>
      </motion.div>
    </motion.div>
  );
}
