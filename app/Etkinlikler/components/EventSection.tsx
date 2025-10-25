"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Card,
  Text,
  Title,
  Button,
  Badge,
  Loader,
  Alert,
  Center,
  Image,
  Flex,
  Grid,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

// Etkinlik verisinin tip tanımını yapıyoruz
interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image?: string; // Etkinlik görseli için yeni bir alan ekledik
}

// EventsSection bileşeni, API'den veriyi çekecek ve gösterecek
export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Bileşen yüklendiğinde bir kere çalışacak
    const fetchEvents = async () => {
      try {
        // API'den etkinlik verilerini çekme işlemi
        const response = await fetch("/api/etkinlikler");
        if (!response.ok) {
          throw new Error("Veri çekilirken bir hata oluştu");
        }
        const data: Event[] = await response.json();
        
        // Örnek resim URL'leri ekleyelim. Normalde bunlar veritabanından gelmeli.
        const sampleImages = [
            "https://placehold.co/600x400/29598a/white?text=Yapay+Zeka",
            "https://placehold.co/600x400/5e533e/white?text=Giri%C5%9Fimcilik",
            "https://placehold.co/600x400/282a5a/white?text=Yaz%C4%B1l%C4%B1m",
            "https://placehold.co/600x400/504a40/white?text=Etkinlik+1",
            "https://placehold.co/600x400/a39395/white?text=Etkinlik+2",
        ];

        const eventsWithImages = data.map((event, index) => ({
            ...event,
            image: event.image || sampleImages[index % sampleImages.length],
        }));

        // Tarihe göre sıralama (en yeni etkinlik en üstte)
        const sortedData = eventsWithImages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEvents(sortedData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    fetchEvents();
  }, []); // Boş dizi sayesinde sadece bir kere çalışır

  // Yükleme durumunu göster
  if (loading) {
    return (
      <Center style={{ height: "calc(100vh - 100px)" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // Hata durumunu göster
  if (error) {
    return (
      <Container size="md" my="lg">
        <Alert
          variant="light"
          color="red"
          title="Veri Hatası"
          icon={<IconAlertCircle />}
        >
          Etkinlikler yüklenirken bir sorun oluştu: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" my="lg">
      <Flex direction="column" gap="xl">
        {events.length === 0 ? (
          <Center>
            <Text size="lg" c="dimmed">
              Şu anda gösterilecek bir etkinlik bulunmuyor.
            </Text>
          </Center>
        ) : (
          events.map((event) => (
            <Card
              key={event._id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Grid gutter={{ base: "md", md: "xl" }} align="center">
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <Image
                    src={event.image || "https://placehold.co/600x400/29598a/white?text=Etkinlik"}
                    alt={event.name}
                    radius="md"
                    height={250}
                    fit="cover"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                  <Badge color="blue" variant="light" mb="xs">
                    Etkinlik
                  </Badge>
                  <Title order={2} mb="xs" fw={700}>
                    {event.name}
                  </Title>
                  <Text size="md" c="dimmed" mb="sm">
                    {new Date(event.date).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} - {event.location}
                  </Text>
                  <Text size="sm" lineClamp={3} mb="md">
                    {event.description}
                  </Text>
                  <Button
                    component={Link}
                    href={`/Etkinlikler/${event._id}`}
                    fullWidth={false}
                    radius="md"
                  >
                    Detaylı Bilgi
                  </Button>
                </Grid.Col>
              </Grid>
            </Card>
          ))
        )}
      </Flex>
    </Container>
  );
}



/* Alttaki kodları mongodb eklenmediği için kullanamadım -Şaban */


// "use client";

// import { Card, Image, Text, Group, Badge, SimpleGrid } from "@mantine/core";

// type Etkinlik = {
//   _id: string;
//   title: string;
//   topic?: string;
//   coverImageUrl?: string;
//   date?: string;       // ISO
//   location?: string;
//   createdAt?: string;  // ISO
// };

// export default function EventsSection({ events }: { events: Etkinlik[] }) {
//   const formatDate = (iso?: string) => {
//     if (!iso) return "-";
//     const d = new Date(iso);
//     return new Intl.DateTimeFormat("tr-TR", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(d);
//   };

//   const safeImg = (url?: string) => url && url.length > 0 ? url : "/placeholder-event.jpg";

//   if (!events || events.length === 0) {
//     return <Text>Şu an listelenecek etkinlik bulunmuyor.</Text>;
//   }

//   return (
//     <>
//       <Group justify="space-between" mb="lg">
//         <Text fw={700} size="xl">Eklenen Etkinlikler</Text>
//         <Badge variant="light" size="lg">
//           {events.length} kayıt
//         </Badge>
//       </Group>

//       <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
//         {events.map((ev) => (
//           <Card key={ev._id} radius="md" withBorder shadow="sm">
//             <Card.Section>
//               <Image
//                 src={safeImg(ev.coverImageUrl)}
//                 alt={ev.title}
//                 height={180}
//                 fit="cover"
//               />
//             </Card.Section>

//             <Group justify="space-between" mt="md" mb="xs">
//               <Text fw={600} size="lg">{ev.title}</Text>
//               {ev.topic ? <Badge>{ev.topic}</Badge> : null}
//             </Group>

//             <Text size="sm" c="dimmed">
//               Etkinlik Tarihi: {ev.date ? formatDate(ev.date) : "-"}
//             </Text>
//             <Text size="sm" c="dimmed">
//               Konum: {ev.location || "-"}
//             </Text>
//             <Text size="sm" c="dimmed">
//               Eklenme: {ev.createdAt ? formatDate(ev.createdAt) : "-"}
//             </Text>
//           </Card>
//         ))}
//       </SimpleGrid>
//     </>
//   );
// }
