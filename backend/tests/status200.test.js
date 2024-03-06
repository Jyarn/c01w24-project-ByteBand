const { MongoClient } = require('mongodb');

const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "GoHereDB";
const SERVER_URL = "http://localhost:4000";

let db;
let client;

async function connectToMongo() {
  client = await MongoClient.connect(mongoURL);

  try {
    db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

beforeAll(async () => {
  await connectToMongo();
});

beforeEach(async () => {
  // Store every collection in database in array
  const collections = await db.listCollections().toArray();

  // Delete every document in every collection
  for (const collection of collections) {
    await db.collection(collection.name).deleteMany({});
  }
});

afterAll(async () => {
  await client.close();
});

test("/submitWashroom - Post a washroom submission by an user", async () => {
  const type = "User";
  const name = "IGA supermarche";
  const address = "1234 Rue du Pont, Saint-Lambert-de-Lauzon, QC G0S 2W0, Canada";
  const city = "Saint-Lambert-de-Lauzon";
  const province = "Quebec";
  const postal = "A1B 2C3"
  const email = "user123@gmail.com";

  const postRes = await fetch(`${SERVER_URL}/submitWashroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      name: name,
      address: address,
      city: city,
      province: province,
      postal: postal,
      email: email,
    }),
  });

  const postBody = await postRes.json();
  expect(postRes.status).toBe(200);
  expect(postBody.response).toBe("Washroom submission added successfully.");
});

test("/submitWashroom - Post a washroom submission by a business", async () => {
  const type = "Business";
  const name = "IGA supermarche";
  const address = "1234 Rue du Pont, Saint-Lambert-de-Lauzon, QC G0S 2W0, Canada";
  const city = "Saint-Lambert-de-Lauzon";
  const province = "Quebec";
  const email = "user123@gmail.com";

  const postRes = await fetch(`${SERVER_URL}/submitWashroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      name: name,
      address: address,
      city: city,
      province: province,
      postal: postal,
      email: email,
    }),
  });

  const postBody = await postRes.json();
  expect(postRes.status).toBe(200);
  expect(postBody.response).toBe("Washroom submission added successfully.");
});
