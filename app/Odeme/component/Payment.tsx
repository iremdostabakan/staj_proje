"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Paper, Title, Text, Button, Loader, Divider, Stack } from "@mantine/core";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Debt = {
  name: string;
  amount: number;
  dueDate: string;
};

export default function Payment() {
  const [loading, setLoading] = useState(true);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const phoneNumber = localStorage.getItem("phoneNumber");

  // 📡 Borç sorgulama
  useEffect(() => {
    const fetchCompany = async () => {
      if (!phoneNumber) {
        setMessage("Telefon numarası bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/odeme/payment?phoneNumber=${phoneNumber}`);
        const data = await res.json();

        if (data.success) {
          setDebts([
            {
              name: data.company,
              amount: data.amount,
              dueDate: data.dueDate,
            },
          ]);
        } else {
          setMessage("❌ Bekleyen borç bulunamadı.");
        }
      } catch (err) {
        setMessage("⚠️ Sunucu hatası.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [phoneNumber]);

  // 📡 Ödeme işlemi
  const handlePayment = async () => {
    if (!phoneNumber) return;

    setProcessing(true);
    setMessage("");
    try {
      const res = await fetch("/api/odeme/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Ödeme başarılı! Teşekkürler.");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage("❌ Ödeme işlemi başarısız.");
      }
    } catch (err) {
      setMessage("⚠️ Sunucu hatası.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: "#2C3E50" }} // 🎨 Arka plan rengi: açık gri
      // 🎨 Arka plan: sade gri yapıldı, 2. görsele benzetmek için
      className="flex justify-center items-center h-screen bg-gray-100"
      
    >
          <Paper
            shadow="xl"
            radius="xl"
            p="xl"
            withBorder
            style={{ width: "450px", height: "65vh" }}   // 📌 doğrudan width ve height verdik
            className="bg-white"
          >
        {/* Başlık */}
        <div className="text-center mb-6">
          {/* 🎨 Başlığa ikon eklendi (💳), mavi yuvarlak arka plan içinde */}
          <div className="mx-auto w-14 h-14 bg-blue-100 flex items-center justify-center rounded-full mb-3 text-xl">
            💳
          </div>
          <Title order={3} className="text-gray-800">
            Ödeme Onayı
          </Title>
          <Text size="sm" c="dimmed">
            Ödeme bilgilerinizi onaylayın
          </Text>
        </div>

        {loading ? (
          <div className="flex justify-center my-6">
            <Loader color="blue" />
          </div>
        ) : debts.length > 0 ? (
          debts.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              // 🎨 Kart içindeki borç kutusu: gri arka plan, kenarlık, radius
              className="bg-gray-50 border rounded-lg p-5 text-left mb-6"
            >
              <p className="mb-2">
                <span className="font-medium">Firma:</span> {d.name}
              </p>
              <p className="mb-2">
                <span className="font-medium">Borç Tutarı:</span>{" "}
                {/* 🎨 Borç tutarı yeşil renkle vurgulandı */}
                <span className="text-green-600 font-bold">
                  ₺{d.amount}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-medium">Son Ödeme Tarihi:</span>{" "}
                {d.dueDate}
              </p>

              <Divider my="sm" />
              {/* 🎨 Toplam alanı: daha büyük font + yeşil vurgulu */}
              <p className="text-lg font-bold text-green-600">
                Toplam: ₺{d.amount}
              </p>
            </motion.div>
          ))
        ) : (
          <Text ta="center" c="red">
            {message}
          </Text>
        )}

        {/* Ödeme butonları */}
        {debts.length > 0 && (
          <>
    <Stack gap={20}>
      <Button
        fullWidth
        radius="md"
        size="md"
        color="blue"
        loading={processing}
        onClick={handlePayment}
      >
        Ödemeyi Onayla
      </Button>

      <Button
        fullWidth
        radius="md"
        size="md"
        variant="outline"
        color="gray"
        onClick={() => router.push("/login")}
      >
        Geri Dön
      </Button>
    </Stack>
          </>
        )}

        {/* Ödeme sonrası mesaj */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            {/* 🎨 Başarı mesajı yeşil, hata mesajı kırmızı */}
            <Text size="sm" c={message.includes("✅") ? "green" : "red"}>
              {message}
            </Text>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
}