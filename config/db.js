const mongoose = require('mongoose')

const connectDB = async ()=>{

     try{
         
          await mongoose.connect(`mongodb+srv://${process.env.mongoDBUsername}:${process.env.mongoDBPassword}@mernproject.qih3s.mongodb.net/?retryWrites=true&w=majority`)
          console.log('Database connection established')
     }
     catch(err){
        console.log('Error connecting to DB ' + err.message);
     }
}

module.exports = connectDB;