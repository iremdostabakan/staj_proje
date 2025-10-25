// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const jobs = await db
      .collection("jobs")
      .find({})
      .map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(), // ObjectId'yi stringe çevir
      }))
      .toArray();

    return NextResponse.json(jobs);
  } catch (err: any) {
    console.error("GET hatası:", err);
    return NextResponse.json(
      { message: "İlanlar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const data = await req.json();

    // responsibleEmail doğrulama (opsiyonel alan)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.responsibleEmail && !emailRegex.test(String(data.responsibleEmail))) {
      return NextResponse.json(
        { message: "Geçersiz responsibleEmail formatı" },
        { status: 400 }
      );
    }

    const jobDoc = {
      ...data,
      responsibleEmail: data.responsibleEmail ? String(data.responsibleEmail) : null,
      createdAt: new Date(),
    };

    const result = await db.collection("jobs").insertOne(jobDoc);

    return NextResponse.json({
      ...jobDoc,
      _id: result.insertedId.toString(), // ObjectId'yi stringe çevir
    });
  } catch (err: any) {
    console.error("POST hatası:", err);
    return NextResponse.json(
      { message: "İlan oluşturulamadı" },
      { status: 500 }
    );
  }
}
