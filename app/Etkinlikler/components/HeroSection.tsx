"use client";

import { Container, Title, Text, Overlay, useMantineTheme, Box } from '@mantine/core';

export default function HeroSection() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: theme.colors.gray[0],
        paddingTop: `calc(${theme.spacing.xl} * 3)`,
        paddingBottom: `calc(${theme.spacing.xl} * 3)`,
      }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={-1}
      />
      <Container size="lg" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing.xl,
        '@media (max-width: 48em)': {
          alignItems: 'center',
          textAlign: 'center',
        },
      }}>
        <Title
          style={{
            fontSize: 52,
            fontWeight: 900,
            lineHeight: 1.1,
            '@media (max-width: 48em)': {
              fontSize: 32,
              lineHeight: 1.2,
              
            },
          }}
          mt={94}
        >
          Kütahya Tasarım Teknokent Etkinlikleri ile Geleceği Keşfet
        </Title>
        <Text
          style={{
            maxWidth: 600,
            fontSize: theme.fontSizes.xl,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.xl,
            '@media (max-width: 48em)': {
              maxWidth: '100%',
            },
          }}
        >
          Bilimsel araştırmalar, girişimcilik ve teknoloji alanındaki en güncel gelişmeleri takip etmek için etkinliklerimize katılın. Alanında uzman kişilerle tanışma fırsatını kaçırmayın.
        </Text>
        
      </Container>
    </Box>
  );
}
