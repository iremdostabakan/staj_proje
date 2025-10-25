"use client";

import { Box, Container } from "@mantine/core";
import { keyframes } from "@emotion/react";
import { LoginYap } from "./loginyap";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export function HeroSection() {
  return (
    <Box
      style={(theme) => ({
        background: "rgb(52, 73, 94)",
        color: theme.white,
        minHeight: "70vh", // Eskiden 100vh idi, kısalttık
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(270deg, #34495e, #1abc9c, #9b59b6, #34495e)",
        backgroundSize: "600% 600%",
        animation: `${gradientAnimation} 20s ease infinite`,
        display: "flex", // Ortalamak için flex
        alignItems: "center",
        justifyContent: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-40%",
          left: "-25%",
          width: "180%",
          height: "200%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
          animation: `${gradientAnimation} 25s ease infinite reverse`,
        },
      })}
    >
      <Container
        size="lg"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginYap />
      </Container>
    </Box>
  );
}
