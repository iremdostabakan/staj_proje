'use client'
import { Title,Container, Grid, SimpleGrid, Skeleton,Flex, Card, Image,Text, Center,GridColProps } from '@mantine/core';
import { IconFlare, IconProgressCheck, IconCopyCheck,IconFilterCheck } from '@tabler/icons-react';
import { Group } from 'lucide-react';
const PRIMARY_COL_HEIGHT = '400px';
import { useEffect, useState } from 'react';
import AOS from "aos";

export function BasvuruSection() {
  useEffect(() => {
        AOS.init({ duration: 800 }); // 800ms animasyon süresi
      }, []);
   return (
    <Container my="xl" px="md" size="xl" data-aos="fade-down">
      <Flex justify="center" align="center">
        <Title order={1} size={38} m={10} c="rgb(52, 73, 94)" data-aos="fade-down">
          Proje Başvuru Sürecimiz
        </Title>
      </Flex>

      <Grid>
        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconFlare color="rgba(182, 180, 101, 1)" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                Proje Başvurusu
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                Proje başvuru süreciniz ön başvurunuz ile başlar.
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconFilterCheck color="rgba(182, 180, 101, 1)" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                Yönetim Değerlendirmesi
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                Ön başvurusu alınan proje değerlendirilmesi sonucu olumlu olursa projenizin detaylı olarak açıklanması istenir.
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconCopyCheck color="rgba(182, 180, 101, 1)" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                Hakem Değerlendirmesi
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                Detaylı olarak açıklanan proje hakemlere sevk edilir. Hakem değerlendirmesi olumlu projeler yönetim kuruluna sevk edilir.
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconProgressCheck color="rgba(182, 180, 101, 1)" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={640} size="xl" mt="md" color="rgb(52, 73, 94)">
                Yönetim Kurulu Onayı
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                Hakem değerlendirmesi olumlu olan projeleri son olarak yönetim kurulu değerlendirerek nihai karar verilir.
              </Text>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}