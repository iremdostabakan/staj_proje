"use client";

import {
  Container,
  Burger,
  Drawer,
  Group,
  Grid,
  Text,
  Box,
  Anchor,
  TextInput,
  Menu,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import AOS from "aos";
import { useRouter } from 'next/navigation';

export function Header() {
  const [opened, setOpened] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  const [dokumanlarOpen, setDokumanlarOpen] = useState(false);
  const [dilOpen, setDilOpen] = useState(false);

  

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedLanguage, setSelectedLanguage] = useState("TR");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Linkler için harita
  const hrefMap: Record<string, string> = {
    "Hakkımızda": "/About",
    "İş İlanları": "/isilanlari",
    "Firmalar": "firmalar",
    "SSS": "/SSS",
    "İletişim": "/Iletisim",
    "Medya": "/Medya",
    "Ödeme": "/Odeme/login"
  };

  // Dökümanlar menüsü için linkler yaparken yapay zeka ekledi. -Şaban
  // gpt açıklaması:
  // Bu yaklaşımın sağladığı en büyük avantaj, tekrar eden kodların önüne
  // geçilmesidir. Hem masaüstü hem de mobil menüde "Dökümanlar" altındaki 
  // bağlantıları tekrar tekrar yazmak yerine, bu dokumanlarLinks dizisi kullanılır.
   const dokumanlarLinks = [
    { label: "Girişimci Firmalar", href: "/GirisimciFirmalar" },
    { label: "Yardım Dökümanları", href: "/YardimDokumanlari" },
    { label: "Mevzuatlar", href: "/Mevzuatlar" },
    { label: "ARGEPORTAL Eğitim Videosu", href: "/ArgePortal" },
  ];

  // Alt menüler
  const kurumsalLinks = [
    { label: "Hakkımızda", href: "/About" },
    { label: "Yönetim Kurulu", href: "/YonetimKurulu" },
    { label: "Teknokent Yönetimi", href: "/TeknokentYonetim" },
    { label: "Fiyatlandırma Politikamız", href: "/Fiyatlandirma" },
    { label: "Haberler", href: "/News" },
    { label: "Duyurular", href: "/Duyurular" },
    { label: "Etkinlikler", href: "/Etkinlikler" },
  ];

  const mainLinks = [
    "Hakkımızda",
    "Kurumsal",
    "Firmalar",
    "Dökümanlar",
    "İş İlanları",
    "SSS",
    "İletişim",
    "Medya",
    "Ödeme",
    "Dil",
  ];


   return (
    <Box pos="absolute" top={0} left={0} right={0} style={{ zIndex: 10 }}>
      <Box
        bg="rgba(255, 255, 255, 0)"
        py={{ base: 10, md: 16 }}
        px="md"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <Container size="xl" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo ve isim */}
          <Group align="center" gap="sm">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={80} height={80} />
            </Link>
            <Box>
              <Text size="lg" fw={520} c="white">kütahya</Text>
              <Text size="lg" fw={520} c="white">tasarım teknokent</Text>
            </Box>
          </Group>

        
          {/* Masaüstü Menü */}
          {!isMobile ? (
            <Group gap="sm" align="center">
              {mainLinks.map((label) => {
                if (label === "Kurumsal") {
                  return (
                    <Menu key={label} trigger="hover" withArrow openDelay={100} closeDelay={300}>
                      <Menu.Target>
                        <Button variant="subtle" color="white">{label}</Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {kurumsalLinks.map((item) => (
                          <Menu.Item key={item.label} component={Link} href={item.href}>
                            {item.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  );
                } else if (label === "Dökümanlar") {
                  return (
                    <Menu key={label} trigger="hover" withArrow openDelay={100} closeDelay={300}>
                      <Menu.Target>
                        <Button variant="subtle" color="white">{label}</Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {dokumanlarLinks.map((item) => (
                          <Menu.Item key={item.label} component={Link} href={item.href}>
                            {item.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  );
                } else if (label === "Dil") {
                  return (
                    <Menu key={label} trigger="hover" withArrow openDelay={100} closeDelay={300}>
                      <Menu.Target>
                        <Button variant="subtle" color="white">{selectedLanguage}</Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {["TR", "ENG"].map((lang) => (
                          <Menu.Item key={lang} onClick={() => setSelectedLanguage(lang)}>
                            {lang}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  );
                } else {
                  return (
  <Anchor key={label} component={Link} href={hrefMap[label] || "#"} c="white" td="none">
    {label}
  </Anchor>
);
                }
              })}

              {/* Arama */}
              <TextInput
                placeholder="Ara..."
                leftSection={<IconSearch size={16} />}
                radius="xl"
                size="sm"
                styles={{ input: { backgroundColor: "rgba(255,255,255,0.8)", height: 28, fontSize: 13 } }}
              />
            </Group>
          ) : (
            <Burger opened={opened} onClick={() => setOpened(!opened)} color="white" size="sm" />
          )}
        </Container>

        
        {/* Mobil Drawer */}
<Drawer
  opened={opened}
  onClose={() => {
    setOpened(false);
    setKurumsalOpen(false);
    setDokumanlarOpen(false);
    setDilOpen(false); // dil için yeni state
  }}
  padding="md"
  size="md"
  position="right"
  styles={{
    root: {},
    body: {
      backgroundColor: "white",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
  }}
>
  <TextInput
    placeholder="Ara..."
    rightSection={<IconSearch size={16} />}
    radius="xl"
    size="md"
    mb="md"
    styles={{
      input: {
        width: "100%",
        fontSize: 13,
        backgroundColor: "#f5f5f5",
      },
    }}
  />

  {mainLinks.map((label) => {
    const isKurumsal = label === "Kurumsal";
    const isDokumanlar = label === "Dökümanlar";
    const isDil = label === "Dil";

    const subMenu = isKurumsal
      ? kurumsalLinks
      : isDokumanlar
      ? dokumanlarLinks
      : isDil
      ? ["TR", "ENG"].map((lang) => ({ label: lang, href: "#" }))
      : [];

    const isOpen = isKurumsal
      ? kurumsalOpen
      : isDokumanlar
      ? dokumanlarOpen
      : isDil
      ? dilOpen
      : false;

    const setOpen = isKurumsal
      ? setKurumsalOpen
      : isDokumanlar
      ? setDokumanlarOpen
      : isDil
      ? setDilOpen
      : () => {};

    return (
      <Box key={label} mb="sm">
        <Button
          fullWidth
          variant="subtle"
          onClick={() => (isKurumsal || isDokumanlar || isDil ? setOpen(!isOpen) : undefined)}
          component={!isKurumsal && !isDokumanlar && !isDil ? Link : undefined}
          href={!isKurumsal && !isDokumanlar && !isDil ? hrefMap[label] ?? "/" : "#"}
          styles={{
            root: {
              justifyContent: "flex-start",
              color: "rgb(52, 73, 94)",
              fontSize: 16,
              fontWeight: 500,
              transition: "all 0.3s",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
            },
          }}
        >
          {label}
        </Button>

        {/* Alt menü */}
        {subMenu.length > 0 && isOpen && (
          <Box
            ml={3}
            mt="xs"
            mb="sm"
            style={{
              borderLeft: "2px solid rgba(52,73,94,0.2)",
              paddingLeft: 10,
            }}
          >
            {subMenu.map((item) => (
              <Anchor
  key={item.label}
  component={Link} // <-- BU SATIRI EKLEYİN
  href={item.href}
  td="none"
  // ...
>
  {item.label}
</Anchor>
            ))}
          </Box>
        )}
      </Box>
    );
  })}
</Drawer>

      </Box>
    </Box>
  );
  
}
