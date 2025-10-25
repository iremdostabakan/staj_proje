"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput, Button, Box, Notification } from "@mantine/core";

export function LoginYap() {
  const router = useRouter();

  // Form inputları
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hata mesajı ve göster/gizle state
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // Rate-limit kontrolü
  const [disableLogin, setDisableLogin] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  // Sayfa yüklendiğinde localStorage kontrolü
  useEffect(() => {
    const retryUntil = localStorage.getItem("loginRetryUntil"); // localStorage'dan kalan süreyi al
    if (retryUntil) {
      const remaining = Math.ceil((parseInt(retryUntil) - Date.now()) / 1000);
      if (remaining > 0) {
        // Eğer hâlâ bekleme süresi varsa login devre dışı
        setDisableLogin(true);
        setShowError(true);
        setRemainingSeconds(remaining);

        // Countdown başlat
        const interval = setInterval(() => {
          setRemainingSeconds(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              setDisableLogin(false);
              setShowError(false);
              localStorage.removeItem("loginRetryUntil");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // Süre geçmişse localStorage temizle
        localStorage.removeItem("loginRetryUntil");
      }
    }
  }, []);

  // Form submit fonksiyonu
  const handleSubmit = async () => {
    if (disableLogin) return; // Rate-limit varsa işlem yapma

    setError("");
    setShowError(false);

    // NextAuth login
    const res = await signIn("credentials", { redirect: false, email, password });

    // Rate-limit hatası
    if (res?.error?.includes("Çok fazla giriş denemesi")) {
      const match = res.error.match(/(\d+)\s*saniye/);
      const seconds = match ? parseInt(match[1], 10) : 60;
      const retryUntil = Date.now() + seconds * 1000;

      // Buton devre dışı ve hata göster
      setDisableLogin(true);
      setShowError(true);
      setRemainingSeconds(seconds);
      localStorage.setItem("loginRetryUntil", retryUntil.toString());

      // Countdown başlat
      const interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setDisableLogin(false);
            setShowError(false);
            localStorage.removeItem("loginRetryUntil");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } else if (res?.error) {
      // Diğer hatalar
      setError("Email veya şifre yanlış!");
      setShowError(true);

    } else if (res?.ok) {
      // Başarılı giriş → dashboard'a yönlendir
      // ✅ SessionStorage içine flag koy
      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    }
  };

  return (
    <div style={{
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      padding: "40px 30px",
      paddingBottom: "50px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      width: 360,
      textAlign: "center",
    }}>
      <Box style={{ maxWidth: 300, margin: "auto" }}>
        {(showError || remainingSeconds > 0) && (
          <Notification color="red" onClose={() => setShowError(false)}>
            {disableLogin && remainingSeconds > 0
              ? `Çok fazla giriş denemesi yaptınız. Lütfen ${remainingSeconds} saniye bekleyin.`
              : error
            }
          </Notification>
        )}

        <TextInput
          label="Email"
          placeholder="admin@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          mb="sm"
          styles={{ label: { color: "black", fontWeight: 500 }, input: { color: "black" } }}
          disabled={disableLogin}
        />

        <PasswordInput
          label="Şifre"
          placeholder="admin123"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mb="sm"
          styles={{ label: { color: "black", fontWeight: 500 }, input: { color: "black" } }}
          disabled={disableLogin}
        />

        <Button fullWidth onClick={handleSubmit} disabled={disableLogin}>
          Giriş Yap
        </Button>
      </Box>
    </div>
  );
}
