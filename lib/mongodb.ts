// lib/mongodb.ts

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Geliştirme modunda, hot-reloading nedeniyle yeni bağlantıların
  // birikmesini önlemek için global bir değişken kullanın.
  let globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Üretim modunda, global değişken kullanmak daha basit.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;