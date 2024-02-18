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

app.patch("/updateWashroomTimes/:noteid", express.json(), async (req, res) => {
    const { noteid } = req.params;
    const { times} = req.body;

    if (!ObjectId.isValid (noteid))
        return res.status(400).json({ error: "Invalid note ID." });

    try {
        const collection = db.collection("washrooms");
        await collection.updateOne({ _id: new ObjectId(noteid) }, {$set: { times }});
        res.status(200).json({ response: `${noteid} washroom times updated successfully.` });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
});
