import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Onay kodu gerekli" },
        { status: 400 }
      );
    }

    // JSON dosya yolu
    const filePath = path.join(process.cwd(), "lib", "codeStore.json");

    // Dosya var mı kontrol et
    let rawData;
    try {
      rawData = await fs.readFile(filePath, "utf-8");
    } catch {
      return NextResponse.json(
        { success: false, message: "Onay kodu bulunamadı" },
        { status: 400 }
      );
    }

    const data = rawData ? JSON.parse(rawData) : {};

    // Kod eşleşiyor mu?
    // if (data.code && data.code === code) {
    //   // ✅ Kod doğru → JSON dosyasını temizleyelim
    //   // !!!!!!!!!!!!!aaaaaaaaaaaaaaaaaaaaağ

    //   return NextResponse.json({ success: true });
      
    // }
        if (data.code && data.code === code) {
      // ✅ Kod doğru → JSON’dan sil
      delete data.code;
      delete data.phoneNumber; // eğer telefon numarasını da tutuyorsan

      // Güncellenmiş JSON’u yaz
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

      return NextResponse.json({ success: true });
    }

    // Yanlış kod
    return NextResponse.json(
      { success: false, message: "Onay kodu hatalı" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
