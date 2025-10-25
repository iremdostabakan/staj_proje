import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Tek bir firmayı getir
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const f = await collection.findOne({ _id: new ObjectId(params.id) });

  if (!f) {
    return NextResponse.json({ error: "Firma bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({
    id: f._id.toString(),
    firmaAd: f.firmaAd,
    logo: f.logo || null,
    sektor: f.sektor || null,
    hakkimizda: f.hakkimizda || null,
    firmaEmail: f.firmaEmail || null,
    firmaWeb: f.firmaWeb || null,
    yetkiliAd: f.yetkiliAd || null,
    yetkiliTel: f.yetkiliTel || null,
    yetkiliEmail: f.yetkiliEmail || null,
  });
}

// Firma sil
export async function DELETE(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id")?.toString();

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID gerekli" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const firmaCollection = db.collection("firmalar");
  const odemeCollection = db.collection("odemeler");

  await firmaCollection.deleteOne({ _id: new ObjectId(id) });
  await odemeCollection.deleteMany({ firmaId: id });

  return NextResponse.json({ success: true });
}

// Firma güncelle (FormData)
export async function PUT(req: Request) {
  const formData = await req.formData();

  const id = formData.get("id")?.toString();
  const firmaAd = formData.get("firmaAd")?.toString();
  const logo = formData.get("logo")?.toString();
  const sektor = formData.get("sektor")?.toString();
  const hakkimizda = formData.get("hakkimizda")?.toString();
  const firmaEmail = formData.get("firmaEmail")?.toString();
  const firmaWeb = formData.get("firmaWeb")?.toString();
  const yetkiliAd = formData.get("yetkiliAd")?.toString();
  const yetkiliTel = formData.get("yetkiliTel")?.toString();
  const yetkiliEmail = formData.get("yetkiliEmail")?.toString();

  if (
    !id || !firmaAd || !logo || !sektor || !hakkimizda ||
    !firmaEmail || !firmaWeb || !yetkiliAd || !yetkiliTel || !yetkiliEmail
  ) {
    return NextResponse.json(
      { success: false, message: "Tüm alanlar gerekli" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { firmaAd, logo, sektor, hakkimizda, firmaEmail, firmaWeb, yetkiliAd, yetkiliEmail, yetkiliTel } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { success: false, message: "Firma bulunamadı veya güncellenemedi" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Firma güncellendi" });
}
