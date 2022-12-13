const mongoose = require('mongoose');

exports.connectToDb = async () => {
   try {
     const conn = await mongoose.connect(
       "mongodb+srv://bilguun:test1234@cluster0.oj4w8de.mongodb.net/?retryWrites=true&w=majority"
     );
     console.log('connected to database');
   } catch (error) {}
 };