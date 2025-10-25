import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

type Haber = {
  _id?: ObjectId;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Tek bir haber döner
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });
      }
      const haber = await db.collection("haberler").findOne({ _id: new ObjectId(id) });
      if (!haber) {
        return NextResponse.json({ message: "Haber bulunamadı" }, { status: 404 });
      }
      return NextResponse.json(haber);
    }

    // Eğer id yoksa tüm haberleri döner
    const haberler = await db.collection("haberler").find({}).toArray();
    return NextResponse.json(haberler);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};


// POST → Yeni haber ekle
export async function POST(req: NextRequest) {
  try {
    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return NextResponse.json(
        { message: "Başlık, açıklama ve görsel zorunludur." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mydatabase");

    const newHaber: Haber = {
      title,
      description,
      image,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("haberler").insertOne(newHaber);
    return NextResponse.json({ message: "Haber eklendi!", id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
