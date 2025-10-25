"use client";
import React from 'react';
import { Container, Title, Text, Card, Stack, Divider } from '@mantine/core';

const adimlar = [
  "Başvuru Formu bilgilerini doldurunuz ve tarafımıza gönderiniz.",
  "Ön başvuru sonrası mail adresinize gelen mail doğrulama aktivasyonunu gerçekleştiriniz.",
  "Mail doğrulama sonrası Teknopark Yönetimi Ön başvurunuzu 3 iş günü içerisinde değerlendirmesini gerçekleştirip tarafınıza bildirim yapılacaktır.",
  "Ön Başvuru değerlendirmeniz olumsuz olması halinde gerekçeli olarak mail bildirimi tarafınıza yapılacaktır.",
  "Olumlu değerlendirme sonrası proje başvurunuzu yapabilmeniz için mail adresinize iletilecek “Şifre Oluşturma” linki ile Aday Firma Arayüzüne giriş yapabilirsiniz.",
  "Proje başvurusu öncesi Türkiye Halk Bankası Kütahya Şube Kodu: 0527 IBAN: TR55 0001 2009 5270 0010 2625 74 nolu hesaba proje değerlendirme ücretini yatırınız.",
  "Proje değerlendirme ücretine ait dekont bilgisini başvuru sırasında yüklemek için hazır hale getiriniz.",
  "Aday firma ara yüzünden proje başvurunuz için Firma Bilgileri, Personel Bilgileri ve Proje Bilgilerini giriniz.",
  "Ön başvuru sonrası teknopark yönetimi revizyon talep ettiyse güncellemeyi unutmayınız.",
  "Proje başvurunuzu tamamladıktan sonra 'BAŞVUR' butonu ile başvurunuzu gerçekleştirebilirsiniz.",
  "Başvuru sırasında sistem tarafından üretilen 'Aday Firma Bilgi Formu' başvuru formunu 2 nüsha çıktı alarak her sayfaya kaşe ve imza yaparak teknopark yönetimine teslim ediniz.",
  "Proje başvurunuz değerlendirilmek üzere hakemlere ve teknopark yönetimine iletilecektir.",
  "Başvuru değerlendirme sürecinde hakemler tarafından gelen soruları veya istenilen belgeleri Aday Firma arayüzüne giriş yaparak cevaplayabilirsiniz.",
  "Teknopark Yönetimi revize talebi için başvurunuzu geri göndererek gerekçeleri tarafınıza iletebilir.",
  "Proje başvuru değerlendirmeniz olumsuzsa gerekçeli olarak mail bildirimi yapılacaktır.",
  "Projenizin olumlu onaylanması ile birlikte tarafınıza mail bildirimi yapılacaktır.",
  "Onay sonrası işlemlerin tamamlanması için şirket kurulumu yapmadıysanız 5 gün içinde kurulum yapmalısınız.",
  "Şirketiniz kurulu ise gerekli belgeleri başvuru sırasında yükleyin veya teslim edin.",
  "Teknopark yönetimi Aday Firma tipinden durumunuzu Girişimci Firma tipine çevirerek sürecinizi başlatır.",
  "Teknopark yönetiminden Firma Faaliyet Yazısı evrakını alarak bağlı olduğunuz Vergi Dairesi ve SGK Müdürlüğüne teslim edebilirsiniz.",
  "Bölgedeki yazılım veya Ar-Ge faaliyetlerinden elde ettikleri kazançları 31/12/2024 tarihine kadar vergi muafiyetinden yararlanır.",
  "Bölgede ürettikleri sistem yönetimi ve yazılımlar 31/12/2024’e kadar KDV’den muaf tutulur.",
  "Ar-Ge ve destek personellerinin ücretleri 31/12/2024 tarihine kadar vergiden istisnadır.",
  "Destek personeli sayısı Ar-Ge personelinin %10’unu aşamaz.",
  "Ar-Ge destek personeli işveren prim hissesinin %50’si 5746 Sayılı Ar-Ge Kanununa göre karşılanır."
];

export default function OnBasvuru() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f8', padding: '2rem' }}>
      <Container size="lg">
        <Stack gap="xl">
          {/* Başlık */}
          <Title order={2} style={{ color: 'rgb(52, 73, 94)', textAlign: 'center' }}>
            ÖN BAŞVURU ve ADAY FİRMA BAŞVURU SÜREÇ ADIMLARI
          </Title>

          <Divider my="sm" />

          {/* Listeyi kartlar halinde göstereceğiz */}
          <Stack gap="md">
            {adimlar.map((item, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.08)';
                }}
              >
                <Text style={{ color: '#2c3e50', lineHeight: 1.7 }}>{item}</Text>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
