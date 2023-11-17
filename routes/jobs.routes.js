const express = require("express");
const router = express.Router();
const pool = require("../query");

// GET /jobs: Mendapatkan informasi daftar pekerjaan yang tersedia
router.get("/jobs", (req, res) => {
  pool
    .query("SELECT * FROM job")
    .then((data) => {
      res.json(data.rows);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// GET /jobs/:jobId: Mendapatkan detail informasi pekerjaan berdasarkan ID
router.get("/jobs/:jobId", (req, res) => {
  const jobId = req.params.jobId;
  pool
    .query("SELECT * FROM job WHERE id = $1", [jobId])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
});

// POST /jobs: Membuat pekerjaan baru
router.post("/jobs", (req, res) => {
  const {
    title,
    description,
    location,
    salary,
    company_id,
    created_at,
    updated_at,
  } = req.body;
  pool
    .query(
      "INSERT INTO job (title, description, location, salary, company_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [title, description, location, salary, company_id, created_at, updated_at]
    )
    .then(() => {
      res.status(201).json({ message: "Job created" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

// PUT /jobs/:jobId: Mengupdate informasi pekerjaan berdasarkan ID
router.put("/jobs/:jobId", (req, res) => {
  const jobId = req.params.jobId;
  const { title, description, location, salary, company_id, updated_at } =
    req.body;
  pool
    .query(
      "UPDATE job SET title = $1, description = $2, location = $3, salary = $4, company_id = $5, updated_at = $6 WHERE id = $7",
      [title, description, location, salary, company_id, updated_at, jobId]
    )
    .then(() => {
      res.json({ message: "Job updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

// DELETE /jobs/:jobId: Menghapus pekerjaan berdasarkan ID
router.delete("/jobs/:jobId", (req, res) => {
  const jobId = req.params.jobId;
  pool
    .query("DELETE FROM job WHERE id = $1", [jobId])
    .then(() => {
      res.json({ message: "Job deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
