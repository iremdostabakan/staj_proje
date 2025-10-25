// components/AdminGuard.tsx
"use client";

import { Center, Loader } from "@mantine/core";
import { useAuthGuard } from "../../hooks/useAuthGuard";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { session, status, isChecking } = useAuthGuard();

    if (isChecking || status === "loading" || !session) {
        return (
            <Center style={{ height: "100vh" }}>
                <Loader size="xl" variant="dots" />
            </Center>
        );
    }

    return <>{children}</>;
}
