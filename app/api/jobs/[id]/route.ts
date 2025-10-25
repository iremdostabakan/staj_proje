// app/api/jobs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "İlan bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE hatası:", err);
    return NextResponse.json({ message: "İlan silinemedi" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const data = await req.json();

    // responsibleEmail doğrulama (opsiyonel alan)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.responsibleEmail && !emailRegex.test(String(data.responsibleEmail))) {
      return NextResponse.json({ message: "Geçersiz responsibleEmail formatı" }, { status: 400 });
    }

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "İlan bulunamadı" }, { status: 404 });
    }

    // Güncellenen dokümanı tekrar çek
    const updatedJob = await db.collection("jobs").findOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({
      ...updatedJob,
      _id: updatedJob?._id.toString(), // ObjectId'yi stringe çevir
    });
  } catch (err: any) {
    console.error("PUT hatası:", err);
    return NextResponse.json({ message: "İlan güncellenemedi" }, { status: 500 });
  }
}
