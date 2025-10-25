"use client";

import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import "@mantine/notifications/styles.css";
import { FirmaProvider } from "./context/FirmaContext"; // Yeni FirmaContext provider'ı ekliyoruz
import { OdemeProvider } from "./context/OdemeContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider
        theme={{
          primaryColor: "dark",
          colors: {
            dark: [
              "#f0f0f0",
              "#d9d9d9",
              "#bfbfbf",
              "#a6a6a6",
              "#8c8c8c",
              "#737373",
              "#595959",
              "#404040",
              "#262626",
              "#0d0d0d",
            ],
          },
        }}
      >

        <FirmaProvider>

          {children}

        </FirmaProvider>

      </MantineProvider>
    </SessionProvider>
  );
}
