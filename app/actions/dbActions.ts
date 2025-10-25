// app/actions/dbActions.ts
"use server";

import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// Firma ekleme
export async function addFirma(ad: string, sektor: string) {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const result = await collection.insertOne({
    ad,
    sektor,
    createdAt: new Date(),
  });

  return { success: true, id: result.insertedId.toString() };
}

// Firma listesini çekme
export async function getFirmalar() {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  const firmalar = await collection.find({}).toArray();

  // ObjectId'yi string'e çevir
  return firmalar.map((f) => ({
    _id: f._id.toString(),
    ad: f.ad,
    sektor: f.sektor,
  }));
}

// Firma silme
export async function removeFirma(id: string) {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  await collection.deleteOne({ _id: new ObjectId(id) });
  return { success: true };
}

// Firma güncelleme
export async function updateFirma(id: string, ad: string, sektor: string) {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("firmalar");

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ad, sektor } }
  );
  return { success: true };
}
