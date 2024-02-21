import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

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
    washrooms: "washrooms",
};

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
        const data = await db.collection.find().toArray();
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

        const data = await db.collection.findOne ({ _id: new ObjectId(id) });
        if (!data)
            return res.status(404).json({ response: "unable to get washroom" });
        res.status(200).json({ response: data });
    } catch (error) {
        res.status(500).json({ response: error.message});
    }
});
/*
{
    ...
    times: {
        "Sunday": [
            {start: , end: }, {...}
        ],
        "Monday": [...],
        ...
    }
}
*/
app.get("/checkAvailability/:id", express.json(), async (req, res) => {
    const { id } = req.params;
    const { time } = req.body;

    if (!ObjectId.isValid(id) || !time)
        return res.status(400).json({ response: "Invalid washroom id"});

    try {
        const date = new Date(time);
        const timehash = date.getHours()*60 + date.getMinutes();

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const times = await db.collection.findOne({ _id: new Object(id), times: days[date.getDay()] });
        times.forEach((t, _) => {
            if (t.start <= timehash && timehash <= t.end)
                return res.status(200).json({ response: true });
        })

        return res.status(200).json({ response: false });
    } catch (error) {
        res.status(500).json({ response: error.message});
    }
});
