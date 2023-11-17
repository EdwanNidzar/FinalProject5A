const express = require("express");
const router = express.Router();
const pool = require("../query");

// Fungsi bantuan untuk membuat token JWT dengan payload dan secret key
const createToken = (payload) => {
  const secret = "s3cr3t";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

// Fungsi bantuan untuk memverifikasi token JWT dengan secret key
const verifyToken = (token) => {
  const secret = "s3cr3t";
  return jwt.verify(token, secret);
};

// Fungsi bantuan untuk mengecek apakah token JWT valid dan mengembalikan user_id
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      req.user_id = decoded.user_id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// GET /api/applications: Mendapatkan daftar semua lamaran pekerjaan
router.get("/applications", authenticate, async (req, res) => {
  try {
    const applications = await pool.query(
      "SELECT * FROM job_applications WHERE user_id = $1",
      [req.user_id]
    );
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications/:applicationId: Mendapatkan detail informasi lamaran pekerjaan berdasarkan ID
router.get("/applications/:applicationId", authenticate, async (req, res) => {
  const applicationId = req.params.applicationId;
  try {
    const application = await pool.query(
      "SELECT * FROM job_applications WHERE id = $1 AND user_id = $2",
      [applicationId, req.user_id]
    );
    res.json(application);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// POST /api/applications: Mengirim lamaran pekerjaan baru
router.post("/applications", authenticate, async (req, res) => {
  const { job_id, resume, cover_letter, updated_at } = req.body;
  try {
    const newApplication = await pool.query(
      "INSERT INTO job_applications(user_id, job_id, resume, cover_letter, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [req.user_id, job_id, resume, cover_letter, updated_at]
    );
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/applications/:applicationId: Mengupdate status atau informasi lamaran pekerjaan berdasarkan ID
router.put("/applications/:applicationId", authenticate, async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status, resume, cover_letter } = req.body;
  try {
    const updatedApplication = await pool.query(
      "UPDATE applications SET job_id = $1, resume = $2, cover_letter = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [status, resume, cover_letter, applicationId, req.user_id]
    );
    res.json(updatedApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/applications/:applicationId: Membatalkan lamaran pekerjaan berdasarkan ID
router.delete(
  "/applications/:applicationId",
  authenticate,
  async (req, res) => {
    const applicationId = req.params.applicationId;
    try {
      await pool.query(
        "DELETE FROM applications WHERE id = $1 AND user_id = $2",
        [applicationId, req.user_id]
      );
      res.json({ message: "Application canceled" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
