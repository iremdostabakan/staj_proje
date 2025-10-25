'use client';

import { useState } from 'react';
// Paper ve List bileşenlerini önerileri göstermek için ekledik.
import { TextInput, ActionIcon, rem, Paper, List } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  // Öneri tıklandığında çalışacak fonksiyonu ekledik.
  onSelectSuggestion: (suggestion: string) => void;
  // Öneri listesini prop olarak alıyoruz.
  suggestions: string[];
};

export default function SearchBar({ onSearch, onSelectSuggestion, suggestions }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSearch(value.trim());
  };

  // Öneri listesindeki bir öğeye tıklandığında çalışacak fonksiyon.
  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion); // Arama çubuğunu öneri ile doldur.
    onSelectSuggestion(suggestion); // Üst bileşene seçimi bildir.
  };

  return (
    // Öneri listesinin konumlandırılması için div'i relative yaptık.
    <div style={{ position: 'relative' }}>
      <TextInput
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          // Her tuş vuruşunda önerileri filtrelemek için `onSearch`'i çağır.
          onSearch(e.currentTarget.value); 
        }}
        placeholder="Dosya ara..."
        size="lg"
        radius="xl"
        rightSectionWidth={42}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            variant="filled"
            color="violet"
            onClick={handleSubmit}
          >
            <IconSearch style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
        }
        styles={{
          input: {
            borderColor: 'var(--mantine-color-gray-4)',
          },
        }}
      />
      {/* Öneriler varsa Paper ve List bileşenlerini göster. */}
      {suggestions.length > 0 && (
        <Paper
          shadow="md"
          radius="md"
          p="sm"
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)', // Arama çubuğunun hemen altında konumlandır.
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <List listStyleType="none" p={0} m={0}>
            {suggestions.map((suggestion, index) => (
              <List.Item
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: rem(8),
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-1)',
                  },
                }}
              >
                {suggestion}
              </List.Item>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
