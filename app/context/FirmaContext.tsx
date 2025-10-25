"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Firma = {
  id: string;
  ad: string;
  logo: string;           // Base64 veya URL
  sektor: string;
  firmaEmail: string;
  webAdres: string;
  yetkiliAdi: string;
  yetkiliTelefon: string;
  yetkiliEmail: string;
  hakkimizda: string;
  createdAt?: string;
};

type FirmaContextType = {
  firmalar: Firma[];
  addFirma: (
    ad: string,
    detaylar: {
      logo: string;
      sektor: string;
      firmaEmail: string;
      webAdres?: string;
      yetkiliAdi: string;
      yetkiliTelefon: string;
      yetkiliEmail: string;
      hakkimizda: string;
    }
  ) => Promise<{ success: boolean; message?: string }>;
  removeFirma: (id: string) => Promise<void>;
  updateFirma: (
    id: string,
    updatedData: Partial<Firma>
  ) => Promise<void>;
};

const FirmaContext = createContext<FirmaContextType | undefined>(undefined);

export const FirmaProvider = ({ children }: { children: ReactNode }) => {
  const [firmalar, setFirmalar] = useState<Firma[]>([]);

  useEffect(() => {
    async function fetchFirmalar() {
      const res = await fetch("/api/firmalar");
      const data = await res.json();
      setFirmalar(data);
    }
    fetchFirmalar();
  }, []);

  const addFirma = async (
    ad: string,
    detaylar: {
      logo: string;
      sektor: string;
      firmaEmail: string;
      webAdres?: string;
      yetkiliAdi: string;
      yetkiliTelefon: string;
      yetkiliEmail: string;
      hakkimizda: string;
    }
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch("/api/firmalar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ad, ...detaylar }),
      });
      const data = await res.json();

      if (data.success) {
        setFirmalar((prev) => [...prev, data.firma]);
      }

      return data;
    } catch (err) {
      return { success: false, message: "Sunucu ile bağlantı kurulamadı." };
    }
  };

  const removeFirma = async (id: string) => {
    const res = await fetch("/api/firmalar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setFirmalar((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const updateFirma = async (id: string, updatedData: Partial<Firma>) => {
    const res = await fetch("/api/firmalar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedData }),
    });
    const data = await res.json();
    if (data.success) {
      setFirmalar((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updatedData } : f))
      );
    }
  };

  return (
    <FirmaContext.Provider value={{ firmalar, addFirma, removeFirma, updateFirma }}>
      {children}
    </FirmaContext.Provider>
  );
};

export const useFirmaContext = () => {
  const context = useContext(FirmaContext);
  if (!context) throw new Error("useFirmaContext must be used within FirmaProvider");
  return context;
};
