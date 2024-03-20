import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import parseWashroomTimes from './parseWashroomTimes.js';
import {
  SERVER_HOST,
  SERVER_PORT,
  SERVER_URL,
  MONGO_URL,
  COLLECTIONS,
  DB_NAME
} from "./constants/constants.js";

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "GoHereDB";

// Database collection names
const COLLECTIONS = {
  washroomSubmissions: "Washroom Submissions",
  washrooms: "Washrooms",
  businessAcknowledgement: "Business Acknowledgement",
};

// Connect to MongoDB
let db;

async function connectToMongo() {
  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db(DB_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();


// Open Port
app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on ${SERVER_URL}`);
});

app.use(cors());

// Post a washroom submission request to the database
app.post("/submitWashroom", express.json(), async (req, res) => {
  try {
    const { type, name, address, city, province, postal, email } = req.body;
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

    if (!postal) {
      return res
        .status(400)
        .json({error: "A postal address is required." });
    }

    // Send submission info to database
    const collection = db.collection(COLLECTIONS.washroomSubmissions);
    const result = await collection.insertOne({
      type,
      name,
      address,
      city,
      province,
      postal,
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
    try {
        const coll = db.collection(COLLECTIONS.washrooms);
        const data = await coll.find().toArray();
        if (!data || data.length != 0) {
            const times = data[0].times;

            for (const day in times) {
                times[day].forEach((time) => {
                    const start_hr = Math.floor(time.start / 60).toString();
                    const start_min = (time.start % 60).toString();

                    const end_hr = Math.floor(time.end / 60).toString();
                    const end_min = (time.end % 60).toString();

                    time.start = `${start_hr}:${start_min.length == 1 ? start_min + "0" : start_min }`;
                    time.end = `${end_hr}:${end_min.length == 1 ? end_min + "0" : end_min }`;
                });
            }
            return res.status(200).json({ response: times });

        } else {
            const schedule = parseWashroomTimes();
            return res.status(200).json({ response: schedule });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message});
    }
});

app.get("/getWashroomTimes/:id", express.json(), async(req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ response: "Invalid note ID." });

        const coll = db.collection(COLLECTIONS.washrooms);
        const data = await coll.findOne ({ _id: new ObjectId(id) });
        if (!data)
            return res.status(404).json({ response: "unable to get washroom" });

        const times = data.times;

        for (const day in times) {
            times[day].forEach((time) => {
                const start_hr = Math.floor(time.start / 60).toString();
                const start_min = (time.start % 60).toString();

                const end_hr = Math.floor(time.end / 60).toString();
                const end_min = (time.end % 60).toString();

                time.start = `${start_hr}:${start_min.length == 1 ? start_min + "0" : start_min }`;
                time.end = `${end_hr}:${end_min.length == 1 ? end_min + "0" : end_min }`;
            });
        }

        res.status(200).json({ response: times });
    } catch (error) {
        res.status(500).json({ response: error.message});
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

        let ret = false;
        data.times[days[Number(day)]].forEach((t, _) => {
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

// Post a washroom rating and feedback to the database
app.patch("/postRating/:washroomId", express.json(), async (req, res) => {
    try {
      // check if washroom ID is valid
      const washroomId = req.params.washroomId;
      if (!ObjectId.isValid(washroomId)) {
        return res.status(400).json({ error: "Invalid washroom ID." });
      }
  
      // assuming both rating and feedback are required  
      // ### may want to store the user who submitted the rating ###
      const { rating, feedback } = req.body;
      if(!rating || !feedback) {
        return res.status(400).json({ error: "Rating and feedback are required." });
      }
  
      // find the washroom by ID
      const collection = db.collection(COLLECTIONS.washroomSubmissions);
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(washroomId) },
        { $push: { ratings: { rating, feedback, date: new Date() } } } );
  
      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ error: "Washroom not found." });
      }
      res.status(200).json({ message: "Rating and feedback added successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get("/getRating/:washroomId", express.json(), async (req, res) => {
    try {
      // check if washroom ID is valid
      const washroomId = req.params.washroomId;
      if (!ObjectId.isValid(washroomId)) {
        return res.status(400).json({ error: "Invalid washroom ID." });
      }
  
      // find the washroom by ID
      const collection = db.collection(COLLECTIONS.washroomSubmissions);
      const washroom = await collection.findOne({ _id: new ObjectId(washroomId) });
  
      if (!washroom) {
        return res.status(404).json({ error: "Washroom not found." });
      }
      res.status(200).json({ ratings: washroom.ratings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
