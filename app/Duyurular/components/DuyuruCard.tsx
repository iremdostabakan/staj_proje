"use client"

import { Card, AspectRatio, Image, Text, Box } from "@mantine/core"
import { Duyuru } from "../data/duyurular"

interface DuyuruCardProps {
  duyuru: Duyuru
}

export function DuyuruCard({ duyuru }: DuyuruCardProps) {
  const handleCardClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Card
      key={duyuru.id}
      radius="md"
      p={0}
       style={(theme) => ({
    border: "1px solid transparent",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease",
    maxWidth: 600,
    margin: "auto",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)", // yukarı kaydır ve hafif büyüt
      boxShadow: theme.shadows.md, // gölge efekti
      borderColor: theme.colors.blue[4],
    },
  })}
  onClick={() => handleCardClick(duyuru.link)}
    >
      <AspectRatio ratio={16 / 9}>
        <Image
          src={duyuru.image || "/placeholder.svg"}
          alt={duyuru.title}
          style={{ objectFit: "cover" }}
          fallbackSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80"
        />
      </AspectRatio>

      <Box p="sm">
        <Text size="xs" color="dimmed" style={{ textTransform: "uppercase" }}>
          {duyuru.date}
        </Text>
        <Text size="md" fw={600} mt={4}>
          {duyuru.title}
        </Text>
      </Box>
    </Card>
  )
}
