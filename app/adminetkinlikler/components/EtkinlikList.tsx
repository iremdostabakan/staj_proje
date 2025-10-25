"use client";

import {
  Card, Table, Group, Button, Modal, TextInput, Textarea,
  Stack, Title, Center, Image
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

type EventItem = {
  _id: string;
  title: string;
  coverImageUrl: string;
  topic: string;
  date: string;
  time: string;
  location: string;
};

export default function EtkinlikList({ events }: { events: EventItem[] }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [current, setCurrent] = useState<EventItem | null>(null);

  const onEdit = (e: EventItem) => {
    setCurrent(e);
    open();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/etkinlikler/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  const handleUpdate = async (formData: FormData) => {
    if (!current) return;
    const data = {
      title: formData.get("title"),
      coverImageUrl: formData.get("coverImageUrl"),
      topic: formData.get("topic"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
    };

    await fetch(`/api/etkinlikler/${current._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    close();
    window.location.reload();
  };

  if (!events || events.length === 0) {
    return (
      <Card withBorder radius="lg" shadow="sm" p="lg" mt="lg">
        <Center mih={120}>
          <Title order={4} c="dimmed">Etkinlik yok</Title>
        </Center>
      </Card>
    );
  }

  return (
    <>
      <Card withBorder radius="lg" shadow="sm" p="lg" mt="lg">
        <Title order={3} mb="md">Etkinlikler</Title>

        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Kapak</Table.Th>
              <Table.Th>Başlık</Table.Th>
              <Table.Th>Konu</Table.Th>
              <Table.Th>Tarih</Table.Th>
              <Table.Th>Saat</Table.Th>
              <Table.Th>Konum</Table.Th>
              <Table.Th>Aksiyonlar</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {events.map((e) => (
              <Table.Tr key={e._id}>
                <Table.Td>
                  <Image src={e.coverImageUrl} alt="" h={48} w={72} radius="sm" fit="cover" />
                </Table.Td>
                <Table.Td>{e.title}</Table.Td>
                <Table.Td>{e.topic}</Table.Td>
                <Table.Td>{e.date}</Table.Td>
                <Table.Td>{e.time}</Table.Td>
                <Table.Td>{e.location}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button size="xs" variant="light" onClick={() => onEdit(e)}>Düzenle</Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(e._id)}>Sil</Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal opened={opened} onClose={close} title="Etkinliği Düzenle" radius="lg" size="lg">
        {current && (
          <form action={handleUpdate}>
            <Stack gap="md">
              <TextInput name="title" label="Başlık" defaultValue={current.title} required />
              <TextInput name="coverImageUrl" label="Kapak Fotoğrafı URL" defaultValue={current.coverImageUrl} required />
              <Textarea name="topic" label="Konu" defaultValue={current.topic} minRows={2} required />
              <Group grow>
                <TextInput name="date" label="Tarih" type="date" defaultValue={current.date} required />
                <TextInput name="time" label="Saat" type="time" defaultValue={current.time} required />
              </Group>
              <TextInput name="location" label="Konum" defaultValue={current.location} required />

              <Group justify="flex-end" mt="md">
                <Button type="submit">Kaydet</Button>
              </Group>
            </Stack>
          </form>
        )}
      </Modal>
    </>
  );
}
