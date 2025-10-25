"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Odeme = {
  id: string;
  firmaId: string;
  firmaAdi: string;
  tutar: number;
  sonOdemeTarihi: string;
  odemeDurumu: string;
  phoneNumber: string;
};

type OdemeContextType = {
  odemeler: Odeme[];
  addOdeme: (odeme: Omit<Odeme, "id">) => Promise<void>;
  updateOdeme: (id: string, updated: Omit<Odeme, "id">) => Promise<void>;
  removeOdeme: (id: string) => Promise<void>;
};

const OdemeContext = createContext<OdemeContextType | undefined>(undefined);

export const OdemeProvider = ({ children }: { children: ReactNode }) => {
  const [odemeler, setOdemeler] = useState<Odeme[]>([]);

  useEffect(() => {
    async function fetchOdemeler() {
      const res = await fetch("/api/odemeler");
      const data = await res.json();
      setOdemeler(data);
    }
    fetchOdemeler();
  }, []);

  const addOdeme = async (odeme: Omit<Odeme, "id">) => {
    const res = await fetch("/api/odemeler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(odeme),
    });
    const data = await res.json();
    if (data.success) setOdemeler((prev) => [...prev, data.odeme]);
  };

  const updateOdeme = async (id: string, updated: Omit<Odeme, "id">) => {
    const res = await fetch("/api/odemeler", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updated }),
    });
    const data = await res.json();
    if (data.success) {
      setOdemeler((prev) =>
        prev.map((o) => (o.id === id ? { id, ...updated } : o))
      );
    }
  };

  const removeOdeme = async (id: string) => {
    const res = await fetch("/api/odemeler", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) setOdemeler((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OdemeContext.Provider value={{ odemeler, addOdeme, updateOdeme, removeOdeme }}>
      {children}
    </OdemeContext.Provider>
  );
};

export const useOdemeContext = () => {
  const context = useContext(OdemeContext);
  if (!context) throw new Error("useOdemeContext must be used within OdemeProvider");
  return context;
};
