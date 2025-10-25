'use client';

import { Box, Container, Title, Text, ThemeIcon, Flex } from '@mantine/core';
import { IconGavel } from '@tabler/icons-react';
import { keyframes } from '@emotion/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Bileşenin proplarının tip tanımı
type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  bg?: string;
};

// Ana hero section bileşeni
export default function HeroSection({
  title = 'Mevzuatlar',
  subtitle = 'İlgili tüm dokümanlara tek yerden erişin',
}: HeroSectionProps) {
  return (
    // Mantine'ın Flex bileşenini kullanarak flexbox düzenini Mantine prop'larıyla oluşturuyoruz.
    <Flex
      component="section"
      c="white"
      // Dikey hizalama ve metin hizalaması
      direction="column"
      align="center"
      justify="center"
      ta="center"
      // Header ile çakışmayı önlemek için üstten ve dikeyden dolgu ayarları.
      // py={{ base: 'xl', md: 80 }} prop'unu kaldırıp yerine dikeyde daha iyi görünen pt ve pb prop'u ekledim.
      // Dikey dolguyu artırarak header ile çakışmayı önledik.
      pt={{ base: 120, md: 160 }}
      pb={{ base: 80, md: 120 }}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(270deg, #a261afff, #29989ca4, #612c75ff, #c07432ff, #ff0000f1, #5fcce7c7)",
        backgroundSize: "1200% 1200%",
        animation: `${gradientAnimation} 40s ease infinite`,
      }}
    >


 <div
        style={{
          position: "absolute",
          top: "-40%",
          left: "-25%",
          width: "180%",
          height: "180%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
          animation: `${gradientAnimation} 25s ease infinite reverse`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%)",
          filter: "blur(200px)",
          zIndex: 0,
          animation: `${gradientAnimation} 35s ease infinite`,
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        {/* Hukuk temasını yansıtan ikon */}
        <ThemeIcon
          variant="light"
          size={80}
          radius="xl"
          c="white"
          mb="xl"
          mt={60}
        >
          <IconGavel style={{ width: 48, height: 48 }} />
        </ThemeIcon>
        {/* Ana başlık */}
        <Title
          order={1}
          fz={{ base: 40, sm: 56 }}
          fw={800}
          mb={16}
          c="white"
        >
          {title}
        </Title>
        {/* Alt başlık */}
        <Text
          c="white"
          fz={{ base: 'md', sm: 'lg' }}
          maw={720}
          mx="auto"
        >
          {subtitle}
        </Text>
      </Container>
    </Flex>
  );
}
