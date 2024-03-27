import { MongoClient } from "mongodb";
import {
  SERVER_URL,
  MONGO_URL,
  DB_NAME
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
  const coll = db.collection("Washrooms");
  await coll.deleteMany({ }); 
  const insertResult = await coll.insertOne({
    address: "1587 Marshall Street, Baltimore",
    useSchedule: false,
    overrideStatus: false,
    status: "Washroom yucky"
  });
  washroomId = insertResult.insertedId;
});

test("add rating", async() => {
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

  const coll = db.collection("Washrooms");
  const updatedWashroom = await coll.findOne({ address: "1587 Marshall Street, Baltimore" });
  expect(updatedWashroom.ratings[0].rating).toBe(rating);
  expect(updatedWashroom.ratings[0].feedback).toBe(feedback);
});

test("add rating - invalid washroom id", async() => {
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

test("add rating - feedback missing", async() => {
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

test("add rating - rating missing", async() => {
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

test("get rating - no ratings", async() => {
  const response = await fetch(`${SERVER_URL}/getRating/${washroomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  expect(response.ok).toBe(true);
  expect(body.ratings).toEqual([]);
});

test("get rating - invalid washroom id", async() => {
  const response = await fetch(`${SERVER_URL}/getRating/1234`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(400);
});

test("get rating - washroom not found", async() => {
  const response = await fetch(`${SERVER_URL}/getRating/66039f018e73a18092a25b25`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(404);
});

test("get rating - ratings available", async() => {
  const rating = 5;
  const feedback = "Great washroom!";

  const postResponse = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating, feedback }),
  });

  expect(postResponse.ok).toBe(true);

  const getResponse = await fetch(`${SERVER_URL}/getRating/${washroomId}`);
  expect(getResponse.ok).toBe(true);

  const responseData = await getResponse.json();
  const addedRating = responseData.ratings.find(r => r.feedback === feedback && r.rating === rating);

  expect(addedRating).toBeDefined();
  expect(addedRating.rating).toBe(rating);
  expect(addedRating.feedback).toBe(feedback);
});

test("get rating - multiple ratings available", async() => {
  const rating1 = 5;
  const feedback1 = "Great washroom!";
  const rating2 = 1;
  const feedback2 = "Terrible washroom!";

  const postResponse1 = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating1, feedback: feedback1 }),
  });

  expect(postResponse1.ok).toBe(true);

  const postResponse2 = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating2, feedback: feedback2 }),
  });

  expect(postResponse2.ok).toBe(true);

  const getResponse = await fetch(`${SERVER_URL}/getRating/${washroomId}`);
  expect(getResponse.ok).toBe(true);

  const responseData = await getResponse.json();
  const addedRating1 = responseData.ratings.find(r => r.feedback === feedback1 && r.rating === rating1);
  const addedRating2 = responseData.ratings.find(r => r.feedback === feedback2 && r.rating === rating2);

  expect(addedRating1).toBeDefined();
  expect(addedRating1.rating).toBe(rating1);
  expect(addedRating1.feedback).toBe(feedback1);

  expect(addedRating2).toBeDefined();
  expect(addedRating2.rating).toBe(rating2);
  expect(addedRating2.feedback).toBe(feedback2);
});