
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import moment from "moment";
import  path  from "path";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(express.static(path.join(__dirname,'../build')));

app.get('*',function(req,res)
{
  res.sendFile(path.join(__dirname,'../build/index.html'))
})
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);


// Doctor details
const doctorSchema=new mongoose.Schema({
  userId:{
      type:String
  },
  firstname:{
      type:String,
      required:[true,'First name is required']
  },
  lastname:{
      type:String,
      required:[true,'Last name is required']
  },
  phone:{
      type:String,
      required:[true,'Phone no is required']
  },
  email:{
      type:String,
      required:[true,'email is required']
  },
  Website:{
      type:String,
  },
  address:{
      type:String,
      required:[true,'email is required']
  },
  specialization:{
      type:String,
      required:[true,'specialization is require']
  },
  experience:{
      type:String,
      required:[true,'experience is require']    
  },
  feesPerCunsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "wrok timing is required"],
    },
},
{timestamps:true}
)

const Doctormodel=mongoose.model('doctors',doctorSchema)

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);


mongoose
  .connect("mongodb://127.0.0.1:27017/userdb", {
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
          return res.status(200).send({
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
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.password=undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

// ApplydoctorControl
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await Doctormodel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickPath: "/pages/Doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctor",
    });
  }
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      if (password === user.password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
          expiresIn:"1d",
        });
        res.send({ message: 'Login Successful', user: user, token: token });
      } else {
        res.send({ message: 'Password did not match' });
      }
    } else {
      res.send({ message: 'User not registered' });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: 'An error occurred' });
  }
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User already registered" });
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.send({ message: "Successfully Registered, Please Login Now" });
  } catch (error) {
    return res.send(error);
  }
});

// Notifications method
const getAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save()
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
}; 

// Delete the Notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctormodel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};


// Approving system
// Assuming you have imported required modules and set up the server (express)

// Controller for changing account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctormodel.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: doctor.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const notifcation = user.notifcation || []; // Use empty array as a fallback if notifcation is not defined
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });

    user.isDoctor = status === "approved" ? true : false; // Corrected the condition
    await user.save();

    res.status(200).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await Doctormodel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await Doctormodel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await Doctormodel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single doctor Info",
    });
  }
};

// Get ALL DOCTORS
const getAllDoctorslistController = async (req, res) => {
  try {
    const doctors = await Doctormodel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching Doctor",
    });
  }
};
// Get single doctor

const bookappointmentcontroller=async(req,res)=>{
  try {
    req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
    req.body.time=moment(req.body.time,'HH:mm').toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notifcation.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
}

// Booking Availability
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};


const userappointmentcontroller=async(req,res)=>{
  try {
    const appointments=await appointmentModel.find({userId:req.body.userId})
    res.status(200).send({
      success:true,
      message:"User Appointments Fetch Successfully",
      data:appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error in User Appointments"
    })
  }
}

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await Doctormodel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await User.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `Your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};


// Assuming you have set up other routes and middleware for the server
app.post("/getUserData", authMiddleware, authController);

// Doctor Method
app.post("/apply-doctor",authMiddleware,applyDoctorController)
app.post("/get-all-notification",authMiddleware,getAllNotificationController)
app.post("/delete-all-notification",authMiddleware,deleteAllNotificationController)
app.get('/getAllUsers',authMiddleware,getAllUsersController)
//GET METHOD || DOCTORS
app.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
app.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

// POST SINGLE DOC FILE
app.post("/getDoctorInfo",authMiddleware,getDoctorInfoController);

// POST UPDATE PROFILE
app.post("/updateprofile",authMiddleware,updateProfileController);
// Get doctor list
app.get("/getAllDoctrs",authMiddleware,getAllDoctorslistController);

app.post("/getdoctorbyid",authMiddleware,getDoctorByIdController);
app.post("/book-appointment",authMiddleware,bookappointmentcontroller);
app.post("/booking-availability",authMiddleware,bookingAvailabilityController);

app.get("/user-appointments",authMiddleware,userappointmentcontroller);
app.get("/doctor-appointments",authMiddleware,doctorAppointmentsController);
app.post("/update-status",authMiddleware,updateStatusController);
app.listen(9002, () => {
  console.log("BE started at port 9002");
});
