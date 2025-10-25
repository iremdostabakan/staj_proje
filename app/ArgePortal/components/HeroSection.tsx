'use client';

// Mantine UI bileşenlerini import ediyoruz
import { Container, Title, ThemeIcon, Flex } from '@mantine/core';
// Video ikonunu Tabler Icons'tan import ediyoruz
import { IconVideo } from '@tabler/icons-react';
import { keyframes } from '@emotion/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Bileşenin proplarının tip tanımı
type HeroSectionProps = {
  title?: string;
};

// Ana hero section bileşeni
export default function HeroSection({
  // Başlık için varsayılan değeri belirliyoruz
  title = 'ARGEPORTAL EĞİTİM VİDEOSU',
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
      // `base` mobil cihazlar için, `md` ise daha büyük ekranlar için geçerlidir.
      pt={{ base: 120, md: 160 }}
      pb={{ base: 80, md: 120 }}
       style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(270deg, #a261afff, #29989ca4, #612c75ff, #c07432ff, #ff0000f1, #5fcce7c7)",
        backgroundSize: "1200% 1200%",
        animation: `${gradientAnimation} 40s ease infinite`,
      }}
    > 
      <Container size="lg">
        {/* Girişimcilik temasını yansıtan video ikonu */}
        <ThemeIcon
          variant="light"
          size={80}
          radius="xl"
          c="white"
          mb="xl"
          mt={60}
        >
          <IconVideo style={{ width: 48, height: 48 }} />
        </ThemeIcon>
        {/* Ana başlık */}
        <Title
          order={1}
          // Başlık font boyutunu ekran boyutuna göre ayarlar.
          fz={{ base: 40, sm: 56 }}
          fw={800}
          mb={0}
          c="white"
        >
          {title}
        </Title>
      </Container>

      <div
        style={{
          content: '""',
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
          content: '""',
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


    </Flex>
  );
}
