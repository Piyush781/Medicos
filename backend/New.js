import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userSchema = new mongoose.Schema({
  // User schema fields...
});

const User = mongoose.model("User", userSchema);

// Doctor schema and model...
const doctorSchema = new mongoose.Schema({
  // Doctor schema fields...
});

const Doctormodel = mongoose.model('Doctor', doctorSchema);

mongoose.connect("mongodb://127.0.0.1:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).send({
        message: "Auth Failed: No Authorization header",
        success: false,
      });
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

const authController = async (req, res) => {
  // Auth controller code...
};

const applyDoctorController = async (req, res) => {
  // Apply doctor controller code...
};

const getAllNotificationController = async (req, res) => {
  // Get all notification controller code...
};

const deleteAllNotificationController = async (req, res) => {
  // Delete all notification controller code...
};

const getAllUsersController = async (req, res) => {
  // Get all users controller code...
};

const getAllDoctorsController = async (req, res) => {
  // Get all doctors controller code...
};

const changeAccountStatusController = async (req, res) => {
  // Change account status controller code...
};

app.post('/login', async (req, res) => {
  // Login route code...
});

app.post("/register", async (req, res) => {
  // Register route code...
});

app.post("/getUserData", authMiddleware, authController);
app.post("/apply-doctor", authMiddleware, applyDoctorController);
app.post("/get-all-notification", authMiddleware, getAllNotificationController);
app.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);
app.get('/pages/getAllUsers', authMiddleware, getAllUsersController);
app.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
app.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
