"use client"

import { Box, Container, Title, Button, Group, Stack } from "@mantine/core"
import Image from "next/image"
import { Transition } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMediaQuery } from "@mantine/hooks";


export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");


  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Box pos="relative" h={1000}>
      <Image src="/teknokent1.jpg" alt="University Campus" fill style={{ objectFit: "cover" }} priority />
      <Box
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
        }}
      />
      <Container size="xl" h="100%" pos="relative">


        <Group justify="space-between" h="100%" gap="xl" p={200} align="center" wrap="wrap" style={{ rowGap: 40 }}>

          {isDesktop && (
            <Transition mounted={visible} transition="scale" duration={600} timingFunction="ease">
              {(styles) => (
                <Box style={styles}>
                  <Image src="/logo.png" alt="Teknokent Logo" width={200} height={200} style={{ maxWidth: "100%", height: "auto" }} />
                </Box>
              )}
            </Transition>)}


          <Transition
            mounted={visible}
            transition="fade"
            duration={600}
            timingFunction="ease"
          >
            {(styles) => (
              <Box style={styles}>
                <Title order={1} size={70} c="white" fw={700} style={{
                  lineHeight: 1.1,
                  fontSize: "clamp(32px, 6vw, 70px)",
                }}>
                  Kütahya
                </Title>
                <Title order={1} size={70} c="white" fw={700} style={{
                  lineHeight: 1.1,
                  fontSize: "clamp(32px, 6vw, 70px)",
                }}>
                  Tasarım Teknokent
                </Title>
              </Box>
            )}
          </Transition>

        </Group>


      </Container>
    </Box>
  )
}
