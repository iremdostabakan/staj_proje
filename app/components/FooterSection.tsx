'use client'
import { IconBrandInstagram, IconBrandTwitter, IconBrandFacebook, IconBrandLinkedin, IconBrandWhatsapp } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, Anchor } from '@mantine/core';
import Image from "next/image"
import classes from './FooterSection.module.css';
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";


const data = [
  {
    title: 'Hakkımızda',

    links: [
      { label: 'Hakkımızda', link: '/About' },
      { label: 'Yönetim Kurulu', link: '/YonetimKurulu' },
      { label: 'Teknokent Yönetimi', link: '/TeknokentYonetim' },
      { label: 'Firmalar', link: '/firmalar' },
      { label: 'Bizden Kareler', link: '/Medya' },
      { label: 'SSS', link: '/SSS' },
      { label: 'Bize Ulaşın', link: '/Iletisim' },

    ],
  },
  {
    title: 'İletişim',
    links: [
      { label: '(0274) 502 11 61', link: 'tel:(0274) 502 11 61' },
      { label: 'info@dumlupinarteknokent.com', link: 'mailto:info@dumlupinarteknokent.com' },

    ],
  },
];

export function FooterSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link} className={classes.link}>
  {link.label}
</Link>

    ));

    return (
      <div className={classes.wrapper} key={group.title} style={{
        marginBottom: isMobile ? 20 : 0,
        width: isMobile ? '100%' : 'auto',
      }}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} style={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <Link href="/" >
         
            <div className={classes.logo} style={{
              marginBottom: isMobile ? 30 : 0,
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>

              <Image src="/logo.png" alt="University Logo" width={isMobile ? 120 : 200}
                height={isMobile ? 120 : 200} />

            </div>
          
        </Link>


        <div className={classes.groups} style={{
          flexDirection: isMobile ? 'column' : 'row',
          display: 'flex',
          gap: 30,
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter} style={{
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        gap: isMobile ? 10 : 0,
        marginTop: 30,
      }}>


        <Group gap={0} className={classes.social} justify={isMobile ? 'center' : 'flex-end'} wrap="nowrap">
          <Anchor href="https://x.com/kutahyatekno" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>

          <Anchor href="https://www.facebook.com/kutahya.teknokent.5/" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandFacebook size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>

          <Anchor href="https://www.instagram.com/kutahyatasarimteknokent/" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>

          <Anchor href="https://www.linkedin.com/in/dumlupinar-teknokent/" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandLinkedin size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>

          <Anchor href="https://api.whatsapp.com/send/?phone=905528370143&text=Merhaba.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandWhatsapp size={18} stroke={1.5} />
            </ActionIcon>
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
}