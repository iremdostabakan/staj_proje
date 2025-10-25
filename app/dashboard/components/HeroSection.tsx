"use client";

import { Box, Container, SimpleGrid, Paper, Text } from "@mantine/core";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const CARD_HEIGHT = 150; // Hepsi eşit yükseklik

export function HeroSection() {
  const router = useRouter();

  const ActionCard = ({
    label,
    onClick,
  }: {
    label: string;
    onClick: () => void;
  }) => (
    <Paper
      radius="md"
      shadow="md"
      p="xl"
      withBorder
      onClick={onClick}
      style={{
        height: CARD_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
      }
    >
      <Text size="xl" fw={700} c="white">
        {label}
      </Text>
    </Paper>
  );

  return (
    <Box
      style={(theme) => ({
        background: "rgb(52, 73, 94)",
        color: theme.white,
        padding: `calc(${theme.spacing.xl} * 4)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(270deg, #34495e, #1abc9c, #9b59b6, #34495e)",
        backgroundSize: "600% 600%",
        animation: `${gradientAnimation} 20s ease infinite`,
        "&::before": {
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
        },
      })}
    >
      <Container
        size="lg"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "110px",
        }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          <ActionCard
            label="Firma İşlemleri"
            onClick={() => router.push("/adminfirmalar")}
          />
          <ActionCard
            label="Etkinlikler"
            onClick={() => router.push("/adminetkinlikler")}
          />
          <ActionCard
            label="Haber İşlemleri"
            onClick={() => router.push("/haberler")}
          />
          <ActionCard
            label="Çıkış"
            onClick={() => signOut({ callbackUrl: "/login" })}
          />
          {/* Yeni 4 başlık */}
          <ActionCard
            label="Ödeme İşlemleri"
            onClick={() => router.push("/adminOdemeler")}
          />
          <ActionCard
            label="Duyurular"
            onClick={() => router.push("/dashboard")}
          />
          <ActionCard
            label="Çalışanlar"
            onClick={() => router.push("/dashboard")}
          />
          <ActionCard
            label="Ayarlar"
            onClick={() => router.push("/dashboard")}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
