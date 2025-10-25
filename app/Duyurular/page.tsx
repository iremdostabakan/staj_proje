// Bu sayfa sunucu tarafında render edilebilir, bu yüzden "use client" zorunlu değil.
import { Container, SimpleGrid, Title } from "@mantine/core"
import { DuyuruCard } from "./components/DuyuruCard"
import { mockDuyurular } from "./data/duyurular"
import { Header } from "../components/Header"
import { FooterSection } from "../components/FooterSection"
import { DuyurularHero } from "./components/DuyurularHero"




export default function TumDuyurularPage() {
  return (
    <>
      <Header />
      <DuyurularHero />
      <Container py="xl" size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
          {mockDuyurular.map((duyuru) => (
            <DuyuruCard key={duyuru.id} duyuru={duyuru} />
          ))}
        </SimpleGrid>
      </Container>
      <FooterSection />
    </>
  );
}