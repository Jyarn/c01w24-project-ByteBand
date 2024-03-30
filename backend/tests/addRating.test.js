import { MongoClient } from "mongodb";
import {
  SERVER_URL,
  MONGO_URL,
  DB_NAME,
  COLLECTIONS
} from "../constants/constants.js";

let db;
let client;
let washroomId;

async function connectToMongo() {
  client = await MongoClient.connect(MONGO_URL);

  try {
    db = client.db(DB_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

beforeAll(async () => {
  await connectToMongo();
});

afterAll(async () => {
  await client.close();
});

beforeEach(async () => {
  const coll = db.collection(COLLECTIONS.washrooms);
  try {
    await coll.drop({ }); // reset database
  } catch (error) {
    console.log(error.message);
  }
  const insertResult = await coll.insertOne({
    address: "1587 Marshall Street, Baltimore",
    useSchedule: false,
    overrideStatus: false,
    status: "Washroom yucky"
  });
  washroomId = insertResult.insertedId;
});

test("/postRating - Add a rating", async() => {
  const rating = 5;
  const feedback = "Great washroom!";

  const response = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating, feedback: feedback }),
  });

  expect(response.ok).toBe(true);

  const coll = db.collection(COLLECTIONS.washrooms);
  const updatedWashroom = await coll.findOne({ address: "1587 Marshall Street, Baltimore" });
  expect(updatedWashroom.ratings[0].rating).toBe(rating);
  expect(updatedWashroom.ratings[0].feedback).toBe(feedback);
});

test("/postRating -  Invalid washroom id", async() => {
  const rating = 5;
  const feedback = "Great washroom!";

  const response = await fetch(`${SERVER_URL}/postRating/1234`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating, feedback: feedback }),
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(400);
});

test("/postRating - Feedback missing", async() => {
  const rating = 5;

  const response = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating }),
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(400);
});

test("/postRating - Rating missing", async() => {
  const feedback = "Great washroom!";

  const response = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ feedback: feedback }),
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(400);
});