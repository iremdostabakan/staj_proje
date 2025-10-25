'use client';

import type React from "react";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core"; // ColorScheme kaldırıldı
import { useState } from "react";
import "./globals.css";
import { AppProviders } from "./providers";

// ColorScheme tipi oluşturuyoruz
type ColorScheme = 'light' | 'dark';

// export const metadata = {
//   title: "University Technology Park",
//   description: "Innovation hub for technology companies and startups",
//   generator: "v0.dev",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (

    <html lang="en" data-mantine-color-scheme={colorScheme}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
