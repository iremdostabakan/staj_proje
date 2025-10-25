"use client";
import AdminGuard from "../components/AdminGuard";

import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";

export default function DashboardPage() {
  return (
    <AdminGuard>
      <Header />
      <HeroSection />
      <FooterSection />
    </AdminGuard>
  );
}
