import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const duyurular = await db.collection("duyurular").find({}).map(doc => ({
      ...doc,
      _id: doc._id.toString(),
    })).toArray();

    return NextResponse.json(duyurular);
  } catch (err: any) {
    console.error("GET duyurular hatası:", err);
    return NextResponse.json(
      { message: "Duyurular yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const data = await req.json();

    const result = await db.collection("duyurular").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({
      ...data,
      _id: result.insertedId.toString(),
    });
  } catch (err: any) {
    console.error("POST duyurular hatası:", err);
    return NextResponse.json(
      { message: "Duyuru eklenemedi" },
      { status: 500 }
    );
  }
}
