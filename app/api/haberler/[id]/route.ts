import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";


const toObjectId = (id: string) => {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};

// GET → Tek haberi getir
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const resolvedParams = await params;
const { id } = resolvedParams;

  const objectId = toObjectId(id);
  if (!objectId) return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });
  
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const haber = await db.collection("haberler").findOne({ _id: objectId });

    if (!haber) return NextResponse.json({ message: "Haber bulunamadı" }, { status: 404 });
    return NextResponse.json(haber);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT → Haber güncelle
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const objectId = toObjectId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("mydatabase");
 
    const result = await db.collection("haberler").updateOne(
      { _id: objectId },
      { $set: { title: body.title, description: body.description, image: body.image } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Haber bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Haber güncellendi!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE → Haber sil
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const resolvedParams = await params;  // params’i çöz
  const { id } = resolvedParams;  
  const objectId = toObjectId(id);
  if (!objectId) return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const result = await db.collection("haberler").deleteOne({ _id: objectId });
    if (result.deletedCount === 0)
      return NextResponse.json({ message: "Haber bulunamadı" }, { status: 404 });

    return NextResponse.json({ message: "Haber silindi!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}