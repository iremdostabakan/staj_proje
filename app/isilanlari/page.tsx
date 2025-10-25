"use client";

import {
  Container,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  TextInput,
  Select,
  MultiSelect,
  Pagination,
  Center,
  Divider,
  Box,
  rem,
  Transition,
  Paper,
  Modal,
  Textarea,
  SimpleGrid,
  Anchor,
  Avatar,
  Loader,
  Alert,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  FileInput,
} from "@mantine/core"
import { 
  IconSearch, 
  IconBriefcase, 
  IconCalendar, 
  IconMapPin, 
  IconPlus,
  IconX,
  IconEdit,
  IconTrash,
  IconInfoCircle,
  IconSun,
  IconMoon,
  IconUpload
} from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"
import { Header } from '../components/Header';
import {FooterSection} from "../components/FooterSection"
import { HeroSection } from "./components/HeroSection"
import { useFirmaContext } from "../context/FirmaContext"

interface JobListing {
  _id: string;
  title: string
  company: string
  type: "full-time" | "part-time" | "internship" | "contract"
  category: string
  location: string
  datePosted: string
  description: string
  tags: string[]
  companyLogo?: string
  responsibleEmail?: string
}

interface ApplicationFormValues {
  name: string
  surname: string
  email: string
  phone: string
  cv: File | null
}

const jobCategories = [
  "Yazılım Geliştirme",
  "Elektronik Mühendisliği",
  "Tasarım",
  "Üretim",
  "Satış & Pazarlama",
  "Finans",
  "İnsan Kaynakları",
  "AR-GE",
]

const typeLabels = {
  "full-time": "Tam Zamanlı",
  "part-time": "Yarı Zamanlı",
  internship: "Staj",
  contract: "Sözleşmeli",
}

const typeColors = {
  "full-time": "blue",
  "part-time": "green",
  internship: "teal",
  contract: "orange",
}

const JOBS_ENDPOINT = "/api/jobs";

export default function JobListings() {
  const router = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';
  const { firmalar } = useFirmaContext();
  
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activePage, setActivePage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [applicationLoading, setApplicationLoading] = useState(false)
  
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false)
  const [applicationOpened, { open: openApplication, close: closeApplication }] = useDisclosure(false)
  
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  
  const itemsPerPage = 6

  const applicationForm = useForm<ApplicationFormValues>({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      cv: null,
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Ad en az 2 karakter olmalıdır' : null,
      surname: (value) => value.trim().length < 2 ? 'Soyad en az 2 karakter olmalıdır' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Geçerli bir e-posta adresi girin' : null,
      phone: (value) => !/^(\+90|0)?[5][0-9]{9}$/.test(value.replace(/\s/g, '')) ? 'Geçerli bir telefon numarası girin (5XX XXX XX XX)' : null,
      cv: (value) => !value ? 'CV dosyası zorunludur' : null,
    },
  });

  useEffect(() => {
    setMounted(true)
    loadJobs()
  }, [])

  // MongoDB'den iş ilanlarını çek
  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(JOBS_ENDPOINT);

      if (!response.ok) {
        throw new Error("İlanlar alınamadı");
      }

      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
      setError(null);
    } catch (err) {
      setError(
        "İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = [...jobs]

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedType) results = results.filter((job) => job.type === selectedType)
    if (selectedCategories.length > 0)
      results = results.filter((job) => selectedCategories.includes(job.category))

    setFilteredJobs(results)
    setActivePage(1)
  }, [searchTerm, selectedType, selectedCategories, jobs])

  const paginatedJobs = filteredJobs.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

  const typeOptions = [
    { value: "full-time", label: "Tam Zamanlı" },
    { value: "part-time", label: "Yarı Zamanlı" },
    { value: "internship", label: "Staj" },
    { value: "contract", label: "Sözleşmeli" },
  ]

  const handleApply = (job: JobListing) => {
    setSelectedJob(job)
    openApplication()
  }

  const openJobDetail = (job: JobListing) => {
    setSelectedJob(job)
    openDetail()
  }

  // Dosyayı base64'e çevirme yardımcı fonksiyonu
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const submitApplication = async (values: ApplicationFormValues) => {
    if (!selectedJob) return;
    
    setApplicationLoading(true);
    
    try {
      // İlgili firmayı bul
      const firma = firmalar.find(f => f.ad === selectedJob.company);
      
      if (!firma) {
        throw new Error("Firma bilgilerine ulaşılamadı");
      }

      // CV dosyasını base64'e çevir
      let cvBase64 = '';
      if (values.cv) {
        cvBase64 = await toBase64(values.cv);
      }

      // Başvuruyu API'ye gönder
      const applicationResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob._id,
          applicant: {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            cv: cvBase64,
          }
        }),
      });

      if (!applicationResponse.ok) {
        throw new Error('Başvuru kaydedilemedi');
      }

      // Email gönderme isteği
      const emailResponse = await fetch('/api/send-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: firma.firmaEmail,
          subject: `Yeni İş Başvurusu: ${selectedJob.title}`,
          applicantName: `${values.name} ${values.surname}`,
          applicantEmail: values.email,
          jobTitle: selectedJob.title,
          companyName: selectedJob.company,
          html: `
            <h2>Yeni İş Başvurusu</h2>
            <p><strong>Pozisyon:</strong> ${selectedJob.title}</p>
            <p><strong>Aday:</strong> ${values.name} ${values.surname}</p>
            <p><strong>Email:</strong> ${values.email}</p>
            <p><strong>Telefon:</strong> ${values.phone}</p>
            <p><strong>Başvuru Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
            <hr>
            <p>Bu başvuruyu değerlendirmek için lütfen yönetim panelinizi kontrol edin.</p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Email gönderilemedi ancak başvurunuz alındı');
      }

      notifications.show({
        title: "Başvuru Gönderildi",
        message: "Başvurunuz şirkete iletildi. Size dönüş yapılacaktır.",
        color: "green",
        icon: <IconBriefcase />,
      });
      
    applicationForm.reset();
closeApplication();
} catch (error) {
  let message = "Başvuru sırasında bir hata oluştu. Lütfen tekrar deneyin.";
  if (error instanceof Error) {
    message = error.message;
  }

  notifications.show({
    title: "Hata",
    message,
    color: "red",
    icon: <IconX />,
  });
}

  }

  // Footer ile tam uyumlu renkler
  const pageBackground = isDark 
    ? 'var(--mantine-color-dark-6)' 
    : 'var(--mantine-color-gray-0)';
    
  // Daha uyumlu ve yumuşak başlık renkleri
  const headerGradient = isDark 
    ? 'linear-gradient(135deg, #4b5563 0%, #374151 100%)' 
    : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    
  const cardHoverShadow = isDark 
    ? '0 20px 40px rgba(0,0,0,0.4)' 
    : '0 20px 40px rgba(0,0,0,0.15)';
    
  const cardShadow = isDark 
    ? '0 4px 12px rgba(0,0,0,0.3)' 
    : '0 4px 12px rgba(0,0,0,0.1)';
    
  const filterBg = isDark 
    ? 'var(--mantine-color-dark-6)' 
    : 'var(--mantine-color-white)';
    
  const mainButtonGradient = isDark 
    ? { from: '#4b5563', to: '#374151' } 
    : { from: '#4b5563', to: '#374151' };

  const textColor = isDark ? 'var(--mantine-color-white)' : 'var(--mantine-color-dark)';
  const mutedTextColor = isDark ? 'var(--mantine-color-gray-5)' : 'var(--mantine-color-gray-6)';

  const noJobsAvailable = jobs.length === 0
  const noFilterResults = filteredJobs.length === 0 && !noJobsAvailable

  return (
    <>
      <Header />
      <HeroSection/>
      {/* Tüm sayfanın arkaplan rengini footer ile tam uyumlu yaptık */}
      <Box style={{ background: pageBackground, minHeight: '100vh' }}>
        {/* Header yüksekliği kadar üst boşluk bırakıyoruz (yaklaşık 100px) */}
        <Box pt={100} style={{ background: pageBackground }}>
          <Container size="xl" py="xl" style={{ background: pageBackground }}>
            {/* Başlık Bölümü - Daha uyumlu gri tonları ve daha açık renk */}
            <Box
              mb="xl"
              p="xl"
              style={{
                background: headerGradient,
                borderRadius: rem(16),
                color: 'white',
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Group justify="space-between">
                <div>
                  <Text size="32px" fw={800} mb="md" lh={1.2} style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                    Bir Sonraki Fırsatını Keşfet
                  </Text>
                  <Text size="lg" fw={500} style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    En iyi şirketlerden iş ve staj ilanlarını bul
                  </Text>
                </div>
                
                <Group>
                  <ActionIcon
                    onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
                    variant="light"
                    size="lg"
                    aria-label="Toggle color scheme"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                  >
                    {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
                  </ActionIcon>
                </Group>
              </Group>
            </Box>

            {/* Filtreleme Bölümü */}
            <Paper
              withBorder
              shadow="lg"
              radius="lg"
              mb="xl"
              p="lg"
              style={{ background: filterBg }}
            >
              <Grid gutter="md">
                <Grid.Col span={{ xs: 12, md: 6 }}>
                  <TextInput
                    leftSection={<IconSearch size={18} />}
                    placeholder="İş, şirket veya teknoloji ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    size="md"
                    radius="md"
                    styles={{
                      input: {
                        background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                        borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                        color: textColor,
                      }
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <Select
                    leftSection={<IconBriefcase size={18} />}
                    placeholder="İş Tipi"
                    data={typeOptions}
                    value={selectedType}
                    onChange={setSelectedType}
                    clearable
                    size="md"
                    radius="md"
                    styles={{
                      input: {
                        background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                        borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                        color: textColor,
                      }
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={{ xs: 12, md: 3 }}>
                  <MultiSelect
                    leftSection={<IconCalendar size={18} />}
                    placeholder="Kategoriler"
                    data={jobCategories}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    clearable
                    hidePickedOptions
                    size="md"
                    radius="md"
                    styles={{
                      input: {
                        background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                        borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                        color: textColor,
                      }
                    }}
                  />
                </Grid.Col>
              </Grid>

              <Group justify="space-between" mt="lg">
                <Text size="sm" c={mutedTextColor} fw={500}>
                  {filteredJobs.length} ilan bulundu
                </Text>
                
                <Group>
                  <Button
                    variant="light"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType(null)
                      setSelectedCategories([])
                    }}
                    radius="md"
                    style={{
                      background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
                      color: "white",
                      border: "none",
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                </Group>
              </Group>
            </Paper>

            {/* Yükleme ve Hata Durumları */}
            {loading && (
              <Center py="xl">
                <Loader size="lg" />
                <Text ml="md" c={textColor}>İlanlar yükleniyor...</Text>
              </Center>
            )}
            
            {error && (
              <Alert variant="light" color="red" title="Hata" icon={<IconInfoCircle />} mb="xl">
                {error}
              </Alert>
            )}

            {/* İlanların Listesi */}
            {!loading && !error && (
              <>
                {noJobsAvailable ? (
                  <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center" style={{ background: filterBg }}>
                    <Title order={3} c={mutedTextColor} mb="md">
                      Henüz hiç ilan yok
                    </Title>
                    <Text mb="xl" c={mutedTextColor}>Şu anda aktif ilan bulunmamaktadır</Text>
                  </Paper>
                ) : noFilterResults ? (
                  <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center" style={{ background: filterBg }}>
                    <Title order={3} c={mutedTextColor} mb="md">
                      Arama sonucu bulunamadı
                    </Title>
                    <Text mb="xl" c={mutedTextColor}>Filtrelerinizi genişleterek tekrar deneyin</Text>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedType(null)
                        setSelectedCategories([])
                      }}
                      variant="gradient"
                      gradient={mainButtonGradient}
                    >
                      Filtreleri Temizle
                    </Button>
                  </Paper>
                ) : (
                  <Grid gutter="xl">
                    {paginatedJobs.map((job, index) => (
                      <Grid.Col key={job._id} span={{ xs: 12, md: 6, lg: 4 }}>
                        <Transition
                          mounted={mounted}
                          transition="slide-up"
                          duration={300}
                          timingFunction="ease"
                          exitDuration={200}
                        >
                          {(styles) => (
                            <Card
                              withBorder
                              shadow="md"
                              radius="lg"
                              h="100%"
                              style={{
                                ...styles,
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                transformOrigin: "center",
                                animationDelay: `${index * 100}ms`,
                                background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"
                                e.currentTarget.style.boxShadow = cardHoverShadow
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)"
                                e.currentTarget.style.boxShadow = cardShadow
                              }}
                              onClick={() => openJobDetail(job)}
                            >
                              <Group align="flex-start" mb="sm">
                                {job.companyLogo ? (
                                  <Avatar src={job.companyLogo} size="lg" radius="sm" />
                                ) : (
                                  <Avatar color="blue" size="lg" radius="sm">
                                    {job.company.charAt(0)}
                                  </Avatar>
                                )}
                                
                                <div style={{ flex: 1 }}>
                                  <Text fw={700} size="lg" lineClamp={2} c={textColor}>
                                    {job.title}
                                  </Text>
                                  <Text size="md" c={isDark ? "blue.3" : "blue.7"} fw={600} mt={4}>
                                    {job.company}
                                  </Text>
                                </div>
                                
                                <Badge color={typeColors[job.type]} variant="light" size="md" radius="md">
                                  {typeLabels[job.type]}
                                </Badge>
                              </Group>

                              <Group mt="sm" c={mutedTextColor} gap="lg">
                                <Group gap={6}>
                                  <IconMapPin size={16} />
                                  <Text size="sm">{job.location}</Text>
                                </Group>
                                <Group gap={6}>
                                  <IconCalendar size={16} />
                                  <Text size="sm">{new Date(job.datePosted).toLocaleDateString()}</Text>
                                </Group>
                              </Group>

                              <Text mt="md" lineClamp={3} c={mutedTextColor}>
                                {job.description}
                              </Text>

                              <Group mt="md" gap="xs">
                                {job.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="dot" color="gray" size="sm">
                                    {tag}
                                  </Badge>
                                ))}
                                {job.tags.length > 3 && (
                                  <Badge variant="light" color="gray" size="sm">
                                    +{job.tags.length - 3}
                                  </Badge>
                                )}
                              </Group>

                              <Group mt="xl" justify="space-between">
                                <Button 
                                  variant="light" 
                                  radius="md" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openJobDetail(job)
                                  }}
                                  style={{
                                    color: textColor,
                                    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                  }}
                                >
                                  Detaylı Bilgi
                                </Button>
                                <Button
                                  radius="md"
                                  size="sm"
                                  style={{
                                    background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleApply(job)
                                  }}
                                >
                                  Başvur
                                </Button>
                              </Group>
                            </Card>
                          )}
                        </Transition>
                      </Grid.Col>
                    ))}
                  </Grid>
                )}

                {filteredJobs.length > itemsPerPage && !noFilterResults && !noJobsAvailable && (
                  <Box mt="xl">
                    <Divider mb="md" color={isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'} />
                    <Center mt="xl">
                      <Pagination
                        total={Math.ceil(filteredJobs.length / itemsPerPage)}
                        value={activePage}
                        onChange={(page) => {
                          setActivePage(page)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        size="md"
                        radius="md"
                        styles={{
                          control: {
                            '&[data-active="true"]': {
                              background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
                              border: "none",
                              color: "white",
                            },
                            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
                            borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)',
                            color: textColor,
                          },
                          dots: {
                            color: textColor,
                          }
                        }}
                      />
                    </Center>
                  </Box>
                )}
              </>
            )}
          </Container>
        </Box>
        
        {/* Footer'ın hemen üstündeki beyaz alanı kaldırmak için */}
        <Box style={{ background: pageBackground, paddingTop: '2rem' }}>
          <FooterSection />
        </Box>
      </Box>

      {/* İlan Detay Modalı */}
      <Modal 
        opened={detailOpened} 
        onClose={closeDetail}
        title={<Text fw={700}>{selectedJob?.title}</Text>}
        size="lg"
        centered
        styles={{
          content: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
          },
          header: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
            borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'}`,
          },
          body: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
          }
        }}
      >
        {selectedJob && (
          <div>
            <Group mb="md" align="flex-start">
              {selectedJob.companyLogo ? (
                <Avatar src={selectedJob.companyLogo} size="lg" radius="sm" />
              ) : (
                <Avatar color="blue" size="lg" radius="sm">
                  {selectedJob.company.charAt(0)}
                </Avatar>
              )}
              
              <div>
                <Text size="xl" fw={600} c={isDark ? "blue.3" : "blue.7"}>
                  {selectedJob.company}
                </Text>
                <Group mt={4} gap="xs">
                  <Badge color={typeColors[selectedJob.type]} variant="light" size="md">
                    {typeLabels[selectedJob.type]}
                  </Badge>
                  <Badge color="gray" variant="light" size="md">
                    {selectedJob.category}
                  </Badge>
                </Group>
              </div>
            </Group>
            
            <Divider my="md" color={isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'} />
            
            <SimpleGrid cols={2} spacing="md" mb="lg">
              <Group gap={6}>
                <IconMapPin size={20} />
                <Text fw={500}>{selectedJob.location}</Text>
              </Group>
              
              <Group gap={6}>
                <IconCalendar size={20} />
                <Text fw={500}>
                  {new Date(selectedJob.datePosted).toLocaleDateString()}
                </Text>
              </Group>
            </SimpleGrid>
            
            <Text fw={600} mb="sm" c={textColor}>İş Tanımı:</Text>
            <Text mb="lg" style={{ whiteSpace: "pre-line" }} c={mutedTextColor}>
              {selectedJob.description}
            </Text>
            
            <Text fw={600} mb="sm" c={textColor}>Gereksinimler:</Text>
            <Group gap="xs" mb="lg">
              {selectedJob.tags.map((tag) => (
                <Badge key={tag} variant="light" color="blue" size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>
            
            <Center mt="xl">
              <Button
                size="lg"
                radius="md"
                style={{
                  background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
                  border: "none",
                  color: "white",
                }}
                onClick={() => {
                  closeDetail()
                  handleApply(selectedJob)
                }}
                fullWidth
              >
                Bu İlana Başvur
              </Button>
            </Center>
          </div>
        )}
      </Modal>

      {/* Başvuru Formu Modalı */}
      <Modal 
        opened={applicationOpened} 
        onClose={closeApplication}
        title={<Text fw={700}>İş Başvuru Formu</Text>}
        size="lg"
        centered
        styles={{
          content: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
          },
          header: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
            borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'}`,
          },
          body: {
            background: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
          }
        }}
      >
        {selectedJob && (
          <form onSubmit={applicationForm.onSubmit(submitApplication)}>
            <Text mb="md" c={mutedTextColor}>
              <Text span fw={600} c={textColor}>{selectedJob.company}</Text> şirketinin{' '}
              <Text span fw={600} c={textColor}>{selectedJob.title}</Text> pozisyonu için başvurunuzu tamamlayın.
            </Text>
            
            <Grid gutter="md">
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <TextInput
                  label="Ad"
                  placeholder="Adınız"
                  required
                  {...applicationForm.getInputProps('name')}
                  styles={{
                    input: {
                      background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                      borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                      color: textColor,
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <TextInput
                  label="Soyad"
                  placeholder="Soyadınız"
                  required
                  {...applicationForm.getInputProps('surname')}
                  styles={{
                    input: {
                      background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                      borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                      color: textColor,
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <TextInput
                  label="E-posta"
                  placeholder="ornek@email.com"
                  required
                  {...applicationForm.getInputProps('email')}
                  styles={{
                    input: {
                      background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                      borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                      color: textColor,
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <TextInput
                  label="Telefon Numarası"
                  placeholder="5XX XXX XX XX"
                  required
                  {...applicationForm.getInputProps('phone')}
                  styles={{
                    input: {
                      background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                      borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                      color: textColor,
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <FileInput
                  label="CV Yükle"
                  placeholder="CV'nizi seçin"
                  accept=".pdf,.doc,.docx"
                  leftSection={<IconUpload size={16} />}
                  required
                  {...applicationForm.getInputProps('cv')}
                  styles={{
                    input: {
                      background: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-white)',
                      borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
                      color: textColor,
                    }
                  }}
                />
                <Text size="xs" c={mutedTextColor} mt={4}>
                  PDF, DOC veya DOCX formatında dosya yükleyin (Max 5MB)
                </Text>
              </Grid.Col>
            </Grid>
            
            <Group justify="flex-end" mt="xl">
              <Button 
                variant="default" 
                onClick={closeApplication}
                disabled={applicationLoading}
              >
                İptal
              </Button>
              <Button 
                type="submit" 
                loading={applicationLoading}
                style={{
                  background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
                  border: "none",
                  color: "white",
                }}
              >
                Başvuruyu Gönder
              </Button>
            </Group>
          </form>
        )}
      </Modal>
    </>
  )
}