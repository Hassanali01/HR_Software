const express = require("express");
const app = express()
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const fileUpload = require('express-fileupload')
const bodyparser = require("body-parser")
const UsersRoute = require("./Routes/Employees")
const CalendarRoute = require("./Routes/calendar")
const holidayRoute = require("./Routes/holiday")
const authRoute = require("./Routes/auth")
const ecxel = require("./convertecxel")
const env = require('dotenv')
const cors = require("cors")
const departmentRoute = require('./Routes/Admin/departments')
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
env.config()
app.use(
  cors({
    origin: '*'
})
);

app.use("/leaverequest/addrequest",fileUpload())




app.use(express.json({limit: '25mb'}));


app.use(cookieParser());


//DB connection
connectDB();
//user image upload directory 
app.use("/images", express.static(path.join(__dirname, "/images")));
//xlxs
//Routes 


app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));



//multer image upload
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
})
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//Routes
app.use('/employees',UsersRoute);
app.use("/calendar",CalendarRoute);
app.use("/holiday",holidayRoute);
app.use('/auth',authRoute);
app.use("/",importecxel);
app.use("/",ecxel);
app.use('/',userAttendance)
app.use('/departments',departmentRoute);
app.use('/',positionRoute)
app.use('/leaves',leaveRoute)
app.use('/leaverequest',LeaveRequest)
app.use('/',attendanceRoute)
app.use('/',ERCcode)
app.use('/',cycle)
app.use('/',period)
app.use('/payrollsetup',setup)
app.use('/',company)
app.use('/shifts',shifts)
app.use('/onemonthleaves', leaveformonth)


app.use('/approved-leaves',LeaveRequest)
//Port settings
const PORT = 5002;

console.log('hello world')
app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})