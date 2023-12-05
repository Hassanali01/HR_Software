const mongoose = require("mongoose");


//Mongo Connection
const connectDB = async () => {
      try {
            mongoose.connect(process.env.MONGODB_URI, {
                  useUnifiedTopology: true,
                  useNewUrlParser: true,
            });
            console.log("Connection Success MongoDb")
      } catch (err) {
            console.log('failed' + err)
      }
}


module.exports = connectDB;