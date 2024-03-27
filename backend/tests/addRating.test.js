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
    try {
        await coll.deleteMany({ }); 
    } catch (error) {
        console.log(error.message);
    }
    await coll.insertOne({
      address: "1587 Marshall Street, Baltimore",
      useSchedule: false,
      overrideStatus: false,
      status: "Washroom yucky"
    });
});

test("add rating - 0 ratings", async() => {
  const rating = "5";
  const feedback = "Great!";

  const res = await fetch(`${SERVER_URL}/postRating/${washroomId}`)
});

