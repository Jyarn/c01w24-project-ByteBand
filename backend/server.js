import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import {
  SERVER_HOST,
  SERVER_PORT,
  SERVER_URL,
  MONGO_URL,
  COLLECTIONS,
  DB_NAME
} from "./constants/constants.js";

const app = express();

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


app.post("/initdatabase", express.json(), async(req, res) => {
  const washroomCollection = db.collection(COLLECTIONS.washrooms);
  try {
    await washroomCollection.drop({ }); // reset database
    await washroomCollection.insertMany([{
      address: "1587 Marshall Street, Baltimore",
      useSchedule: false,
      overrideStatus: false,
      status: "Washroom yucky",
      times: {
        "Sunday": [],
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
      },
      "ratings": [
        {
          "rating": "5",
          "feedback": "Great!",
          "date": "2024-03-27"
        },
        {
          "rating": "4",
          "feedback": "Good!",
          "date": "2023-03-27"
        },
      ]
    },
      {
        address: "2571 Heron Way, Salem",
        useSchedule: false,
        overrideStatus: true,
        status: "Hunting witches",
        times: {
          "Sunday": [{ "start": 540, "end": 1350 }],
          "Monday": [],
          "Tuesday": [],
          "Wednesday": [ { "start": 0, "end": 780 }, { "start": 800, "end": 1400 }],
          "Thursday": [],
          "Friday": [],
          "Saturday": [],
        },
        "ratings": [
          {
            "rating": "4",
            "feedback": "Nice!",
            "date": "2024-03-27"
          },
        ]
      }
    ]);

    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
});


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

function stringifyTime(time) {
  const start_hr = Math.floor(time.start / 60).toString();
  const start_min = (time.start % 60).toString();

  const end_hr = Math.floor(time.end / 60).toString();
  const end_min = (time.end % 60).toString();

  time.start = `${start_hr.length == 1 ? "0" + start_hr : start_hr}:${start_min.length == 1 ? start_min + "0" : start_min }`;
  time.end  = `${end_hr.length == 1 ? "0" + end_hr : end_hr}:${end_min.length == 1 ? end_min + "0" : end_min }`;
}

app.get("/getWashroomInfo/:id", express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const day = req.query.day;
    const hr  = req.query.hr;
    const min = req.query.min;

    if (!ObjectId.isValid(id) || !day || !hr || !min)
        return res.status(400).json({ error: "Invalid input"});

    const coll = db.collection(COLLECTIONS.washrooms);
    const data = await coll.findOne({ _id: new ObjectId(id) });
    if (!data)
      return res.status(404).json({ error: "unable to get washroom" });

    const times = data.times;
    const daymap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timehash = Number(hr)*60 + Number(min);
    let open = null;     // is the washroom open
    let i = 0;          // variable to help find the correct day

    for (const d in times) {
      times[d].forEach((time) => {
        const start = time.start;
        const end = time.end;

        stringifyTime(time);
        if (d == daymap[day] && start <= timehash && timehash <= end)
          open = time;
      });

      i++;
    }

    return res.status(200).json({
      openTimes: times,
      open: open,
      useSchedule: data.useSchedule,            // true - use openTimes to calculate whether the washroom is open
                                                // false - use overrideStatus to determine if washroom is open
      overrideStatus: data.overrideStatus,
      address: data.address,
      status: data.status,
    });

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

app.patch("/postRating/:washroomId", express.json(), async (req, res) => {
    try {
      const washroomId = req.params.washroomId;
      if (!ObjectId.isValid(washroomId)) {
        return res.status(400).json({ error: "Invalid washroom ID." });
      }
      const { rating, feedback } = req.body;
      if(!rating || !feedback) {
        return res.status(400).json({ error: "Rating and feedback are required." });
      }

      const collection = db.collection(COLLECTIONS.washrooms);
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(washroomId) },
        { $push: { ratings: { rating, feedback, date: new Date().toISOString().split('T')[0] } } } );
  
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
      const washroomId = req.params.washroomId;
      if (!ObjectId.isValid(washroomId)) {
        return res.status(400).json({ error: "Invalid washroom ID." });
      }
  
      const collection = db.collection(COLLECTIONS.washrooms);
      const washroom = await collection.findOne({ _id: new ObjectId(washroomId) });
  
      if (!washroom) {
        return res.status(404).json({ error: "Washroom not found." });
      }
      res.status(200).json({ ratings: washroom.ratings || [] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});