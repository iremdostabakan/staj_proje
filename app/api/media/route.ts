import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

type MediaItem = {
  url: string;
  createdAt: string;
};

// GET → Tüm medya
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const media = await db.collection("media").find({}).toArray();
    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST → Yeni medya ekle
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const newMedia: MediaItem = {
      url,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("media").insertOne(newMedia);
    return NextResponse.json({ message: "Medya eklendi!", id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
