const express = require("express");
const app = express()
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const bodyparser = require("body-parser")
const UsersRoute = require("./Routes/employees")
const CalendarRoute = require("./Routes/calendar")
const holidayRoute = require("./Routes/holiday")
const authRoute = require("./Routes/auth")
const ecxel = require("./convertecxel")
const env = require('dotenv')
const cors = require("cors")
const departmentRoute = require('./Routes/Admin/departments')
const designationRoute = require('./Routes/Admin/designation')
const positionRoute = require('./Routes/positions')
const importecxel = require("./Routes/import")
const cookieParser = require('cookie-parser')
const leaveRoute = require('./Routes/Admin/LeavesTypes')
const LeaveRequest = require('./Routes/Admin/Leaves')
const attendanceRoute = require('./Routes/uploadAttendance')
const userAttendance = require('./Routes/userAteendance')
const ERCcode = require('./Routes/payroll/earningCodes')
const cycle = require('./Routes/payroll/PayCycle')
const period = require('./Routes/payroll/PayPeriod')
const setup = require("./Routes/payroll/setup")
const company = require('./Routes/company')
const shifts = require('./Routes/shifts')
const leaveformonth = require('./Routes/employees/leaveReq')
const workLeave = require('./Routes/employees/WorkLeave')

env.config()

app.use(
  cors({
    origin: '*'
  })
);

// Connect to DB
connectDB();

// Allow uploading large data inside request body
app.use(express.json({limit: '25mb'}));

// app.use("/leaverequest/addrequest",fileUpload())
// app.use("/workLeave",fileUpload())

app.use(cookieParser());

//user image upload directory 
app.use("/images", express.static(path.join(__dirname, "/images")));

//xlxs
//Routes 

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

//multer file upload setup
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `leave-${req.body.employee}-${(new Date()).getTime()}`);
  },
})

const upload = multer({ storage: storage });

//Routes
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use('/employees',UsersRoute);
app.use("/calendar",CalendarRoute);
app.use("/holiday",holidayRoute);
app.use('/auth',authRoute);
app.use('/departments',departmentRoute);
app.use('/designation',designationRoute);
app.use('/leaves',leaveRoute)
app.use('/leaverequest', upload.single("file"), LeaveRequest)
app.use('/payrollsetup',setup)
app.use('/shifts',shifts)
app.use('/onemonthleaves', leaveformonth)
app.use('/workLeave', upload.single("file") ,workLeave)
app.use('/approved-leaves',LeaveRequest)
app.use('/',attendanceRoute)
app.use('/',ERCcode)
app.use('/',cycle)
app.use('/',period)
app.use('/',company)
app.use("/",importecxel);
app.use("/",ecxel);
app.use('/',userAttendance)
app.use('/',positionRoute)

//Port settings
const port = process.env.PORT || 5002;
app.listen(port,()=>{
  console.log(`Server Connected to port ${port}`)
})

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})