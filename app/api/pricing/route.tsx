import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public/data/pricing.json");

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data: any) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = readData();
  data.push(body);
  writeData(data);
  return NextResponse.json({ success: true });
}

// PUT → Güncelle
export async function PUT(req: Request) {
  const { index, updatedPlan } = await req.json();
  const data = readData();
  data[index] = updatedPlan;
  writeData(data);
  return NextResponse.json({ success: true });
}

// DELETE → Sil
export async function DELETE(req: Request) {
  const { index } = await req.json();
  const data = readData();
  data.splice(index, 1);
  writeData(data);
  return NextResponse.json({ success: true });
}
