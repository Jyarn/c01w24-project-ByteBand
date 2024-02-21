const { MongoClient } = require('mongodb');

const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "GoHereDB";
const SERVER_URL = "http://localhost:4000";

let db;
let client;
let washroomids;

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
    const coll = db.collection("Washrooms");
    await coll.drop({ }); // reset database

    const res = await coll.insertMany([{
            times: {
                "Sunday": [],
                "Monday": [],
                "Tuesday": [],
                "Wednesday": [],
                "Thursday": [],
                "Friday": [],
                "Saturday": [],
            }
        },
        {
            times: {
                "Sunday": [{ start: 540, end: 1350 }],
                "Monday": [],
                "Tuesday": [],
                "Wednesday": [],
                "Thursday": [],
                "Friday": [],
                "Saturday": [],
            }
        }
    ]);

    washroomids = Object.values(res.insertedIds);
});

afterAll(async () => {
  await client.close();
});


test("check availability - no times available", async () =>{
    const res = await fetch(`${SERVER_URL}/checkAvailability/${washroomids[0]}?day=0&hr=22&min=35`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.response).toBe(false);
});

test("check availability - time available", async () =>{
    const res = await fetch(`${SERVER_URL}/checkAvailability/${washroomids[1]}?day=0&hr=21&min=35`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.response).toBe(true);
});
