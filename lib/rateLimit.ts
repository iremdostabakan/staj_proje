// Rate limit için her IP'nin durumunu tutacak arayüz
interface RateLimitEntry {
    count: number;        // IP'nin yaptığı başarısız giriş denemesi sayısı
    firstAttempt: number; // İlk yanlış girişin zaman damgası (timestamp, ms)
}

// Tüm IP denemelerini saklayan obje
// Key: IP adresi, Value: RateLimitEntry
const attempts: Record<string, RateLimitEntry> = {};

// Rate limit kontrol fonksiyonu
// ip: kontrol edilecek IP
// limit: izin verilen maksimum deneme sayısı (default: 5)
// windowMs: zaman penceresi, milisaniye cinsinden (default: 60 saniye)
export function checkRateLimit(
    ip: string,
    limit = 5,
    windowMs = 60 * 1000
): { allowed: boolean; retryAfter?: number } {

    const now = Date.now(); // Şu anki zamanı al

    // Eğer IP daha önce denememişse, yeni kayıt oluştur
    if (!attempts[ip]) {
        attempts[ip] = { count: 1, firstAttempt: now };
        return { allowed: true }; // Giriş izni ver
    }

    const entry = attempts[ip]; // Mevcut IP kaydını al

    // Eğer zaman penceresi geçmişse, sayacı sıfırla ve pencereyi yeniden başlat
    if (now - entry.firstAttempt > windowMs) {
        attempts[ip] = { count: 1, firstAttempt: now };
        return { allowed: true }; // Giriş izni ver
    }

    entry.count++; // Aynı pencere içinde deneme sayısını artır

    // Eğer deneme sayısı limiti aşıyorsa
    if (entry.count > limit) {
        // Kalan bekleme süresini saniye cinsinden hesapla
        const retryAfter = Math.ceil((windowMs - (now - entry.firstAttempt)) / 1000);
        return { allowed: false, retryAfter }; // Girişi engelle ve bekleme süresi gönder
    }

    // Limit aşılmamışsa giriş izni ver
    return { allowed: true };
}

// Başarılı giriş sonrası IP'nin rate limit bilgisini sıfırlamak için
export function resetRateLimit(ip: string) {
    delete attempts[ip]; // attempts objesinden IP kaydını sil
}

// Client tarafında kalan bekleme süresini göstermek için fonksiyon
export function getRemainingTime(ip: string, windowMs = 60 * 1000): number {
    const now = Date.now();
    const entry = attempts[ip]; // IP kaydını al
    if (!entry) return 0; // IP yoksa 0 saniye kalmış demektir
    const remaining = Math.ceil((windowMs - (now - entry.firstAttempt)) / 1000);
    return remaining > 0 ? remaining : 0; // Sıfırdan küçükse 0 döndür
}
