import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

//
// 📌 GET endpoint (borç sorgulama)
//
export async function GET(req: Request) {
  try {
    // 1) Parametre var mı?
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Telefon numarası gerekli" },
        { status: 400 }
      );
    }

    // 2) DB bağlantısı
    const client = await clientPromise;
    const db = client.db("testdb");
    const debts = db.collection("odemeler");

    // 3) Borç kaydı var mı?
    const record = await debts.findOne({
      phoneNumber,
      odemeDurumu: "Bekliyor",
    });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Bekleyen borç bulunamadı" },
        { status: 404 }
      );
    }

    // 4) Başarılı yanıt
    return NextResponse.json({
      success: true,
      company: record.firmaAdi,
      amount: record.tutar,
      dueDate: record.sonOdemeTarihi,
    });
  } catch (err: any) {
    // 5) Sunucu hatası
    return NextResponse.json(
      { success: false, message: err.message || "Sunucu hatası" },
      { status: 500 }
    );
  }
}

//
// 📌 POST endpoint (ödeme yapma)
//
export async function POST(req: Request) {
  try {
    // 1) Body'den telefon numarasını al
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Telefon numarası gerekli" },
        { status: 400 }
      );
    }

    // 2) DB bağlantısı
    const client = await clientPromise;
    const db = client.db("testdb");
    const debts = db.collection("odemeler");

    // 3) Bekleyen borç var mı?
    const record = await debts.findOne({
      phoneNumber,
      odemeDurumu: "Bekliyor",
    });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Bekleyen borç bulunamadı" },
        { status: 404 }
      );
    }

    // 4) Borcu güncelle
    const result = await debts.updateOne(
      { _id: record._id },
      { $set: { odemeDurumu: "Ödendi", odemeTarihi: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Borç güncellenemedi" },
        { status: 400 }
      );
    }

    // 5) Başarılı yanıt
    return NextResponse.json({ success: true, message: "Ödeme başarılı" });
  } catch (err: any) {
    // 6) Sunucu hatası
    return NextResponse.json(
      { success: false, message: err.message || "Sunucu hatası" },
      { status: 500 }
    );
  }
}
