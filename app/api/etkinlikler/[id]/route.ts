import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ID'yi kontrol et
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("ktt");
    const item = await db.collection("etkinlikler").findOne({ _id: new ObjectId(params.id) });

    if (!item) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    
    return NextResponse.json({ 
      ...item, 
      _id: item._id.toString(),
      date: item.date.toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ID'yi kontrol et
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("ktt");
    const body = await req.json();

    const updated = await db.collection("etkinlikler").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } }
    );

    if (updated.matchedCount === 0) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

    const updatedItem = await db.collection("etkinlikler").findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ 
      ...updatedItem, 
      _id: updatedItem?._id.toString(),
      date: updatedItem?.date.toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ID'yi kontrol et
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("ktt");

    const deleted = await db.collection("etkinlikler").deleteOne({ _id: new ObjectId(params.id) });

    if (deleted.deletedCount === 0) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}