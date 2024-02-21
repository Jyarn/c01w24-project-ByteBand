import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "GoHereDB";

// Database collection names
const COLLECTIONS = {
  washroomSubmissions: "Washroom Submissions"
};

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

// Post a washroom submission request to the database
app.post("/submitWashroom", express.json(), async (req, res) => {
  try {
    const { type, name, address, city, province, email } = req.body;
    const createdAt = new Date();

    // Check that the submission type is User or Business
    if (!type || (type != "User" && type != "Business")) {
      return res
        .status(400)
        .json({ error: "Submission type must be 'User' or 'Business'."});
    }

    // Check that the full address is given
    if (!address || !city || !province) {
        return res
          .status(400)
          .json({ error: "The full address of the location is required."});
    }

    // Send submission info to database
    const collection = db.collection(COLLECTIONS.washroomSubmissions);
    const result = await collection.insertOne({
      type,
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