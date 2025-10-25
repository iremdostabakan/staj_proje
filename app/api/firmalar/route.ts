// /app/api/firmalar/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// TÜM firmaları listele
export async function GET() {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const firmalar = await collection.find({}).toArray();

  return NextResponse.json(
    firmalar.map((f) => ({
      id: f._id.toString(),
      ad: f.firmaAd,
      logo: f.logo || null,
      sektor: f.sektor || null,
      hakkimizda: f.hakkimizda || null,
      firmaEmail: f.firmaEmail || null,
      webAdres: f.firmaWeb || null,
      yetkiliAdi: f.yetkiliAd || null,
      yetkiliTelefon: f.yetkiliTel || null,
      yetkiliEmail: f.yetkiliEmail || null,
    }))
  );
}

// Yeni firma ekle (JSON)
export async function POST(req: Request) {
  const body = await req.json();
  const { ad, logo, sektor, hakkimizda, firmaEmail, webAdres, yetkiliAdi, yetkiliTelefon, yetkiliEmail } = body;

  if (!ad || !logo || !sektor || !hakkimizda || !firmaEmail || !yetkiliAdi || !yetkiliTelefon || !yetkiliEmail) {
    return NextResponse.json({ success: false, message: "Tüm alanlar doldurulmalı" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const existing = await collection.findOne({ firmaAd: ad });
  if (existing) {
    return NextResponse.json({ success: false, message: "Bu isimde zaten bir firma var" }, { status: 400 });
  }

  const result = await collection.insertOne({ firmaAd: ad, logo, sektor, hakkimizda, firmaEmail, firmaWeb: webAdres, yetkiliAdi, yetkiliTel: yetkiliTelefon, yetkiliEmail });

  return NextResponse.json({
    success: true,
    firma: { id: result.insertedId.toString(), ad, logo, sektor, hakkimizda, firmaEmail, webAdres, yetkiliAdi, yetkiliTelefon, yetkiliEmail },
  });
}

// Firma sil
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) return NextResponse.json({ success: false, message: "ID gerekli" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}

// Firma güncelle
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updatedData } = body;

  if (!id) return NextResponse.json({ success: false, message: "ID gerekli" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  await collection.updateOne({ _id: new ObjectId(id) }, {
    $set: {
      firmaAd: updatedData.ad,
      logo: updatedData.logo,
      sektor: updatedData.sektor,
      hakkimizda: updatedData.hakkimizda,
      firmaEmail: updatedData.firmaEmail,
      firmaWeb: updatedData.webAdres,
      yetkiliAd: updatedData.yetkiliAdi,
      yetkiliTel: updatedData.yetkiliTelefon,
      yetkiliEmail: updatedData.yetkiliEmail
    }
  });

  return NextResponse.json({ success: true });
}
