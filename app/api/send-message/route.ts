import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "iremdostabakan2@gmail.com",  // Gmail adresin
      pass: "ymsi vrpq gdfg wfze",     // Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "iremdostabakan2@gmail.com",    // Hedef mail
      replyTo: `${email}`, // Kullanıcının maili burada
      subject: `Yeni mesaj: ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Mail gönderilemedi" }), { status: 500 });
  }
}
