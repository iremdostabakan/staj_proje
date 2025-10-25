"use client";

import {
  Box,
  Button,
  Title,
  Center,
  Flex,
  Loader,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { DuyuruCard } from "./DuyuruCard";
import { useEffect, useState } from "react";
import { mockDuyurular, Duyuru } from "../data/duyurular";

export function DuyurularPreview() {
  const [duyurular, setDuyurular] = useState<Duyuru[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDuyurular() {
      try {
        const data: Duyuru[] = mockDuyurular;
        setDuyurular(data.slice(0, 4));
      } catch (err) {
        console.error("Duyurular alınamadı:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDuyurular();
  }, []);

  if (loading) {
    return (
      <Center py="xl">
        <Loader color="blue" size="lg" />
      </Center>
    );
  }

  if (!duyurular.length) {
    return (
      <Center py="xl">
        <Text c="dimmed">Henüz duyuru bulunmuyor.</Text>
      </Center>
    );
  }

  return (
    <Box py="xl">
      <Flex justify="center" align="center" direction="column">
        <Title order={1} size={38} m={10} c="rgb(52, 73, 94)" data-aos="fade-down">
          Duyurular
        </Title>

        <Flex
          wrap="wrap"
          justify="center"
          gap="lg"
          style={{ width: '100%' }}
        >
          {duyurular.map((duyuru) => (
            <Box
              key={duyuru.id}
              style={{
                flex: '1 1 calc(50% - 20px)', // büyük ekranda iki yan yana
                maxWidth: 600,
                minWidth: 280, // küçük ekranlar için
                marginBottom: 20,
              }}
            >
              <DuyuruCard duyuru={duyuru} />
            </Box>
          ))}
        </Flex>

        <Center mt="xl">
          <Button component={Link} href="/Duyurular" variant="outline" size="md">
            Daha Fazla Duyuru Göster
          </Button>
        </Center>
      </Flex>
    </Box>
  );
}
