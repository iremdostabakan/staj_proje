import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET → Tek medya
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const media = await db.collection("media").findOne({ _id: new ObjectId(params.id) });

    if (!media) return NextResponse.json({ message: "Medya bulunamadı" }, { status: 404 });
    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// TEKİL MEDYA GÜNCELLE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔑 params burada await ediliyor
    const { url } = await req.json();

    const client = await clientPromise;
    const db = client.db("mydatabase");

    const result = await db.collection("media").updateOne(
      { _id: new ObjectId(id) },
      { $set: { url } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Medya bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Medya güncellendi!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// TEKİL MEDYA SİL
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔑 await gerekiyor
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const result = await db.collection("media").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Medya bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Medya silindi!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}