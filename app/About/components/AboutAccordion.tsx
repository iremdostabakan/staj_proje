"use client";

import { useState } from "react";
import { Accordion, Title, Text, Container } from "@mantine/core";
import { IconAffiliate, IconApiApp } from "@tabler/icons-react";
import { keyframes } from "@emotion/react";


const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export function AboutAccordion() {
  const [opened, setOpened] = useState<string | null>("hakkimizda");

  return (
    <Container size="xl" data-aos="fade-up">
      <Title order={1} style={{ color: "white", height: "60px" }}>
        Hakkımızda
      </Title>
      <Title order={3} mb={40} style={{ color: "white" }}>
        Biz kimiz? Neler yapıyoruz?
      </Title>

      <Accordion
        variant="separated"
        radius="md"
        value={opened}
        onChange={setOpened}
        styles={{
          item: { backgroundColor: "white", color: "rgb(52, 73, 94)" },
          control: { fontWeight: 600 },
          panel: { color: "rgb(52, 73, 94)", fontSize: 16, lineHeight: 1.5 },
        }}
         style={{
          backgroundImage:"linear-gradient(270deg, #a261afff, #29989ca4, #612c75ff, #c07432ff, #ff0000f1, #5fcce7c7)",
           backgroundSize: "1200% 1200%",
    animation: `${gradientAnimation} 40s ease infinite`,
        }}
      >
        <Accordion.Item value="hakkimizda">
          <Accordion.Control>
            <Text fw={600} size="xl" color="rgb(52, 73, 94)">
              Hakkımızda
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <Title order={4} c="rgba(182, 180, 101, 1)">
              Kütahya Tasarım Teknokent
            </Title>
            Teknoloji Geliştirme Bölgeleri (TGB), üniversiteler, araştırma kurumları ve sanayi kuruluşlarının ileri teknoloji ile aynı ortam içerisinde AR-GE ve inovasyon çalışmalarını sürdürdükleri, projeler ve yenilikçi ürünler ortaya çıkardıkları, birbirleri arasında bilgi ve teknoloji transferi gerçekleştirdikleri, bu yolla bölgelerin ve ülkemizin kalkınmasına katkıda bulundukları, akademik, ekonomik ve sosyal yapının birleştiği organize araştırma, iş ve girişimcilik merkezleridir. 2023 yılına kadar TGB’deki şirketler yürüttükleri Ar-Ge projeleri ve geliştirdikleri yazılımlar ile ilgili olarak KDV muafiyeti, gümrük vergisi muafiyeti gibi teşvikler alırken çalışan Ar-Ge ve yazılım personeline de stopaj teşviki, sigorta primi teşviki verilmektedir. TGB yönetici şirketleri tarafından Bölgede faaliyette bulunan firmalara danışmanlık hizmetleri, esnek kira sözleşmeleri, ortak toplantı mekanları, ortak faks, fotokopi vb. ofis ekipmanı, muhasebe hizmetleri gibi çeşitli hizmetler de verilebilmektedir.

Günümüzde bir ülkenin küresel rekabet edebilirlik düzeyi, o ülkenin ‘yeni bilgi’ üretebilme kapasitesi ve ‘teknolojik gelişimi’ ile doğru orantılıdır. Yeni bilgi ile teknolojik uygulamanın aynı çatı altında toplandığı Kamu-Üniversite-Sanayi İş Birliği Modeli, ülkelerin teknoloji tabanlı kalkınmasına doğrudan etkileri kanıtlanmış dünya çapında bir modeldir. TGB’ler; üniversiteler, AR-GE kuruluşları, firmalar ve pazar arasında bilgi ve teknoloji akışını yönetir ve teşvik eder, yenilikçi firmaların oluşmasını ve büyümesini kolaylaştırır, yüksek kalitede mekân ve olanaklar sağlar ve diğer katma değerli hizmetleri sunar. Kütahya Dumlupınar Üniversitesi 2009 yılında Kütahya Organize Serbest Bölgesinde TGB kurulması ile ilgili Bilim, Sanayi ve Teknoloji Bakanlığına başvuruda bulunmuştur. Başvuru Başbakanlığın uygun görüşü ile Bakanlar Kuruluna gönderilmiş ve Bakanlar Kurulu kararı 28.07.2009 tarihli Resmi gazetenin 27302 sayılı nüshasında yayınlanmıştır. Kütahya Dumlupınar Üniversitesi ve Bilim, Sanayi ve Teknoloji Bakanlığı’nın ortaklaşa kurmuş oldukları “Kütahya Dumlupınar Tasarım, Teknoloji Geliştirme Bölgesi (Dumlupınar TGB)’nin resmi olarak kurulmasından sonra Tasarım Teknokent Yönetici Anonim Şirketi (Dumlupınar Teknokent) 25/01/2010 tarihinde kurulmuş ve 2013 yılında faaliyete başlamıştır. Kütahya Tasarım Teknoken binası bodrum + zemin + 2 kattan oluşan 58,80 metre uzunluğunda 18,50 metre genişliğinde olup yaklaşık 2000.00 m2 kiralanabilir ofis alanına sahiptir. Yazılım şirketleri başta olmak üzere otomasyon ve kimya sektörlerinden 100+ şirket Kütahya Tasarım Teknokent’te faaliyet göstermektedir.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="misyonumuz">
          <Accordion.Control>
            <Text fw={500} size="xl" color="rgb(52, 73, 94)">
              Misyonumuz
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <IconAffiliate size={36} color="rgba(182, 180, 101, 1)" />
            Türkiye’de Teknoloji geliştiricisi Ar-Ge kurum ve kuruluşları ile
              teknoloji kullanıcısı sanayi şirketleri veya diğer teknoloji ya da
              Ar-Ge kurum ve kuruluşları arasında bilgilendirme, koordinasyon,
              araştırmayı yönlendirme, yeni Ar-Ge şirketlerinin oluşturulmasını
              teşvik etme, iş birliği geliştirme, fikri mülkiyet haklarının
              korunması...
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="vizyonumuz">
          <Accordion.Control>
            <Text fw={500} size="xl" color="rgb(52, 73, 94)">
              Vizyonumuz
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <IconApiApp size={36} color="rgba(182, 180, 101, 1)" />
            Ülkemizin gelişmişlik seviyesine katkı sağlamak amacıyla yüksek/ileri teknolojiler alanında inovasyon kültürünün gelişmesini teşvik edici, yaratıcılık ve girişimcilik alanında önemli projelerin ekonomiye kazandırılması ve ticarileştirilmesi, üniversite-sanayi işbirliğinin gelişimine katkı sağlamak amacıyla ortak proje geliştirmek ve firmalar arasında sinerji oluşturmak üzere eşleştirme ve kümeleme çalışmalarıyla sürdürülebilir Ar-Ge ve inovasyon ekosistemi içerisinde, akademik ve endüstriyel girişimciliği destekleyerek, bölgesel ve ulusal düzeyde en yüksek katma değeri yaratmaktır.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
