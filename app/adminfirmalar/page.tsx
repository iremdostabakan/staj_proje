"use client";
import FirmaForm from "./components/FirmaForm";
import FirmaList from "./components/FirmaList";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { Loader, Center, Divider } from "@mantine/core";

export default function DashbordPage1() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.replace("/login"); // ✅ direkt login'e at
    } else {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  //Oturum doğrulaması tamamlandığında isChecking = false olur.
  if (isChecking || status === "loading" || !session) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }
  return (
    <>
      <title>Firmalar</title>
      <Header />

      <HeroSection />

      <FirmaForm />
      <Divider my="md" />
      <FirmaList />
      <FooterSection />
    </>
  );
}
