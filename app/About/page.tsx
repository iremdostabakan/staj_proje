"use client";

import { Box } from "@mantine/core";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { AboutHero } from "./components/AboutHero";
import { AboutAccordion } from "./components/AboutAccordion";
import AOS from "aos";
import { useEffect } from "react";
import { keyframes } from "@emotion/react";


const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Header />
      <Box
        py={60}
        style={{
          paddingTop: 100,
          backgroundImage:"linear-gradient(270deg, #a261afff, #29989ca4, #612c75ff, #c07432ff, #ff0000f1, #5fcce7c7)",
           backgroundSize: "1200% 1200%",
    animation: `${gradientAnimation} 40s ease infinite`,
          minHeight: "100vh",
          color: "white",
        }}
      >
        <AboutHero />
        <AboutAccordion />
      </Box>
      <FooterSection />
    </>
  );
}

