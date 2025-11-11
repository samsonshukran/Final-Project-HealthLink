import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Multer Setup ---------------- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ---------------- MongoDB Connection ---------------- //
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection failed:", err));

// ---------------- Mongoose Schema ---------------- //
const healthAppSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  condition: String,
  uploadedFile: String // stores uploaded file name
});

const HealthApp = mongoose.model("HealthApp", healthAppSchema, "HealthApp");

// ---------------- Routes ---------------- //

// Test route
app.get("/", (req, res) => {
  res.send("HealthLink Server is running ✅");
});

// Add new record (with optional file upload)
app.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { name, age, condition } = req.body;
    const uploadedFile = req.file ? req.file.filename : null;

    const newRecord = new HealthApp({ name, age, condition, uploadedFile });
    await newRecord.save();

    res.status(201).json({ message: "Record saved successfully", record: newRecord });
  } catch (err) {
    res.status(500).json({ message: "Error saving record", error: err.message });
  }
});

// Get all HealthApp records
app.get("/all", async (req, res) => {
  try {
    const records = await HealthApp.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records", error: err.message });
  }
});

// ---------------- Start Server ---------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
