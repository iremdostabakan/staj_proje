"use client";

import { useState } from "react";
import { Accordion, Title, Text, Container, Box } from "@mantine/core";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "DUMLUPINAR TEKNOKENT’e kimler başvurabilir?",
    answer: "DUMLUPINAR TEKNOKENT’e başta öncelikli sektörler olmak üzere Ar-Ge ve yazılım projeleri geliştiren firmalar başvurabilir.",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’e başvurular ücretli midir?",
    answer: "DUMLUPINAR TEKNOKENT için aday başvurularından proje başına 4000 ₺ + KDV başvuru ücreti alınmaktadır. (Bu ücret her yıl başında veya gerekli görüldüğü takdirde Yönetim Kurulu kararı ile güncellenmektedir)",
  },
  {
    question: "Başvuruların değerlendirilmesi ve kabulü ne şekilde yapılmaktadır?",
    answer: "Başvurular firma faaliyet alanında ve DUMLUPINAR TEKNOKENT içerisinde gerçekleştirilecek projelerde uzman üç kişilik hakem heyeti tarafından değerlendirilir. Hakemler değerlendirme süresinde başvuru sahibi firma ile gerekirse yüz yüze görüşme yapar ve gerekli görülürse mevcut ofislerini veya tesislerini ziyaret eder. Hakem görüşleri Dumlupınar Teknokent Yönetici A.Ş. Yönetim Kurulu onayına sunulur. Hakemlerin görüşü çerçevesinde firma Teknokent’e kabul edilebilir, koşullu kabul edilebilir ya da firmanın Teknokent başvurusu reddedilebilir. Firmaların Teknokent’e kabulünde projelerin Ar-Ge niteliği ve üniversite-sanayi işbirliği boyutu öncelikli tercih nedenidir.",
  },
  {
    question: "Hakem heyeti kimlerden oluşmaktadır?",
    answer: "Hakem heyeti firmanın faaliyet alanında ve özellikle önerilen araştırma ve yazılım geliştirme projeleri konusunda uzman kişilerden oluşur. Hakem heyetinin atanmasında KDPÜ öğretim üyelerine öncelik verilir. Firmalara hakem heyeti üyeleri hakkında bilgi verilmez, firmalar heyeti ancak değerlendirme toplantısında veya değerlendirme sonunda öğrenirler.",
  },
  {
    question: "Başvurular ne kadarlık bir sürede değerlendirilmektedir?",
    answer: "Başvuruların değerlendirilmesi formların tesliminden itibaren en fazla bir aylık bir süreçtir. Bu süre içinde tüm süreç tamamlanarak Dumlupınar Teknokent Yönetici A.Ş. Yönetim Kurulu kararı firmalara bildirilir.",
  },
  {
    question: "Ofis alanları için önceden rezervasyon yapılması söz konusu mudur?",
    answer: "Başvuru öncesinde ofis alanları için rezervasyon yapılması söz konusu değildir. Ancak değerlendirme ve kabul süreci tamamlanarak başvurusu kabul edilmiş olanlara yer tahsisi yapılır.",
  },
  {
    question: "Kabul edilen firmalar için yer tahsisi ne şekilde yapılmaktadır?",
    answer: "Firmalara yer tahsisi, projenin Ar-Ge niteliği, sağladığı katma değeri ve üniversite ile işbirliği boyutu gibi kriterlere göre yapılmaktadır. Bunun yanı sıra firmanın DUMLUPINAR TEKNOKENT’te gerçekleştireceği projelerin gerçekleştirilmesinde kullanılacak ekipman ve projenin yürütülebilmesi için gerekli koşullar da yer tahsisi sırasında önemlidir.",
  },
  {
    question: "Tahsis edilen ofislerin özellikleri nelerdir?",
    answer: "DUMLUPINAR TEKNOKENT’e kabul edilen firmalara, tüm iletişim, internet ve elektrik altyapıları tamamlanmış faaliyet gösterilmesine hazır ofis alanları tahsis edilir. Firma arzu ettiği takdirde, gerekli izinlerin alınmasından sonra, ayrıldığında teslim aldığı şekilde teslim etmeyi taahhüt ederek ofis alanının kendi kullanımına göre iç tefrişatını yaptırabilir. Yapılacak değişikliklerin Dumlupınar Teknokent Yönetici Şirketi’ne proje olarak sunulması ve onay alınması gerekmektedir.",
  },
  {
    question: "Başvuru sonuçlandıktan sonra hemen bir ofis alanı tahsis edilemezse ne yapılmalıdır?",
    answer: "Başvuru sonuçlandıktan sonra, firmanın talepleri doğrultusunda bir ofis alanı tahsisinin hemen yapılamadığı durumlarda, firmanın talebi yine DUMLUPINAR TEKNOKENT değerlendirme kriterlerine göre sıralamaya alınır, uygun bir ofis alanı seçeneği olması halinde ilgili firmaya yer tahsisi yapılır. Öncelik sırasında esas alınan kriterler önem sırasına göre projenin Ar-Ge niteliği, proje yürütülürken kullanılan üniversite-sanayi işbirliği, uluslararası işbirlikleri ve DUMLUPINAR TEKNOKENT firmalar arası işbirlikleridir.",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’te çalışan personel için ne gibi sosyal imkanlar bulunmaktadır?",
    answer: "DUMLUPINAR TEKNOKENT çalışanları üniversitenin sunduğu pek çok sosyal imkandan yararlanabilmektedirler.",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’te faaliyet gösteren firmaların yükümlülükleri nelerdir?",
    answer: "4691 Sayılı Yasa kapsamında sağlanan muafiyetlerden yararlandırılan yeni işe başlayan personelin bilgileri (özgeçmişleri, görev tanımları, işe başlama tarihleri, 4691 Sayılı Yasa kapsamında muafiyetlerden toplam yararlanma süresi, SSK işe giriş bildirgeleri) ve 4691 Sayılı Yasa kapsamı dışında kalan yeni işe başlayan personel bilgileri (adı soyadı, işe başlama tarihi, işyerindeki görevi içeren bir yazı ve yazı ekinde o kişiye ait SSK işe giriş bildirgesi) on gün içerisinde bildirilmelidir.Yeni başlayan personel için giriş kartı düzenlenir. İşten çıkma/çıkarılma veya mevcut personel için görev tanımındaki değişiklik de dahi ",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’e kabul sonrasında, faaliyete başlamak için yapılması gerekenler nelerdir?",
    answer: "DUMLUPINAR TEKNOKENT’e kabul edilmiş firmalar, 4691 Sayılı Teknoloji Geliştirme Bölgeleri Yasası kapsamında faaliyet gösterebilmeleri için kendilerine tahsis edilen ofis alanına taşındıktan itibaren 10 gün içinde Bölge Çalışma İşyeri Sicil Kaydını, SSK İşyeri Sicil Kaydını, yoklama fişinin ve vergi dairesinin mükellefiyetinin tesciline ilişkin belgesinin kopyalarını, 4691 Sayılı Yasa kapsamında sağlanan muafiyetlerden yaralanan personelin bilgilerini (özgeçmişleri, görev tanımları, işe başlama tarihleri, 4691 sayılı yasa kapsamında muafiyetlerden toplam yaralanma süresi, SSK işe giriş bildirgeleri) ve 4691 Sayılı Yasa kapsamı dışında kalan personelin bilgilerini bilgileri (adı soyadı, işe başlama tarihi, işyerindeki görevi içeren bir yazı ve yazı ekinde o kişiye ait SSK işe giriş bildirgesi",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’te faaliyete başlamak için firma merkezini bölgeye taşımak gerekli midir?",
    answer: "Firma merkezinin bölgede olması zorunlu değildir. Ancak bölgedeki Ar-Ge ve yazılım ofisinin Türk Ticaret Kanunu’na göre “işyeri” niteliğinde olması gereklidir. Merkezleri Kütahya ili sınırlarında olmayan şirketlerin bu koşulu yerine getirmesi için bölge ofislerinin şube olması zorunluluğu vardır.",
  },
  {
    question: "Öğretim elemanlarıi ile beraber çalışmayı arzu eden firmalar ne yapmalıdırlar?",
    answer: "Üniversite öğretim elemanları ile projelerde işbirliği yapmayı arzu eden firmalar, ilgili bölüm başkanlığı ile irtibata geçerek kendi konularında çalışan öğretim elemanlarını belirlemelidirler. Öğretim elemanları ile DUMLUPINAR TEKNOKENT firmalarının projelerde ortak çalışması ancak üniversite yönetiminin onayının alınmasından sonra mümkün olmaktadır. Üniversitenin onayına sunulmak üzere üniversite personel görevlendirilmesi ile ilgili formların doldurulması ve firma ile öğretim elemanı arasında yapılmış sözleşmenin bir kopyasının da eklenerek üniversite yönetimine teslim edilmesi gerekmektedir. Üniversite onayının gerçekleşmesi sonrasında öğretim elemanının projede görevlendirilmesi konusunda DUMLUPINAR TEKNOKENT Yönetimi tarafından firmaya bilgi verilmektedir.",
  },
  {
    question: "Üniversite laboratuvar ve araştırma merkezlerinden ne şekilde yararlanılabilir?",
    answer: "KDPÜ Laboratuvar ve/veya araştırma merkezlerinden yararlanmayı arzu eden firmaların ilgili bölüm başkanlığı ya da araştırma merkezi müdürlüğü ile irtibata geçmesi gerekmektedir. Süreçte firma tarafından talep edilmesi halinde DUMLUPINAR TEKNOKENT Yönetimi de yardımcı olmaktadır.",
  },
  {
    question: "Firmaların KDPÜ ile işbirliği yapması, öğretim elemanları ya da öğrencilerle projelerde ortak çalışması zorunlu mudur?",
    answer: "Bölgenin kurulmasının asıl amacının araştırma ve teknoloji geliştirmeye yönelik projelerde üniversite sanayi işbirliğini güçlendirmek olması sebebiyle, firmalardan üniversite ile işbirliği yapmaları beklenmektedir",
  },
  {
    question: "Vergi muafiyetleri ne şekilde denetlenmektedir?",
    answer: "Bölgede faaliyet gösteren firmaların vergi muafiyetlerine yönelik beyanlarının denetim sorumlusu Maliye Bakanlığı Gelirler Genel Müdürlüğü ve ilgili Vergi Dairesi’dir. Vergi denetimine ilişkin genel hususlar bölgedeki etkinlikler için de geçerlidir.",
  },
  {
    question: "Teknoloji Geliştirme Bölgeleri Yasası kapsamında sağlanan avantajlar nelerdir?",
    answer: "Bölgede faaliyet göstermesine izin verilen firmalara Teknoloji Geliştirme Bölgeleri Yasası kapsamında bazı vergi muafiyetleri ve avantajlar sağlanmaktadır. (i) Bölgede çalışan Ar-Ge personeli, araştırmacı personel ve yazılım personelinin ücretleri 31.12.2023 tarihine kadar gelir vergisinden muaftır. (ii) Münhasıran bölgede yürütülen Ar-Ge ve yazılım geliştirme faaliyetlerinden elde edilen gelirler, bölgede 31.12.2023 tarihine kadar kurumlar vergisinden (gerçek kişiler de gelir vergisinden) muaftır. (iii) Bölgede faaliyette bulunan girişimcilerin kazançlarının gelir veya kurumlar vergisinden istisna bulunduğu süre içinde bu bölgelerde ürettikleri ve sistem yönetimi, veri yönetimi, iş uygulamaları, sektörel, internet, mobil ve askeri komuta kontrol uygulama yazılımı şeklindeki teslim ve hizmetleri de katma değer vergisinden muaftır.  (iv) Bölgede, temel bilimler alanlarından en az lisans derecesi sahibi Ar-Ge personeli istihdam eden firmalara, Yönetmeliğinin 35/A Maddesine göre ücret desteği sağlanır. ",
  },
  {
    question: "Ne kadarlık bir süre ile kira sözleşmeleri yapılmaktadır?",
    answer: "Firmaların sözleşmeleri başvuru formlarında belirtilen projelerin sürelerine bağlı olarak 1 yıldan 3 yıla kadar yapılmaktadır.",
  },
  {
    question: "Tahsis edilen ofislerin maliyetleri ne kadardır?",
    answer: "DUMLUPINAR TEKNOKENT Ar-Ge ofis alanı kira ücretleri 14.00 TL/m2’dir. İşletme giderleri bedeli aylık 5.50 TL/m2 civarındadır. Bu bedellere %18 KDV dahil değildir. Bu ücretler her yıl başında veya gerekli görüldüğü takdirde maliyetlerdeki değişikliklere göre Yönetim Kurulu kararı ile güncellenmektedir. Bölgede ofis alanı kiralayan firma ve girişimcilerin ayrıca ilave işletme giderlerine katılması gerekmektedir. İşletme giderleri ofis alanı iklimlendirmesi (bina koşullarına bağlı olarak), çevre düzenlemesi, ortak alan iklimlendirmesi ve temizliği, bina güvenliği, ortak alan elektrik ve su giderlerini kapsamaktadır. Ofis alanının elektrik ve –varsa- su tüketimi ile telefon ve data gibi diğer hizmetler ise işletme bedeline dahil değildir.",
  },
  {
    question: "DUMLUPINAR TEKNOKENT’e başvuru ne şekilde yapılmalıdır?",
    answer: "DUMLUPINAR TEKNOKENT’i yöneten Dumlupınar Teknokent Yönetici A.Ş., Teknokentte yer almak isteyen firma ve girişimcilerin başvurularını almadan önce bir ön başvuru almak suretiyle firma veya girişimcilerin DUMLUPINAR TEKNOKENT’e gelme talebi ve projeleri hakkında bilgi alır ve ön değerlendirme yapar. Ön değerlendirme sonunda olumlu bulunan başvurular için DUMLUPINAR TEKNOKENT Başvuru Formu ve ekinde istenilen diğer bilgilerle birlikte DUMLUPINAR TEKNOKENT Yönetimine başvuru yapılır.",
  },
];

export default function SSSPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <Header />
      <HeroSection/>
      <Container mt="xl" mb="xl">
        <Title order={1} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
          Sıkça Sorulan Sorular
        </Title>

        <Accordion
          variant="filled"
          radius="md"
          chevronPosition="right"
          value={active !== null ? active.toString() : undefined}
          onChange={(val) => setActive(val ? parseInt(val) : null)}
          styles={{
            item: {
              marginBottom: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            },
            control: {
              backgroundColor: "#f0f4f8",
              color: "#2c3e50",
              fontWeight:500,
              fontSize: "1.07rem",
            },
            panel: {
              backgroundColor: "#ffffff",
              color: "#34495e",
              fontWeight:400,
               fontSize: "1.05rem", // Açıklama yazısı büyütüldü
      lineHeight: 1.6,
      padding: "1rem",
            },
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={index.toString()}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
      <FooterSection />
    </>
  );
}
