"use client";

import { Container, Grid, Card, Text, Title } from "@mantine/core";
import { Image as MantineImage } from "@mantine/core";

interface BoardMember {
  name: string;
  position: string;
  image: string;
}

interface BoardMembersProps {
  members: BoardMember[];
}

export function BoardMembers({ members }: BoardMembersProps) {
  return (
    <Container size="lg" style={{ padding: "60px 0" }}>
      <Title order={1} ta="center" c="rgb(52, 73, 94)" fw={700} py={40}>
        Yönetim Kurulu
      </Title>
      <Grid gutter="xl">
        {members.map((member, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              shadow="md"
              radius="xl"
              withBorder
              style={{
                textAlign: "center",
                height: 500,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MantineImage
                src={member.image}
                alt={member.name}
                radius="lg"
                height={300}
                fit="cover"
                style={{
                  flexShrink: 0,
                  objectFit: "cover",
                  maxHeight: "300px",
                  width: "100%",
                }}
              />
              <div style={{ padding: "16px", flexGrow: 1 }}>
                <Text fw={600} size="lg" mt="md">
                  {member.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {member.position}
                </Text>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
