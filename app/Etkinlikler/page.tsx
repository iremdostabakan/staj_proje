import {Container, Text } from '@mantine/core';
import EventsSection from './components/EventSection';
import HeroSection  from './components/HeroSection';
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

export default function EtkinliklerPage() {
  return (
    <>
   <Header/>
   <HeroSection/>
    <Container size="lg" py="xl">

      <EventsSection />
     
    </Container>
    <FooterSection/>
    </>
  );
}


/* Alttaki kodları mongodb eklenmediği için kullanamadım -Şaban */

// // app/Etkinlikler/page.tsx
// import clientPromise from "../../lib/mongodb";
// import EventSection from "./components/EventSection";

// export const dynamic = "force-dynamic"; // her istekte taze veri

// type Etkinlik = {
//   _id: string;
//   title: string;
//   topic?: string;
//   coverImageUrl?: string;
//   date?: string;       // ISO string (etkinlik tarihi)
//   location?: string;
//   createdAt?: string;  // ISO string (eklenme tarihi)
// };

// async function getEvents(): Promise<Etkinlik[]> {
//   const client = await clientPromise;
//   const db = client.db("ktt");

//   const items = await db
//     .collection("etkinlikler")
//     .find({})
//     .sort({ createdAt: -1 }) // eklenme tarihine göre
//     .toArray();

//   return items.map((item: any) => ({
//     _id: item._id.toString(),
//     title: item.title ?? "",
//     topic: item.topic ?? "",
//     coverImageUrl: item.coverImageUrl ?? "",
//     date: item.date ? new Date(item.date).toISOString() : undefined,
//     location: item.location ?? "",
//     createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : undefined,
//   }));
// }

// export default async function EtkinliklerPage() {
//   const events = await getEvents();
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Başlığı burada ver, içerik EventSection’da */}
//       <EventSection events={events} />
//     </div>
//   );
// }
