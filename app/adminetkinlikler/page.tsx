"use client";
import AdminGuard from "../components/AdminGuard";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import EtkinlikForm from "./components/EtkinlikForm";
import EtkinlikList from "./components/EtkinlikList";
import { Stack, Title, Divider } from "@mantine/core";
import { HeroSection } from "../dashboard/components/HeroSection";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Kullanıcı login değilse yönlendir
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // API çağrısı
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/etkinlikler`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Etkinlikler alınamadı:", err);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Yükleniyorsa spinner veya mesaj göster
  if (status === "loading") return <div>Yükleniyor...</div>;
  if (!session) return null; // artık status "authenticated" veya "unauthenticated"


  return (
    <AdminGuard>
      <Header />
      <HeroSection />
      <EtkinlikForm />
      <Divider my="md" />
      <EtkinlikList events={events} />
      <FooterSection />
    </AdminGuard>
  );
}
