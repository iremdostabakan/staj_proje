import React from 'react';
import { Container, Stack, Title, Text, Paper, List, ThemeIcon, Divider } from '@mantine/core';
import { IconCircle } from '@tabler/icons-react';

export default function FaaliyetAdimlari() {
  return (
    <Container size="xl" py="xl">
      <Paper shadow="lg" p="xl" radius="xl" bg="gray.0">
        <Stack gap="xl">
          {/* Ana Başlık */}
          <Title order={1} fw={700} style={{ textAlign: 'center' }} c="rgb(52, 73, 94)">
            Girişimci Firma Süreç Faaliyet Adımları
          </Title>
          <Text size="lg" >
            Girişimci firma olarak ARGEPORTAL sistemine giriş yapıldıktan sonra,
          </Text>

          {/* FİRMA MENÜSÜ */}
          <Paper shadow="sm" p="md" radius="md" bg="gray.1">
            <Title order={3} mb="md" c="rgb(52, 73, 94)">
              FİRMA MENÜSÜ İÇERİSİNDE YER ALAN;
            </Title>
            <List spacing="sm" size="sm" icon={<ThemeIcon color="blue" size={20} radius="xl"><IconCircle size={12} /></ThemeIcon>}>
              <List.Item>
                <Text>
                  <strong>Firma Tanım Kartı:</strong> Alanı içinde yer alan bilgilerin kontrolünü ve güncellenmesi gereken alanların güncellenmesini gerçekleştiriniz.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>Firma Yetkili Tanım Kartı:</strong> Bölümünden firmanızda görev alan yetkililerin bilgilerini kayıt ediniz...
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>Firma Ortakları Tanım Kart:</strong> Bölümünden şahıs, şirket olarak kurucu ortak ve akademisyen ortaklarınızın bilgilerini kontrol edip güncelleyebilirsiniz...
                </Text>
                <List withPadding spacing="xs" size="sm" mt="xs">
                  <List.Item>
                    <Text><strong>Alt liste örneği:</strong> Detaylar burada yer alabilir.</Text>
                  </List.Item>
                </List>
              </List.Item>
            </List>
          </Paper>

          {/* PERSONEL MENÜSÜ */}
          <Paper shadow="sm" p="md" radius="md" bg="gray.1">
            <Title order={3} mb="md" c="rgb(52, 73, 94)">
              PERSONEL MENÜSÜ İÇERİSİNDE YER ALAN;
            </Title>
            <List spacing="sm" size="sm" icon={<ThemeIcon color="teal" size={20} radius="xl"><IconCircle size={12} /></ThemeIcon>}>
              <List.Item>
                <Text><strong>Personel Tanım Kartı:</strong> Bölümünden firma ve projenizde görev alacak personellerin girişlerini yapabilirsiniz...</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Lisansüstü Eğitim İstisna Talep Formu:</strong> Bölümünden yüksek lisans ve doktora personeli için talep yapabilirsiniz...</Text>
              </List.Item>
            </List>
          </Paper>

          {/* Diğer bölümler için aynı mantıkla devam edebilirsiniz */}
          <Paper shadow="sm" p="md" radius="md" bg="gray.1">
            <Title order={3} mb="md" c="rgb(52, 73, 94)">GÖREVLER BÖLÜMÜNDEN;</Title>
            <List spacing="sm" size="sm" icon={<ThemeIcon color="grape" size={20} radius="xl"><IconCircle size={12} /></ThemeIcon>}>
              <List.Item>
                <Text><strong>Proje İlerleme Bilgileri Kartı:</strong> Dönem bazlı faaliyetleri tanımlayabilirsiniz...</Text>
              </List.Item>
            </List>
          </Paper>

          {/* Diğer bölümler: ARAÇLAR ve AYARLAR */}
          <Paper shadow="sm" p="md" radius="md" bg="gray.1">
            <Title order={3} mb="md" c="rgb(52, 73, 94)">ARAÇLAR BÖLÜMÜNDEN</Title>
            <List spacing="sm" size="sm" icon={<ThemeIcon color="orange" size={20} radius="xl"><IconCircle size={12} /></ThemeIcon>}>
              <List.Item>
                <Text><strong>Destek Talebi:</strong> Talep, şikayet, öneri iletebilirsiniz.</Text>
              </List.Item>
            </List>
          </Paper>

          <Paper shadow="sm" p="md" radius="md" bg="gray.1">
            <Title order={3} mb="md" c="rgb(52, 73, 94)">AYARLAR BÖLÜMÜNDEN</Title>
            <List spacing="sm" size="sm" icon={<ThemeIcon color="red" size={20} radius="xl"><IconCircle size={12} /></ThemeIcon>}>
              <List.Item>
                <Text><strong>Firma Güvenli İp Listesi:</strong> IP bazlı kullanıcı girişi yapabilirsiniz.</Text>
              </List.Item>
            </List>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
