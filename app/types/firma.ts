// /types/firma.ts
export interface Firma {
  id: string;
  ad: string;
  logo: string;          // base64 veya URL
  sektor: string;
  firmaEmail: string;
  webAdres: string;
  yetkiliAdi: string;
  yetkiliTelefon: string;
  yetkiliEmail: string;
  vergiNo: string;
  mersisNo: string;
  hakkimizda: string;
  createdAt?: string;
}
