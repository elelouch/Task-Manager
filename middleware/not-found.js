const {NOT_FOUND:nf} = require('../http-codes');

function notFound(error,request,response,next){
  if(error.status === nf){
    return response
      .status(nf)
      .json({
        status:'not found',
        message:"item not found'"
      });
  }
  next();
}

module.exports = notFound;
