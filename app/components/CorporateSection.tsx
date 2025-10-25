"use client"

import { Box, Container, Title, Grid, Card, Text, Stack } from "@mantine/core"
import Link from "next/link"
import { useEffect } from 'react';
import AOS from "aos";
import { useMediaQuery } from "@mantine/hooks";
import { IconUsers, IconCalendarEvent, IconCurrencyDollar } from '@tabler/icons-react';
import { keyframes } from '@emotion/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export function CorporateSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => { AOS.init({ duration: 800 }); }, []);

  const cards = [
    { title: "Yönetim Kurulu", subtitle: "Firmamızın lider ekibiyle tanışın", icon: <IconUsers size={48} />, link: "/YonetimKurulu" },
    { title: "Etkinlikler", subtitle: "Güncel ve yaklaşan etkinliklerimiz", icon: <IconCalendarEvent size={48} />, link: "/Etkinlikler" },
    { title: "Fiyatlandırma Politikamız", subtitle: "Hizmetlerimiz ve fiyat detayları", icon: <IconCurrencyDollar size={48} />, link: "/Fiyatlandirma" },
  ];

  return (
    <Box py={isMobile?40:80} data-aos="fade-down">
      <Container size="xl" style={{ maxWidth: isMobile ? "95%" : "80%", margin: "auto" }}>
        <Title order={2} size={isMobile ? 28 : 40} mb={isMobile ? 20 : 40} c="rgb(52, 73, 94)">
          Kurumsal
        </Title>

        <Grid gutter={isMobile?"md":"xl"}>
          {cards.map((card, idx) => (
            <Grid.Col span={isMobile ? 12 : 4} key={idx}>
              <Link href={card.link} style={{ textDecoration: "none" }}>
                <Card
                  h={isMobile ? 180 : 220}
                  p={isMobile ? "md" : "xl"}
                  style={{
                    transition: "transform 0.4s ease, box-shadow 0.4s ease, background 0.6s ease",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: 24,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    backgroundImage: "linear-gradient(135deg, rgba(184, 184, 108, 0.85), rgba(124, 123, 70, 0.84), rgba(77, 75, 6, 0.62))",
                    backgroundSize: "200% 200%",
                    color: "white",
                    animation: `${gradientAnimation} 10s ease infinite`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                  }}
                >
                  <Stack justify="center" align="center" h="100%">
                    <Box style={{ color: "white" }}>
                      {card.icon}
                    </Box>
                    <Text fw={600} ta="center" fz={isMobile ? 16 : 20}>
                      {card.title}
                    </Text>
                    <Text size={isMobile ? "xs" : "sm"} ta="center">
                      {card.subtitle}
                    </Text>
                  </Stack>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
