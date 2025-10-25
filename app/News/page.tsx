"use client"
import { useEffect, useState } from "react";
import { Card, Image, Text,Stack,Button,Group } from "@mantine/core";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import Link from "next/link";
import { useRouter } from "next/navigation";




type Haber = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export default function NewsPage({ haberler: fetchedHaberler }: { haberler: Haber[] }) {
  const [haberler, setHaberler] = useState<Haber[]>(fetchedHaberler || []); // ✅ tip verdik
  const [currentPage, setCurrentPage] = useState(1); // mevcut sayfa
const [haberPerPage] = useState(5); // sayfa başına gösterilecek haber sayısı

   const router = useRouter();
useEffect(() => {
  const scrollY = new URLSearchParams(window.location.search).get("scroll");
  if (scrollY) window.scrollTo(0, parseInt(scrollY));
}, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/haberler");
        const data: Haber[] = await res.json();
        setHaberler(data);
      } catch (error) {
        console.error("Haberler alınamadı:", error);
      }
    }
    fetchData();
  }, []);


const indexOfLastHaber = currentPage * haberPerPage;
const indexOfFirstHaber = indexOfLastHaber - haberPerPage;
const currentHaberler = haberler.slice(indexOfFirstHaber, indexOfLastHaber);



  return (
    <>
    <Header/>
    <HeroSection/>
   <Stack gap="lg" mt={50} px="sm">
  {currentHaberler.map((haber, i) => (
    <Card key={i} shadow="sm" padding="lg" radius="md" withBorder  style={{
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  }}
 onMouseEnter={(e) => {
    const card = e.currentTarget as HTMLDivElement;
    card.style.transform = "scale(1.03)";
    card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
    const img = card.querySelector("img");
    if (img) img.style.transform = "scale(1.1)"; // resim zoom
  }}
  onMouseLeave={(e) => {
    const card = e.currentTarget as HTMLDivElement;
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    const img = card.querySelector("img");
    if (img) img.style.transform = "scale(1)";
  }}>
      <Group align="flex-start" gap="md" style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              className="news-card">
        {/* Resim solda */}
        <Image
          src={haber.image}
          alt={haber.title}
           radius="md"
           w={300}   // genişlik
           h={200}   // yükseklik
           fit="cover" 
            style={{
               flexShrink: 0,
        transition: "transform 0.3s", // resim zoom için
      }}
       className="news-image"
        />

        {/* Başlık ve açıklama sağda */}
        <Stack gap="xs" style={{ flex: 1, position: "relative" }}>
          <Text fw={600} size="xl"    style={{ lineHeight: 1.2 }}>
            {haber.title}
          </Text>
          <Text size="md" c="dimmed" style={{
          display: "-webkit-box",
          WebkitLineClamp: 3, // uzun metni sınırla
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
             {haber.description.length > 100
              ? haber.description.slice(0, 100) + "..."
              : haber.description}
          </Text>
          <div style={{ marginTop: "auto" }}>
 <Button
    component={Link}
    href={`/News/${haber._id}`}
    size="sm"
    variant="gradient"
     gradient={{ from: "indigo", to: "cyan" }}
    onClick={() =>
    router.push(`/News/${haber._id}?scroll=${window.scrollY}`)
  }
  >
    Haberi Oku
  </Button>
</div>
        </Stack>
      </Group>
    </Card>
  ))}
</Stack>
<div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap",  gap: 8, marginTop: 20 }}>
  {Array.from({ length: Math.ceil(haberler.length / haberPerPage) }, (_, i) => (
    <Button
      key={i}
      variant={currentPage === i + 1 ? "gradient" : "outline"}
      gradient={{ from: "indigo", to: "cyan" }}
      radius="xl"
      size="xs"
      style={{ margin: "0 4px" }}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </Button>
  ))}
</div>

    <FooterSection/>
    </>
  );
}
