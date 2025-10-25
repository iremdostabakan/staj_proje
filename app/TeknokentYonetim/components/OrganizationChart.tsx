"use client"

import { Box, Card, Text, Avatar, Group, Stack, SimpleGrid, Title } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { personelVerisi, type PersonelTipi } from "@/TeknokentYonetim/data/personel"

function PersonCard({ person, size = "md" }: { person: PersonelTipi; size?: "sm" | "md" | "lg" }) {
  const avatarSize = size === "lg" ? 120 : size === "md" ? 100 : 80
  const nameSize = size === "lg" ? "lg" : size === "md" ? "md" : "sm"
  const titleSize = size === "lg" ? "sm" : "xs"

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "visible",
      }}
    >
      <Card.Section>
        <Group justify="center" mt="md">
          <Avatar
            src={person.resim}
            size={avatarSize}
            radius="50%"
            style={{
              border: `4px solid ${person.cerceve_rengi}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </Group>
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Text fw={600} size={nameSize} ta="center">
          {person.ad}
        </Text>
        <Text size={titleSize} c="dimmed" ta="center">
          {person.pozisyon}
        </Text>
      </Stack>
    </Card>
  )
}

function ConnectionLine({ vertical = false, horizontal = false }) {
  if (vertical) {
    return (
      <Box
        style={{
          width: "2px",
          height: "40px",
          backgroundColor: "#dee2e6",
          margin: "0 auto",
        }}
      />
    )
  }

  if (horizontal) {
    return (
      <Box
        style={{
          height: "2px",
          width: "100%",
          backgroundColor: "#dee2e6",
          margin: "20px 0",
        }}
      />
    )
  }

  return null
}

export function OrganizationChart() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const coordinatorCols = isMobile
    ? Math.min(2, personelVerisi.koordinator.length)
    : Math.min(4, personelVerisi.koordinator.length)
  const supportCols = isMobile
    ? Math.min(2, personelVerisi.destek_personeli.length)
    : Math.min(4, personelVerisi.destek_personeli.length)

  return (
    <Stack gap="xl" align="center">
      {/* CEO Section */}
      {personelVerisi.ceo.length > 0 && (
        <>
          <Title order={2} style={{ color: "rgb(52, 73, 94)" }} ta="center"> 
            CEO
          </Title>
          <SimpleGrid
            cols={isMobile ? Math.min(2, personelVerisi.ceo.length) : Math.min(4, personelVerisi.ceo.length)}
            spacing="lg"
          >
            {personelVerisi.ceo.map((ceo: PersonelTipi) => (
              <PersonCard key={ceo.id} person={ceo} size="lg" />
            ))}
          </SimpleGrid>
        </>
      )}

      {/* Connection line from CEO to Coordinators */}
      {personelVerisi.ceo.length > 0 && personelVerisi.koordinator.length > 0 && <ConnectionLine vertical />}

      {/* Coordinators Section */}
      {personelVerisi.koordinator.length > 0 && (
        <>
          <Title order={2} style={{ color: "rgb(52, 73, 94)" }} ta="center">
            Koordinatörler
          </Title>
          <Box w="100%" style={{ position: "relative" }}>
            <ConnectionLine horizontal />
            <SimpleGrid cols={coordinatorCols} spacing="lg" mt="xl">
              {personelVerisi.koordinator.map((koordinator: PersonelTipi) => (
                <Box key={koordinator.id} style={{ position: "relative" }}>
                  <PersonCard person={koordinator} size="md" />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}

      {/* Connection lines to support staff */}
      {personelVerisi.koordinator.length > 0 && personelVerisi.destek_personeli.length > 0 && (
        <SimpleGrid cols={coordinatorCols} spacing="lg" w="100%">
          {personelVerisi.koordinator.map((_: PersonelTipi, index: number) => (
            <ConnectionLine key={index} vertical />
          ))}
        </SimpleGrid>
      )}

      {/* Support Staff Section */}
      {personelVerisi.destek_personeli.length > 0 && (
        <>
          <Title order={2} style={{ color: "rgb(52, 73, 94)" }} ta="center">
            Destek Personeli
          </Title>
          <SimpleGrid cols={supportCols} spacing="lg" w="100%">
            {personelVerisi.destek_personeli.map((destek: PersonelTipi) => (
              <PersonCard key={destek.id} person={destek} size="sm" />
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  )
}
