"use client";

import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
  Card
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp
} from "@tabler/icons-react";

// ContactIconsList'i default export olarak alıyoruz
import {ContactIconsList} from "../components/ContactIcons";
import classes from "./ContactUs.module.css";

export default function Iletisim() {
  // Form verileri ve setter
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  // Form gönderme
  const handleSubmit = async () => {
    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Mesajınız gönderildi 💌");
      setFormData({ email: "", name: "", message: "" });
    } else {
      alert("Mesaj gönderilemedi 😞");
    }
  };

  // Sosyal ikonlar
  const social = [
    { Icon: IconBrandTwitter, url: "https://x.com/kutahyatekno" },
    { Icon: IconBrandInstagram, url: "https://www.instagram.com/kutahyatasarimteknokent/" },
    { Icon: IconBrandFacebook, url: "https://www.facebook.com/kutahya.teknokent.5/" },
    { Icon: IconBrandLinkedin, url: "https://www.linkedin.com/in/dumlupinar-teknokent/" },
    { Icon: IconBrandWhatsapp, url: "https://api.whatsapp.com/send/?phone=905528370143&text=Merhaba.&type=phone_number&app_absent=0" },
  ];

  const icons = social.map(({ Icon, url }, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            {/* Buraya açıklama ekleyebilirsin */}
          </Text>

          <ContactIconsList />

          <Group mt="xl">{icons}</Group>
        </div>

        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@gmail.com"
            required
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextInput
            label="İsim"
            placeholder="Adınız.."
            mt="md"
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            required
            label="Mesaj"
            placeholder="Mesajınız.."
            minRows={4}
            mt="md"
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <Group justify="flex-end" mt="md">
            <Button className={classes.control} radius="md" onClick={handleSubmit}>
              Mesaj Gönder
            </Button>
          </Group>
        </div>
      </SimpleGrid>

      <Card shadow="sm" padding="md" radius="md" mt="xl" withBorder>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.852730584256!2d30.028231600000005!3d39.47265559999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c94fc7684060f9%3A0x1a6c56134296d665!2sK%C3%BCtahya%20Teknokent!5e0!3m2!1str!2str!4v1755241176858!5m2!1str!2str"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Card>
    </div>
  );
}
