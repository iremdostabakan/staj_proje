import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");
    const data = await req.json();

    const result = await db.collection("duyurular").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Duyuru bulunamadı" }, { status: 404 });
    }

    const updated = await db.collection("duyurular").findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ ...updated, _id: updated?._id.toString() });
  } catch (err: any) {
    console.error("PUT duyuru hatası:", err);
    return NextResponse.json({ message: "Duyuru güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("ktt");

    const result = await db.collection("duyurular").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Duyuru bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE duyuru hatası:", err);
    return NextResponse.json({ message: "Duyuru silinemedi" }, { status: 500 });
  }
}
