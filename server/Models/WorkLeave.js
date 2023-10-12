const { Binary, Double } = require("mongodb");
const mongoose = require("mongoose");

const WorkLeaveSchema = mongoose.Schema({
    workabsence: {
        type: String,
        ref: 'Leaves'
    },
    Leave_Days: {
        type: String,
    },
    Short_leave: {
        type: String,
    },
    from: {
        type: Date,
        require: true
    },
    to: {
        type: Date,
        require: true
    },
    description: {
        type: String,
    },
    task: {
        type: String,
    },
    leaveDuration: {
        type: String,
        require: true
    },
    fromTime: {
        type: String
    },
    toTime: {
        type: String
    },
    Short_leave:{
        type:String,
        require:true
    },
    Project:{
        type:String,
    },
    location:{
        type:  String,
    },
    Workstatus: {
        type: String,
        enum: ["Partially Progress", "No Progress", "Completed"],
        // default:"Pending Approval" 
    },
    status: {
        type: String,
        enum:["Approved","Pending Approval","Reject"],
        default:"Pending Approval" 
    },
    supervisorApproval: {
        type: String,
        enum: ["Approved", "Pending Approval", "Reject"],
        default: "Pending Approval"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees'
    },
    applicationdate: {
        type: Date,
        default: Date.now
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
        require: false,
        set: a => a === '' ? undefined : a
    },
    attachment: {
        type: mongoose.Schema.Types.Mixed
    },
    leave_status:{
        type: String
    },
    placeToVisit:{
        type: String
    },
    reasonToVisit:{
        type: String
    },
    personToMeet:{
        type: String
    },
    remarks:{
        type: String
    },
    meterStartReading:{
        type: String
    },
    meterEndReading:{
        type: String
    },
    overallRemarks:{
        type: String
    },

    expense: {
        type: [{
          type: String,        
          amount: Number ,
          description: String
        }],
      },

})

const WorkLeave = mongoose.model('WorkLeave', WorkLeaveSchema);
module.exports = WorkLeave