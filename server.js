require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cors());
// ✅ Allow both local dev and GitHub Pages frontend

const allowedOrigins = [
  "http://localhost:3000",
  "https://mobinashaik1999.github.io"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "https://mobinashaik1999.github.io"
//   ]
// }));

app.use(express.json());


const pool = require('./db');

// POST endpoint to receive profile data and store in MySQL
app.post("/api/profiles", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    gender,
    selectedOption,
    subjects,
    resume,
    url,
    about
  } = req.body;

  try {
    const query = `
      INSERT INTO profiles (
        firstName,
        lastName,
        email,
        contact,
        gender,
        selectedOption,
        subjects,
        resume,
        url,
        about
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      firstName,
      lastName,
      email,
      contact,
      gender,
      selectedOption,
      subjects,
      resume,
      url,
      about
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});




//Get endpoint to check all the profiles stored in the database
app.get("/api/profiles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profiles");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).send("Server error");
  }
});



// ✅ Bind to 0.0.0.0 so Render accepts external requests
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
