import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
const items = await db.collection("etkinlikler").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(
      items.map(item => ({ 
        ...item, 
        _id: item._id.toString(),
        date: item.date.toISOString().split('T')[0]
      }))
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Form verilerini al
    const title = formData.get("title") as string;
    const topic = formData.get("topic") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const file = formData.get("file") as File | null;

    let coverImageUrl = "";

    // Dosya yükleme işlemi
    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Benzersiz dosya adı oluştur
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(uploadDir, fileName);
        
        // Klasörü kontrol et ve oluştur (gerekirse)
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Dosyayı diske yazma
        await writeFile(filePath, buffer);
        coverImageUrl = `/uploads/${fileName}`;
      } catch (fileError: any) {
        console.error("Dosya yükleme hatası:", fileError);
        return NextResponse.json(
          { error: "Dosya yüklenirken bir hata oluştu: " + fileError.message },
          { status: 500 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db("ktt");

    // Tarih ve saati birleştir
    const dateTime = new Date(`${date}T${time}`);

    const result = await db.collection("etkinlikler").insertOne({
      title,
      coverImageUrl,
      topic,
      date: dateTime,
      location,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      _id: result.insertedId.toString(),
      title,
      coverImageUrl,
      topic,
      date: dateTime.toISOString(),
      location,
      createdAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("API hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}