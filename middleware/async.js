function asyncWrapper(receivedFunction){
  return async function (request,response,next){
    // I just found that there are functions that do the same on the npm repository
    try {
      await receivedFunction(request,response,next);
      //next can possibly be used
    } catch (err) {
      next(err)
      //traverse all stack until reaching the error handler middleware
    }
  }
}

module.exports = asyncWrapper;
