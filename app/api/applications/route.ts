// /app/api/applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "../../../lib/mongodb";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobId, applicant } = body;

    const client = await clientPromise;
    const db = client.db("ktt"); // Veritabanı adını ktt olarak güncelledim
    
    // İlan bilgilerini çek
    const jobs = db.collection("jobs");
    const job = await jobs.findOne({ 
      _id: new ObjectId(jobId) 
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Başvuruyu kaydet
    const applications = db.collection("applications");
    const doc = {
      jobId: new ObjectId(jobId),
      applicant: {
        name: applicant.name,
        surname: applicant.surname,
        email: applicant.email,
        phone: applicant.phone,
        cvBase64: applicant.cv || null,
      },
      createdAt: new Date(),
      status: "pending",
    };

    const result = await applications.insertOne(doc);

    // Email ayarları
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // CV ekini hazırla
    const attachments: any[] = [];
    if (applicant.cv) {
      const base64Data = applicant.cv.split(',')[1] || applicant.cv;
      attachments.push({
        filename: `CV_${applicant.name}_${applicant.surname}.pdf`,
        content: base64Data,
        encoding: 'base64'
      });
    }

    // Email içeriği
    const mailHtml = `
      <h2>Yeni İlan Başvurusu</h2>
      <p><strong>Pozisyon:</strong> ${job.title}</p>
      <p><strong>Aday:</strong> ${applicant.name} ${applicant.surname}</p>
      <p><strong>Email:</strong> ${applicant.email}</p>
      <p><strong>Telefon:</strong> ${applicant.phone}</p>
      <p><strong>Başvuru Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>
    `;

    // Email gönderimi - job.responsibleEmail yerine job.contactEmail kullanıyorum
    await transporter.sendMail({
      from: `"No-Reply" <${process.env.MAIL_FROM}>`,
      to: job.responsibleEmail, // İlanı veren şirketin emaili
      cc: applicant.email, // Başvuran kişinin emaili
      subject: `Yeni Başvuru: ${job.title} - ${job.company}`,
      html: mailHtml,
      attachments
    });

    return NextResponse.json({ 
      success: true, 
      applicationId: result.insertedId 
    });

  } catch (err) {
    console.error("Application error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}