import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import parseWashroomTimes from './parseWashroomTimes.js';

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "GoHereDB";

// Connect to MongoDB
let db;

async function connectToMongo() {
  const client = new MongoClient(mongoURL);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();

// Open Port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors());

const COLLECTIONS = {
    washroomSubmissions: "Washroom Submissions",
    washrooms: "Washrooms",
};

app.get('')

// Post a washroom submission request to the database
app.post("/submitWashroom", express.json(), async (req, res) => {
  try {
    const { name, address, city, province, email } = req.body;
    const createdAt = new Date();

    // Check that the full address is given
    if (!address || !city || !province) {
        return res
          .status(400)
          .json({ error: "The full address of the location is required."});
    }

    // Send submission info to database
    const collection = db.collection(COLLECTIONS.washroomSubmissions);
    const result = await collection.insertOne({
      name,
      address,
      city,
      province,
      email,
      createdAt
    });

    res.json({
      response: "Washroom submission added successfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getAllWashrooms", express.json(), async (req, res) => {
    try {
        const coll = db.collection(COLLECTIONS.washrooms);
        const data = await coll.find().toArray();
        res.status(200).json({ response: data });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
});

app.get("/getWashroom/:id", express.json(), async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ response: "Invalid note ID." });

        const coll = db.collection(COLLECTIONS.washrooms);
        const data = await coll.findOne ({ _id: new ObjectId(id) });
        if (!data)
            return res.status(404).json({ response: "unable to get washroom" });
        res.status(200).json({ response: data });
    } catch (error) {
        res.status(500).json({ response: error.message});
    }
});

app.get("/checkAvailabilitydemo", express.json(), async (req, res) => {
  const id = req.params.id;
  try {
    const schedule = await parseWashroomTimes();
    res.json(schedule);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message});
  }
});

app.get("/checkAvailability/:id", express.json(), async (req, res) => {
    const { id } = req.params;
    const day = req.query.day;
    const hr  = req.query.hr;
    const min = req.query.min;

    if (!ObjectId.isValid(id) || !day || !hr || !min)
        return res.status(400).json({ response: "Invalid washroom id"});

    try {
        const timehash = Number(hr)*60 + Number(min);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const coll = db.collection(COLLECTIONS.washrooms);
        const data = await coll.findOne({ _id: new ObjectId(id) });

        if (!data)
            return res.status(404).json({ response: "Unable to get data" });
        
        let response = false;

        data.times[days[Number(day)]].forEach((t, _) => {
            console.log(t.start, t.end, timehash);
            if (t.start <= timehash && timehash <= t.end)
                response = true;
                return;
        })

        return res.status(200).json({ response: response });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ response: error.message});
    }
});
