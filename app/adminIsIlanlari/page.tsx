"use client"

import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Text,
  Group,
  Badge,
  Button,
  TextInput,
  Select,
  MultiSelect,
  Table,
  Paper,
  Divider,
  Box,
  rem,
  Modal,
  Textarea,
  SimpleGrid,
  Avatar,
  Loader,
  Alert,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Center,
} from "@mantine/core";
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
  IconMoon
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Header } from "../components/Header";
import { HeroSection } from "./components/HeroSection";
import { FooterSection } from "../components/FooterSection";

interface JobListing {
  _id: string;
  title: string;
  company: string;
  type: "full-time" | "part-time" | "internship" | "contract";
  category: string;
  location: string;
  datePosted: string;
  description: string;
  tags: string[];
  companyLogo?: string;
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
];

const typeLabels = {
  "full-time": "Tam Zamanlı",
  "part-time": "Yarı Zamanlı",
  internship: "Staj",
  contract: "Sözleşmeli",
};

const typeColors = {
  "full-time": "blue",
  "part-time": "green",
  internship: "teal",
  contract: "orange",
};

const JOBS_ENDPOINT = "/api/jobs";

export default function AdminPanel() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [adminOpened, { open: openAdmin, close: closeAdmin }] = useDisclosure(false);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);

  const [newJob, setNewJob] = useState<Omit<JobListing, "_id">>({
    title: "",
    company: "",
    type: "full-time",
    category: "",
    location: "",
    datePosted: new Date().toISOString().split("T")[0],
    description: "",
    tags: [],
    companyLogo: "",
  });

  const [tempTag, setTempTag] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const typeOptions = [
    { value: "full-time", label: "Tam Zamanlı" },
    { value: "part-time", label: "Yarı Zamanlı" },
    { value: "internship", label: "Staj" },
    { value: "contract", label: "Sözleşmeli" },
  ];

  // Form doğrulama fonksiyonu
  const validateForm = (jobData: Omit<JobListing, "_id">) => {
    const errors: Record<string, string> = {};
    
    if (!jobData.title.trim()) errors.title = "İlan başlığı zorunludur";
    if (!jobData.company.trim()) errors.company = "Şirket adı zorunludur";
    if (!jobData.category) errors.category = "Kategori seçimi zorunludur";
    if (!jobData.location.trim()) errors.location = "Lokasyon zorunludur";
    if (!jobData.description.trim()) errors.description = "İş tanımı zorunludur";
    
    return errors;
  };

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
      setError("İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (jobData: Omit<JobListing, "_id">) => {
    try {
      const response = await fetch(JOBS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "İlan eklenemedi");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const response = await fetch(`${JOBS_ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "İlan silinemedi");
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const updateJob = async (id: string, jobData: Partial<JobListing>) => {
    try {
      const response = await fetch(`${JOBS_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "İlan güncellenemedi");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    let results = [...jobs];

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (selectedType) results = results.filter((job) => job.type === selectedType);
    if (selectedCategories.length > 0)
      results = results.filter((job) => selectedCategories.includes(job.category));

    setFilteredJobs(results);
  }, [searchTerm, selectedType, selectedCategories, jobs]);

  const handleAddJob = async () => {
    const errors = validateForm(newJob);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notifications.show({
        title: "Eksik Bilgi",
        message: "Lütfen tüm gerekli alanları doldurun",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    setFormErrors({});

    try {
      const addedJob = await addJob(newJob);

      setJobs(prev => [...prev, addedJob]);

      notifications.show({
        title: "İlan Eklendi",
        message: `${newJob.title} ilanı başarıyla yayınlandı`,
        color: "teal",
        icon: <IconBriefcase />,
      });

      setNewJob({
        title: "",
        company: "",
        type: "full-time",
        category: "",
        location: "",
        datePosted: new Date().toISOString().split("T")[0],
        description: "",
        tags: [],
        companyLogo: "",
      });
      closeAdmin();
    } catch (error: any) {
      notifications.show({
        title: "Hata",
        message: error.message || "İlan eklenirken bir hata oluştu",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(job => job._id !== id));

      notifications.show({
        title: "İlan Silindi",
        message: "İlan başarıyla kaldırıldı",
        color: "green",
        icon: <IconTrash />,
      });
    } catch (error: any) {
      notifications.show({
        title: "Hata",
        message: error.message || "İlan silinirken bir hata oluştu",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  const handleUpdateJob = async () => {
    if (!editingJob) return;

    const errors = validateForm(newJob);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notifications.show({
        title: "Eksik Bilgi",
        message: "Lütfen tüm gerekli alanları doldurun",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    setFormErrors({});

    try {
      const updatedJob = await updateJob(editingJob._id, editingJob);
      setJobs(prev => prev.map(job => job._id === editingJob._id ? updatedJob : job));

      notifications.show({
        title: "İlan Güncellendi",
        message: `${editingJob.title} ilanı başarıyla güncellendi`,
        color: "teal",
        icon: <IconEdit />,
      });

      setEditingJob(null);
      closeAdmin();
    } catch (error: any) {
      notifications.show({
        title: "Hata",
        message: error.message || "İlan güncellenirken bir hata oluştu",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  const addTag = () => {
    if (tempTag.trim() && !newJob.tags.includes(tempTag.trim())) {
      setNewJob(prev => ({
        ...prev,
        tags: [...prev.tags, tempTag.trim()],
      }));
      setTempTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewJob(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const openJobDetail = (job: JobListing) => {
    setSelectedJob(job);
    openDetail();
  };

  const startEditing = (job: JobListing) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      company: job.company,
      type: job.type,
      category: job.category,
      location: job.location,
      datePosted: job.datePosted,
      description: job.description,
      tags: [...job.tags],
      companyLogo: job.companyLogo || "",
    });
    setFormErrors({});
    openAdmin();
  };

  const noJobsAvailable = jobs.length === 0;
  const noFilterResults = filteredJobs.length === 0 && !noJobsAvailable;

  const headerGradient = isDark
    ? 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  const mainButtonGradient = isDark
    ? { from: '#4c6ef5', to: '#5f3dc4' }
    : { from: '#667eea', to: '#764ba2' };

  return (
    <>
    <Header/>
    <HeroSection/>
    <Container size="xl" py="xl">
      {/* Başlık Bölümü */}
      <Box
        mb="xl"
        p="xl"
        style={{
          background: headerGradient,
          borderRadius: rem(16),
          color: "white",
        }}
      >
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={700} mb="md">
              İş İlanları Yönetim Paneli
            </Text>
            <Text opacity={0.9}>
              İş ve staj ilanlarınızı kolayca yönetin
            </Text>
          </div>

          <Group>
            <ActionIcon
              onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
              variant="light"
              size="lg"
              aria-label="Toggle color scheme"
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>

            <Button
              variant="white"
              color="dark"
              leftSection={<IconPlus size={18} />}
              onClick={() => {
                setEditingJob(null);
                setNewJob({
                  title: "",
                  company: "",
                  type: "full-time",
                  category: "",
                  location: "",
                  datePosted: new Date().toISOString().split("T")[0],
                  description: "",
                  tags: [],
                  companyLogo: "",
                });
                setFormErrors({});
                openAdmin();
              }}
              radius="md"
            >
              Yeni İlan Ekle
            </Button>
          </Group>
        </Group>
      </Box>

      {/* Filtreleme Bölümü */}
      <Paper withBorder shadow="lg" radius="lg" mb="xl" p="lg">
        <Grid gutter="md">
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              leftSection={<IconSearch size={18} />}
              placeholder="İş, şirket veya teknoloji ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              size="md"
              radius="md"
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
            />
          </Grid.Col>
        </Grid>

        <Group justify="space-between" mt="lg">
          <Text size="sm" c="dimmed" fw={500}>
            {filteredJobs.length} ilan bulundu
          </Text>

          <Group>
            <Button
              variant="light"
              onClick={() => {
                setSearchTerm("");
                setSelectedType(null);
                setSelectedCategories([]);
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
          <Text ml="md">İlanlar yükleniyor...</Text>
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
            <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center">
              <Title order={3} c="dimmed" mb="md">
                Henüz hiç ilan yok
              </Title>
              <Text mb="xl">Yeni ilan eklemek için aşağıdaki butonu kullanın</Text>

              <Button
                onClick={() => {
                  setEditingJob(null);
                  openAdmin();
                }}
                leftSection={<IconPlus size={18} />}
                variant="gradient"
                gradient={mainButtonGradient}
              >
                İlk İlanını Ekle
              </Button>
            </Paper>
          ) : noFilterResults ? (
            <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center">
              <Title order={3} c="dimmed" mb="md">
                Arama sonucu bulunamadı
              </Title>
              <Text mb="xl">Filtrelerinizi genişleterek tekrar deneyin</Text>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType(null);
                  setSelectedCategories([]);
                }}
                variant="gradient"
                gradient={mainButtonGradient}
              >
                Filtreleri Temizle
              </Button>
            </Paper>
          ) : (
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="md" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>İlan</Table.Th>
                    <Table.Th>Şirket</Table.Th>
                    <Table.Th>Tip</Table.Th>
                    <Table.Th>Kategori</Table.Th>
                    <Table.Th>Lokasyon</Table.Th>
                    <Table.Th>İşlemler</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredJobs.map((job) => (
                    <Table.Tr key={job._id}>
                      <Table.Td>
                        <Text fw={500}>{job.title}</Text>
                      </Table.Td>
                      <Table.Td>{job.company}</Table.Td>
                      <Table.Td>
                        <Badge color={typeColors[job.type]} variant="light">
                          {typeLabels[job.type]}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{job.category}</Table.Td>
                      <Table.Td>{job.location}</Table.Td>
                      <Table.Td>
                        <Group gap={4}>
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => startEditing(job)}
                          >
                            <IconEdit size={18} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDeleteJob(job._id)}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => openJobDetail(job)}
                          >
                            Detay
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </>
      )}

      {/* İlan Detay Modalı */}
      <Modal
        opened={detailOpened}
        onClose={closeDetail}
        title={<Text fw={700}>{selectedJob?.title}</Text>}
        size="lg"
        centered
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
                <Text size="xl" fw={600} c="blue">
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

            <Divider my="md" />

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

            <Text fw={600} mb="sm">İş Tanımı:</Text>
            <Text mb="lg" style={{ whiteSpace: "pre-line" }}>
              {selectedJob.description}
            </Text>

            <Text fw={600} mb="sm">Gereksinimler:</Text>
            <Group gap="xs" mb="lg">
              {selectedJob.tags.map((tag) => (
                <Badge key={tag} variant="light" color="blue" size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>
          </div>
        )}
      </Modal>

      {/* İlan Ekleme/Düzenleme Modalı */}
      <Modal
        opened={adminOpened}
        onClose={closeAdmin}
        title={<Text fw={700}>{editingJob ? "İlanı Düzenle" : "Yeni İş İlanı Ekle"}</Text>}
        size="lg"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label="İlan Başlığı"
            placeholder="Örn: Frontend Geliştirici"
            value={editingJob ? editingJob.title : newJob.title}
            onChange={(e) => {
              editingJob
                ? setEditingJob({ ...editingJob, title: e.currentTarget.value })
                : setNewJob({ ...newJob, title: e.currentTarget.value });
              if (formErrors.title) setFormErrors({...formErrors, title: ""});
            }}
            required
            error={formErrors.title}
          />

          <TextInput
            label="Şirket Adı"
            placeholder="Şirketinizin adı"
            value={editingJob ? editingJob.company : newJob.company}
            onChange={(e) => {
              editingJob
                ? setEditingJob({ ...editingJob, company: e.currentTarget.value })
                : setNewJob({ ...newJob, company: e.currentTarget.value });
              if (formErrors.company) setFormErrors({...formErrors, company: ""});
            }}
            required
            error={formErrors.company}
          />

          <TextInput
            label="Şirket Logosu URL (Opsiyonel)"
            placeholder="https://..."
            value={editingJob ? editingJob.companyLogo || "" : newJob.companyLogo || ""}
            onChange={(e) => editingJob
              ? setEditingJob({ ...editingJob, companyLogo: e.currentTarget.value })
              : setNewJob({ ...newJob, companyLogo: e.currentTarget.value })}
          />

          <Select
            label="İş Tipi"
            data={typeOptions}
            value={editingJob ? editingJob.type : newJob.type}
            onChange={(value) => editingJob
              ? setEditingJob({ ...editingJob, type: value as any })
              : setNewJob({ ...newJob, type: value as any })}
            required
          />

          <Select
            label="Kategori"
            data={jobCategories}
            value={editingJob ? editingJob.category : newJob.category}
            onChange={(value) => {
              editingJob
                ? setEditingJob({ ...editingJob, category: value || "" })
                : setNewJob({ ...newJob, category: value || "" });
              if (formErrors.category) setFormErrors({...formErrors, category: ""});
            }}
            required
            error={formErrors.category}
          />

          <TextInput
            label="Lokasyon"
            placeholder="Örn: İstanbul, Türkiye"
            value={editingJob ? editingJob.location : newJob.location}
            onChange={(e) => {
              editingJob
                ? setEditingJob({ ...editingJob, location: e.currentTarget.value })
                : setNewJob({ ...newJob, location: e.currentTarget.value });
              if (formErrors.location) setFormErrors({...formErrors, location: ""});
            }}
            required
            error={formErrors.location}
          />
        </SimpleGrid>

        <Textarea
          label="İş Tanımı"
          placeholder="İşin detaylarını açıklayın..."
          value={editingJob ? editingJob.description : newJob.description}
          onChange={(e) => {
            editingJob
              ? setEditingJob({ ...editingJob, description: e.currentTarget.value })
              : setNewJob({ ...newJob, description: e.currentTarget.value });
            if (formErrors.description) setFormErrors({...formErrors, description: ""});
          }}
          mt="md"
          minRows={4}
          required
          error={formErrors.description}
        />

        <Box mt="md">
          <Text size="sm" fw={500} mb={4}>
            Etiketler
          </Text>

          <Group gap={4} mb="sm">
            {(editingJob ? editingJob.tags : newJob.tags).map(tag => (
              <Badge
                key={tag}
                variant="light"
                rightSection={
                  <ActionIcon
                    size="xs"
                    color="gray"
                    onClick={() => editingJob
                      ? setEditingJob({
                        ...editingJob,
                        tags: editingJob.tags.filter(t => t !== tag)
                      })
                      : setNewJob({
                        ...newJob,
                        tags: newJob.tags.filter(t => t !== tag)
                      })
                    }
                  >
                    <IconX size={12} />
                  </ActionIcon>
                }
              >
                {tag}
              </Badge>
            ))}
          </Group>

          <Group>
            <TextInput
              placeholder="Yeni etiket ekle"
              value={tempTag}
              onChange={(e) => setTempTag(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
            />
            <Button variant="outline" onClick={addTag}>
              Ekle
            </Button>
          </Group>
        </Box>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={closeAdmin}>
            İptal
          </Button>
          <Button
            onClick={editingJob ? handleUpdateJob : handleAddJob}
            style={{
              background: `linear-gradient(135deg, ${mainButtonGradient.from} 0%, ${mainButtonGradient.to} 100%)`,
              border: "none",
              color: "white",
            }}
          >
            {editingJob ? "Güncelle" : "İlanı Yayınla"}
          </Button>
        </Group>
      </Modal>
    </Container>
    <FooterSection/>
    </>
  )
}