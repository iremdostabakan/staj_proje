"use client";

import { Box, Container, Text } from "@mantine/core";
import { keyframes } from '@emotion/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export function HeroSection() {
  return (
    <Box
      style={(theme) => ({
        background: 'rgb(52, 73, 94)',
        color: theme.white,
        padding: `calc(${theme.spacing.xl} * 6)`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage:
  "linear-gradient(270deg, #a261afff, #29989ca4, #612c75ff, #c07432ff, #ff0000f1, #5fcce7c7)",
backgroundSize: "1200% 1200%",
animation: `${gradientAnimation} 40s ease infinite`,
        "&::before": {
  content: '""',
  position: "absolute",
  top: "-40%",
  left: "-25%",
  width: "180%",
  height: "180%",
  background:
    "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)",
  filter: "blur(120px)",
  zIndex: 0,
  animation: `${gradientAnimation} 25s ease infinite reverse`,
},
"&::after": {
  content: '""',
  position: "absolute",
  top: "20%",
  left: "50%",
  width: "200%",
  height: "200%",
  background:
    "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%)",
  filter: "blur(200px)",
  zIndex: 0,
  animation: `${gradientAnimation} 35s ease infinite`,
        },
      })}
    >
      <Container size="lg" style={{ position: 'relative', zIndex: 1, paddingTop: 40, height: "auto", minHeight:200  }}>
        <Text
          fw={800}
          style={{
            fontSize: "clamp(28px, 6vw, 60px)",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.5,
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            userSelect: 'none',
            transition: 'transform 0.3s ease',
            cursor: 'default',
             marginBottom: "0.5rem",
          }}
          mb="md"
        >
          Tasarım Teknokent
        </Text>
        <Text
          fw={800}
          style={{
            fontSize:"clamp(28px, 6vw, 60px)",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.5,
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            userSelect: 'none',
            transition: 'transform 0.3s ease',
            cursor: 'default',
             marginBottom: "0.5rem",
          }}
          mb="md"
        >
          Yönetim Kurulu
        </Text>
      </Container>
    </Box>
  );
}
