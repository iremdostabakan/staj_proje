import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ Tüm ödemeleri listele
export async function GET() {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("odemeler");

  const odemeler = await collection.find({}).toArray();

  return NextResponse.json(
    odemeler.map((o) => ({
      id: o._id.toString(),
      firmaId: o.firmaId,
      firmaAdi: o.firmaAdi,
      tutar: o.tutar,
      sonOdemeTarihi: o.sonOdemeTarihi,
      odemeDurumu: o.odemeDurumu,
      phoneNumber: o.phoneNumber,
      createdAt: o.createdAt || null,
    }))
  );
}

// ✅ Yeni ödeme ekle
export async function POST(req: Request) {
  const { firmaId, firmaAdi, tutar, sonOdemeTarihi, odemeDurumu, phoneNumber } = await req.json();

  if (!firmaId || !firmaAdi || !tutar || !sonOdemeTarihi || !odemeDurumu || !phoneNumber) {
    return NextResponse.json(
      { success: false, message: "Tüm alanlar doldurulmalı" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("odemeler");

  const result = await collection.insertOne({
    firmaId,
    firmaAdi,
    tutar,
    sonOdemeTarihi,
    odemeDurumu,
    phoneNumber,
    createdAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    odeme: {
      id: result.insertedId.toString(),
      firmaId,
      firmaAdi,
      tutar,
      sonOdemeTarihi,
      odemeDurumu,
      phoneNumber,
    },
  });
}

// ✅ Ödeme güncelle
export async function PUT(req: Request) {
  const { id, firmaId, firmaAdi, tutar, sonOdemeTarihi, odemeDurumu, phoneNumber } =
    await req.json();

  if (!id || !firmaId || !firmaAdi || !tutar || !sonOdemeTarihi || !odemeDurumu || !phoneNumber) {
    return NextResponse.json(
      { success: false, message: "Tüm alanlar gerekli" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("odemeler");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { firmaId, firmaAdi, tutar, sonOdemeTarihi, odemeDurumu, phoneNumber },
    }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { success: false, message: "Ödeme bulunamadı veya güncellenemedi" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    odeme: { id, firmaId, firmaAdi, tutar, sonOdemeTarihi, odemeDurumu, phoneNumber },
  });
}

// ✅ Ödeme sil
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: "ID gerekli" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("odemeler");

  await collection.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}
