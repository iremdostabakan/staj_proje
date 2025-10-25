"use client";

import { Container, Grid, Card, Title, Text, Button, Box ,Modal,Stack} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPhone, IconMail } from "@tabler/icons-react";

export function PricingSection() {
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
  fetch("/api/pricing")
    .then((res) => res.json())
    .then((data) => setPricingPlans(data));
}, []);

const handleCall = () => {
    window.location.href = "tel:0274 502 11 61"; // Buraya kendi numaranı yaz
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@dumlupinarteknokent.com"; // Buraya kendi mailini yaz
  };


   return (
    <Container size="lg" py={80}>
      <Title order={1} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
        Ücretlendirmeler
      </Title>
      <Title order={2} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
        Ofis ve Proje Ücretleri
      </Title>
      <Grid gutter="xl" justify="center">
        {pricingPlans.map(({ name, price, features }, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 6 }}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              padding="xl"
              style={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
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
              <Title order={3} mb="xs" c="rgb(52, 73, 94)">
                {name}
              </Title>
              <Text size="xl" fw={700} mb="md" color="teal">
                {price}
              </Text>
              <Box mb="auto" style={{ textAlign: "left" }}>
                {features.map((feature: string, idx: number) => (
                  <Text key={idx} size="md" mb={4} color="dimmed">
                    • {feature}
                  </Text>
                ))}
              </Box>
              <Button
                fullWidth
                mt="md"
                radius="md"
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 45 }}
                onClick={() => setModalOpened(true)}
              >
                Bize Ulaşın
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Modern Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={<Text fw={500} fz="lg" ta="center" c="rgb(52, 73, 94)">İletişim Seçeneği</Text>}
        centered
        overlayProps={{ opacity: 0.55, blur: 3 }}
      >
        <Stack>
          <Button
            fullWidth
            radius="md"
            size="lg"
            variant="gradient"
            gradient={{ from: 'green', to: 'lime', deg: 45 }}
            onClick={handleCall}
          >
           <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
    <IconPhone size={20} />
    Ara
  </Box>
          </Button>
          <Button
            fullWidth
            radius="md"
            size="lg"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
            onClick={handleEmail}
          >
             <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
    <IconMail size={20} />
    E-posta Gönder
  </Box>
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
