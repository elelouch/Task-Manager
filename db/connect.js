const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}

function connectDB(uri){
  return mongoose.connect(uri,options)
}

module.exports = connectDB;
