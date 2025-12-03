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
app.post("/api/profile", async (req, res) => {
  try {
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

    const sql = `
      INSERT INTO profiles
      (firstName, lastName, email, contact, gender, selectedOption, subjects, resume, url, about)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      firstName ?? null,
      lastName ?? null,
      email ?? null,
      contact ?? null,
      gender ?? null,
      selectedOption ?? null,
      subjects ? JSON.stringify(subjects) : null,   // ✅ stringify object
      resume && Object.keys(resume).length > 0 ? JSON.stringify(resume) : null, // ✅ stringify or null
      url ?? null,
      about ?? null
    ];

    // console.log("Params:", params); // Debugging

    await pool.query(sql, params);
    res.status(201).send("Profile created");
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


//Get endpoint to check all the profiles stored in the database
app.get("/api/profiles", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM profiles");
    res.json(rows);
  } catch (err) {
    console.error(err);
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
