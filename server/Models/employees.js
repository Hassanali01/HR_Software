const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);



const EmployeesSchema = new mongoose.Schema(
  {
    //personal info //
    emp_id: {
      type: Number,
    },
    company_payroll: {
      type: String,
    },
    firstname: {
      type: String,
      require: true,
    },
    profilepic: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      require: true,
    },
    dob: {
      type: Date,
      default: "",
    },
    cnic: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "",
    },
    maritalStatus: {
      type: String,
      default: "",
    },
    religion: {
      type: String,
      default: "",
    },
    //contact information//
    phone_no:  [{ type: String }] ,
    secondaryphone: {
      type: Number,
      require: true,
    },
    primaryemail: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },

    secondaryemail: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    ///address and region//


  address: [
    {
        address:{
          type: String,
        },
        city:{
          type: String
        },
        province: {
          type: String
        },  
        country: {
          type: String
        }
   } ],


    //education details
    educationdetails: [
      {
        degreetitle: {
          type: String,
          default: "N/A",
        },

        institute: {
          type: String,
          default: "N/A",
        },
        start: {
          type: Date,
          default: "",
        },
        end: {
          type: Date,
          default: "",
        },
        status: {
          type: String,
          default: "N/A",
        },
      },
    ],
    employementhistory: [
      {
        company: {
          type: String,
          // default: "N/A",
        },
        position: {
          type: String,
          // default: "",
        },
        joiningdate: {
          type: Date,
          // default: "N/A",
        },
        resignationdate: {
          type: Date,
          // default: "",
        },
        duration: {
          type: String,
          // default: "",
        },
        jobdescription: {
          type: String,
          // default: "N/A",
        },
      },
    ],
    //administration
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    // work_shift: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "addshifts",
    // },

    work_shift: {
      type: [{
        workShift: {type: mongoose.Schema.Types.ObjectId, ref:"addshifts"},        
        dateFrom: Date,
        dateTo: Date
      }],
    },

    jobtitle: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "admin",
    },
    departments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Departments",
    },
    joiningdate: {
      type: String,
      default: Date.now,
    },
    date_of_resignation: {
      type: Date,
    },
    employementstatus: {
      type: String,
      default: "",
    },
    // terminationdate: {
    //   type: Date,
    //   default: "N/A",
    // },
    terminationreason: {
      type: String,
      default: "",
    },
    currentSalary: {
      type: Number,
      default: 0,
    },
    profilepic: {
      type: String,
      default: "",
    },
    Leaves: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "LeaveRequest",
    },
    //BANK INFORMATION
    paymentmode: {
      type: String,
      default: "N/A",
    },
    bankname: {
      type: String,
      default: "",
    },
    accounttitle: {
      type: String,
      default: "",
    },
    accountno: {
      type: Number,
      default: 0,
    },
    branchcode: {
      type: Number,
      default: 0,
    },
    IBAN: {
      type: String,
    },
    ERCode: {
      type: Number,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    supervisors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Employees",
      unique: true,
    },
    // payroll_setup: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "payroll-setup",
    // },
    payroll_setup: {
      type: [{
        payrollSetup: {type: mongoose.Schema.Types.ObjectId, ref:"payroll-setup"},        
        dateFrom: Date,
        dateTo: Date
      }],
    },




  },
  { timestamps: true }
);

const Employees = mongoose.model("Employees", EmployeesSchema);
module.exports = Employees;
