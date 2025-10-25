'use client';

import { useState, useEffect } from 'react';
import { Container, Stack } from '@mantine/core';
import SearchBar from './SearchBar';
import DocumentsGrid from './DocumentsGrid';

type DocumentItem = {
  id: number;
  title: string;
  fileUrl: string;
};

type DocumentsClientProps = {
  documents: DocumentItem[];
};

// Türkçe karakterleri İngilizce karakterlere dönüştüren yardımcı fonksiyon
const normalizeTurkish = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
};

export default function DocumentsClient({ documents }: DocumentsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      // Arama terimini normalleştiriyoruz.
      const normalizedSearchTerm = normalizeTurkish(searchTerm);

      const filteredSuggestions = documents
        .filter((doc) =>
          // Dosya başlığını normalleştirip, normalleştirilmiş arama terimini içeriyor mu diye kontrol ediyoruz.
          normalizeTurkish(doc.title).includes(normalizedSearchTerm)
        )
        .map((doc) => doc.title);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, documents]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <SearchBar
          onSearch={handleSearch}
          onSelectSuggestion={handleSelectSuggestion}
          suggestions={suggestions}
        />
        <DocumentsGrid documents={documents} searchTerm={searchTerm} />
      </Stack>
    </Container>
  );
}
