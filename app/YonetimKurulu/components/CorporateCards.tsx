"use client";

import { Container, Grid, Card, Title, Text } from "@mantine/core";
import React from "react";

interface CorporateInfoItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface CorporateCardsProps {
  data: CorporateInfoItem[];
}

export function CorporateCards({ data }: CorporateCardsProps) {
  return (
    <Container size="lg" py={80}>
      <Grid gutter="xl" justify="center">
        {data.map(({ title, description, icon: Icon }, index) => (
          <Grid.Col
            key={title}
            span={4}
            style={{
              width: "33.3333%",
              paddingTop: "16px",
            }}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="xl"
              withBorder
              style={{
                height: "400px",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "center",
                gap: 20,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: 8,
                  display: "inline-flex",
                }}
              >
                <Icon size={36} color="rgba(198, 149, 221, 0.71)" />
              </div>

              <Title order={2} mb="sm" style={{ color: "#34495e" }}>
                {title}
              </Title>
              <Text size="lg" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
