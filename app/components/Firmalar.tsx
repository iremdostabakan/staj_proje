"use client";

import { Container, Title, Text, Stack } from "@mantine/core";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FirmaTipi = {
  id: string;
  ad: string;
  logo: string;
  kurucular?: string[];
  hakkimizda?: string; 
  iletisim?: string;
};


export default function FirmalarSection() {
  const [firmalar, setFirmalar] = useState<FirmaTipi[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
    fetch("/api/firmalar")
      .then((res) => res.json())
      .then((data) => setFirmalar(data))
      .catch((err) => console.error(err));
  }, []);

  if (!firmalar.length) return null;

  return (
    <Container my="xl" size="xl">
      <Title order={2} size={38} m={43} ta="center" mb="lg" c="rgb(52, 73, 94)">
        Firmalar
      </Title>

      <div className="firmalarSwiper" style={{ minHeight: isMobile ? 200 : 300 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={2000}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 5, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
          style={{ minHeight: 300 }} 
        >
          {firmalar.map((firma) => (
            <SwiperSlide key={firma.id}>
              <a
                href={firma.iletisim}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
              >
                <Image
                  src={firma.logo||"/placeholder.svg"}
                  alt={firma.ad}
                  width={120}
                  height={120}
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    border: "2px solid #ddd",
                    padding: "5px",
                    backgroundColor: "#fff",
                  }}
                />
                <Text ta="center" c="rgb(52,73,94)" fw={600} fz={isMobile ? 12 : 14}>
                  {firma.ad}
                </Text>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}
