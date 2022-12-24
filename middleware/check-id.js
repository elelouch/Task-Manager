const mongoose = require('mongoose');

function checkMongooseId(request,response,next){
  const taskID = request.params.id;
  if(!mongoose.isValidObjectId(taskID)){
    return response
      .status(httpCodes.BAD_REQ)
      .json({
        status:'bad request',
        message:"id provided isn't valid"
      })
  }
  next();
}

module.exports = checkMongooseId;
