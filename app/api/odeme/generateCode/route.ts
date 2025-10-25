import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Telefon numarası gerekli" },
        { status: 400 }
      );
    }

    // MongoDB bağlantısı
    const client = await clientPromise;
    const db = client.db("testdb"); // ✅ doğru db
    const debts = db.collection("odemeler"); // ✅ doğru collection

        // ✅ Telefon numarası veritabanında kayıtlı mı?
    const user = await debts.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Bu telefon numarası kayıtlı değil" },
        { status: 404 }
      );
    }

    // Random kod üret
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // JSON dosya yolu
    const filePath = path.join(process.cwd(), "lib", "codeStore.json");

    // JSON içine kaydet
    await fs.writeFile(filePath, JSON.stringify({ phoneNumber, code }));

    return NextResponse.json({
      success: true,
      message: "Onay kodu başarıyla gönderildi",
      code, // (şimdilik test için frontende dönüyoruz)
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
