import { Container, Title } from "@mantine/core"
import { OrganizationChart } from "@/TeknokentYonetim/components/OrganizationChart"
import { Header } from "../components/Header"
import { FooterSection } from "../components/FooterSection"
import { HeroSection } from "./components/HeroSection";


export default function TeknokentYonetimPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <OrganizationChart />
      <FooterSection />
    </>
  )
}