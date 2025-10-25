"use client"

import { Box, Container, Title, Grid, Card, Text, Group, Stack } from "@mantine/core"
import { IconArrowRight, IconBuildingBank, IconUsers } from "@tabler/icons-react"
import Image from "next/image"
import { useEffect, useState } from 'react';
import AOS from "aos";
import { useMediaQuery } from "@mantine/hooks";

export function ServicesSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    AOS.init({ duration: 800 }); // 800ms animasyon süresi
  }, []);
  return (
    <Box py={80} data-aos="fade-down">
      <Container size="xl">
        <Title order={2} size={40} mb={40} c="rgb(52, 73, 94)" data-aos="fade-down">
          Services
        </Title>

        <Grid mb={60} data-aos="fade-down">
          <Grid.Col span={isMobile ? 12 : 4}>
            <Card h={300} p={0} style={{
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }} data-aos="fade-down" >
              <Box pos="relative" h={180} >
                <Image
                  src="/business-consultation.png"
                  alt="Business Consultation"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box p="md">
                <Text fw={600} mb="xs">
                  Business Development
                </Text>
                <Text size="sm" c="dimmed">
                  Comprehensive business development services including strategic planning and market analysis.
                </Text>
              </Box>
            </Card>
          </Grid.Col>

          <Grid.Col span={isMobile ? 12 : 4}>
            <Card bg="rgb(52, 73, 94)" h={300} p="xl" style={{
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <Stack justify="center" h="100%">
                <Text c="white" fw={600} size="lg" mb="md">
                  Technology Innovation Hub
                </Text>
                <Text c="white" size="sm" mb="xl">
                  State-of-the-art facilities for technology development and innovation projects.
                </Text>
                <Group>
                  <IconArrowRight color="white" size={20} />
                  <Text c="white" size="sm">
                    Learn More
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={isMobile ? 12 : 4}>
            <Card h={300} p={0} style={{
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <Box pos="relative" h={180}>
                <Image src="/research-and-development-lab.png" alt="R&D Laboratory" fill style={{ objectFit: "cover" }} />
              </Box>
              <Box p="md">
                <Text fw={600} mb="xs">
                  Research & Development
                </Text>
                <Text size="sm" c="dimmed">
                  Advanced research facilities and collaborative development programs.
                </Text>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>


      </Container>
    </Box>
  )
}
