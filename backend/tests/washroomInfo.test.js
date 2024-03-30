import { MongoClient } from "mongodb";
import {
  SERVER_URL,
  MONGO_URL,
  DB_NAME,
  COLLECTIONS
} from "../constants/constants.js";

let db;
let client;
let washroomids;

const washroomData = [
  {
    address: "755 Morningside Ave, Scarborough",
    googleAddress: "755 Morningside Ave, Scarborough, ON M1C 4Z4",
    useSchedule: false,
    overrideStatus: false,
    status: "Washroom is clean",
    times: {
      "Sunday": [],
      "Monday": [],
      "Tuesday": [],
      "Wednesday": [],
      "Thursday": [],
      "Friday": [],
      "Saturday": [],
    },
    ratings: [],
  },
  {
    name: "University of Toronto Scarborough",
    address: "1265 Military Trail, Scarborough",
    googleAddress: "1265 Military Trail, Scarborough, ON M1C 1A4",
    useSchedule: true,
    overrideStatus: false,
    status: "Closed for easter",
    times: {
      "Sunday": [ { "start": 540, "end": 1350 }, ],
      "Monday": [],
      "Tuesday": [],
      "Wednesday": [ { "start": 0, "end": 780 }, { "start": 800, "end": 1400 }, ],
      "Thursday": [],
      "Friday": [],
      "Saturday": [],
    },
    ratings: [
      { rating: 5, feedback: "Great!" },
    ],
    contact: {
      "Phone Number": {
        text: "111-111-1111",
        link: "9",
      },
      "Website": {
        link: "https://www.utsc.utoronto.ca/home/",
        text: "utsc.utoronto.ca",
      },
    },
  }
];

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

beforeEach(async () => {
    const coll = db.collection(COLLECTIONS.washrooms);
    try {
        await coll.drop({ }); // reset database
    } catch (error) {
        console.log(error.message);
    }

    const res = await coll.insertMany(washroomData);

    washroomids = Object.values(res.insertedIds);
});

afterAll(async () => {
  await client.close();
});

test("/getAllWashrooms - Get all washrooms", async () => {
    const res = await fetch(`${SERVER_URL}/getAllWashrooms`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    const expectedRes = [
      {
        _id: washroomids[0].toString(),
        address: '755 Morningside Ave, Scarborough',
        googleAddress: '755 Morningside Ave, Scarborough, ON M1C 4Z4',
        useSchedule: false,
        overrideStatus: false,
        status: 'Washroom is clean',
        times: {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        },
        ratings: [],
      },
      {
        _id: washroomids[1].toString(),
        name: 'University of Toronto Scarborough',
        address: '1265 Military Trail, Scarborough',
        googleAddress: '1265 Military Trail, Scarborough, ON M1C 1A4',
        useSchedule: true,
        overrideStatus: false,
        status: 'Closed for easter',
        times: {
          "Sunday": [ { "start": 540, "end": 1350 } ],
          "Monday": [],
          "Tuesday": [],
          "Wednesday": [ { "start": 0, "end": 780 }, { "start": 800, "end": 1400 }, ],
          "Thursday": [],
          "Friday": [],
          "Saturday": [],
        },
        ratings: [
          { rating: 5, feedback: "Great!" },
        ],
        contact: {
          "Phone Number": {
            text: "111-111-1111",
            link: "9",
          },
          "Website": {
            link: "https://www.utsc.utoronto.ca/home/",
            text: "utsc.utoronto.ca",
          },
        },
      }
    ]

    expect(res.status).toBe(200);
    expect(body.response).toEqual(expectedRes);
});

test("/getWashroomInfo - Washroom open", async () => {
    const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomids[1].toString()}?day=3&hr=17&min=6`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    const expectedRes = {
      contact: {
        "Phone Number": {
          text: "111-111-1111",
          link: "9",
        },
        "Website": {
          link: "https://www.utsc.utoronto.ca/home/",
          text: "utsc.utoronto.ca",
        },
      },
      name: "University of Toronto Scarborough",
      openTimes: {
        Sunday: [
          {
            start: "09:00",
            end: "22:30"
          },
        ],
        Monday: [],
        Tuesday: [],
        Wednesday: [
          {
            start: "00:00",
            end: "13:00"
          },
          {
            start: "13:20",
            end: "23:20"
          }
        ],
        Thursday: [],
        Friday: [],
        Saturday: [],
      },
      open: {
        start: "13:20",
        end: "23:20",
      },
      useSchedule: true,
      overrideStatus: false,
      address: "1265 Military Trail, Scarborough",
      status: "Closed for easter",
      ratings: [
        { rating: 5, feedback: "Great!" },
      ],
  };

    expect(res.status).toBe(200);
    expect(body).toEqual(expectedRes);
});

test("/getWashroomInfo - Washroom closed", async () => {
  const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomids[1].toString()}?day=4&hr=17&min=6`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });

  const body = await res.json();

  const expectedRes = {
    contact: {
      "Phone Number": {
        text: "111-111-1111",
        link: "9",
      },
      "Website": {
        link: "https://www.utsc.utoronto.ca/home/",
        text: "utsc.utoronto.ca",
      },
    },
    name: "University of Toronto Scarborough",
    openTimes: {
      Sunday: [
        {
          start: "09:00",
          end: "22:30"
        },
      ],
      Monday: [],
      Tuesday: [],
      Wednesday: [
        {
          start: "00:00",
          end: "13:00"
        },
        {
          start: "13:20",
          end: "23:20"
        }
      ],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    open: null,
    useSchedule: true,
    overrideStatus: false,
    address: "1265 Military Trail, Scarborough",
    status: "Closed for easter",
    ratings: [
      { rating: 5, feedback: "Great!" },
    ],
  };

  expect(res.status).toBe(200);
  expect(body).toEqual(expectedRes);
});

test("/getWashroomInfo - Missing min parameter", async () => {
  const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomids[1].toString()}?day=3&hr=17`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });

  const body = await res.json();

  expect(res.status).toBe(400);
  expect(body.error).toBe("Invalid input");
});

test("/getWashroomInfo - Missing hr parameter", async () => {
  const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomids[1].toString()}?day=3&min=6`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });

  const body = await res.json();

  expect(res.status).toBe(400);
  expect(body.error).toBe("Invalid input");
});

test("/getWashroomInfo - Missing day parameter", async () => {
  const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomids[1].toString()}?hr=17&min=6`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });

  const body = await res.json();

  expect(res.status).toBe(400);
  expect(body.error).toBe("Invalid input");
});