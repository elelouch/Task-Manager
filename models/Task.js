const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const TaskSchema = new Schema({
  name:{
    type:String,
    required:[true,'must provide a name'],
    trim:true,
    maxLength:[30,'max characters exceeded(20)'],
    minLength:[5,'requires at least 5 characters']
  },
  completed:{
    type:Boolean,
    default:false
  }
});

module.exports = model('Task', TaskSchema);
