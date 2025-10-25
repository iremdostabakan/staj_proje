"use client";

import { Box } from "@mantine/core";
import Image from "next/image";

export function AboutHero() {
  return (
    <Box
      style={{
        paddingTop: 100,
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 40,
        maxHeight: 1200,
      }}
    >
      <Image
        src="/teknokent3.jpg"
        alt="teknokent"
        width={1920}
        height={1080}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        priority
      />
    </Box>
  );
}
