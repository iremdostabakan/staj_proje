import { Container, Center, Box } from '@mantine/core';
import type { CSSProperties } from 'react';

export default function ArgeVideo() {
  const youtubeUrl = "https://www.youtube.com/embed/Q55h7dSdz1U";

  // En-boy oranını koruyarak videoyu responsive yapan stil
  // CSSProperties türü ile stil nesnesinin türünü açıkça belirtiyoruz.
  const responsiveVideoWrapperStyle: CSSProperties = {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 oranı (9 / 16 = 0.5625)
    height: 0,
    overflow: 'hidden',
    borderRadius: 8,
  };

  const responsiveIframeStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <Container size="lg" style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Center>
        <Box style={{ width: '100%', maxWidth: 800 }}>
          <div style={responsiveVideoWrapperStyle}>
            <iframe
              style={responsiveIframeStyle}
              src={youtubeUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Box>
      </Center>
    </Container>
  );
}
