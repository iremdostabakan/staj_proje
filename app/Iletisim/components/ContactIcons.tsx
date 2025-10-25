import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import { Box, Stack, Text } from '@mantine/core';
import classes from './ContactIcons.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'info@dumlupinarteknokent.com', icon: IconAt,link: 'mailto:info@dumlupinarteknokent.com'  },
  { title: 'Telefon', description: '(0274) 502 11 61', icon: IconPhone,link: 'tel:+902745021161'  },
  { title: 'Adres', description: 'Çalca OSB, 43100 Kütahya Merkez/Kütahya', icon: IconMapPin },

];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => {
    const content = <ContactIcon key={index} {...item} />;

    return item.link ? (
      <a
        key={index}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {content}
      </a>
    ) : (
      content
    );
  });

  return <Stack>{items}</Stack>;
}
