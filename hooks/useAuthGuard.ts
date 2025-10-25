// hooks/useAuthGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    // ✅ SessionStorage kontrolü
    useEffect(() => {
        const loggedIn = sessionStorage.getItem("isLoggedIn");
        if (!loggedIn) {
            router.replace("/login");
        } else {
            setIsChecking(false);
        }
    }, [router]);

    // ✅ NextAuth kontrolü
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    return { session, status, isChecking };
}
