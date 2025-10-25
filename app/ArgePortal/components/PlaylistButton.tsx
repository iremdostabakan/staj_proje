'use client';

// Mantine UI'dan gerekli bileşenleri import ediyoruz
import { Container, Center, Button } from '@mantine/core';

export default function PlaylistButton() {
  // Oynatma listesinin URL'sini bir değişkende tanımlıyoruz
  const playlistUrl = "https://www.youtube.com/playlist?list=PLM3e66fhCafo1fuG_0mj0sHD-UunWXuaR";

  return (
    // İçeriği ortalamak için Center bileşenini kullanıyoruz
    // minHeight özelliğini kaldırarak boşluğu azalttık
    <Center style={{ padding: '20px' }}>
      <Container size="sm">
        <Button
          component="a" // Butonu bir <a> etiketi gibi davranacak şekilde ayarlıyoruz
          href={playlistUrl} // Tıklandığında gidilecek URL
          target="_blank" // Linkin yeni bir sekmede açılmasını sağlar
          rel="noopener noreferrer" // Güvenlik için en iyi uygulama
          size="lg" // Büyük buton boyutu
          variant="filled" // Butonun dolu renkte olmasını sağlar
          color="red" // YouTube rengine yakın bir renk
          // Mobil uyumluluk için genişliği tüm ekranı kaplayacak şekilde ayarlıyoruz
          fullWidth
        >
          Tüm Eğitim Videoları İçin Tıklayın
        </Button>
      </Container>
    </Center>
  );
}
