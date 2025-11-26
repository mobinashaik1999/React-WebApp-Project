const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
