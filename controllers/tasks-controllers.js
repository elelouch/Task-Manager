const asyncWrapper = require('../middleware/async');
const httpCodes = require('../http-codes');
const TaskModel = require('../models/Task'); //each schema maps to a mongodb collection, it shapes how the document(instance of a model) would be shaped, it has other uses.
//TaskModel is a class that would instance every document in the mongoDB
const customError = require('../errors/custom-error');
const notFoundErr = new customError('Not Found',httpCodes.NOT_FOUND);

/* here we send a function to an async wrapper whose job is only to avoid try catch boilerplate.
 * it will return a function that has the sent function on the try scope and a next(error)
 * on the catch scope. When the returned function gets invoked, it awaits the function */
const getTasks = asyncWrapper(async (request,response)=>{
  const tasks = await TaskModel.find({}); // returns a query with an array of mongodb documents (app tasks)
  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'success',
      allTasks:tasks,
      amount:tasks.length
    })
})
const createTask = asyncWrapper(async (request,response)=>{
  const {name} = request.body;
  const task = await TaskModel.create({name});

  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'success',
      task
    })
})
const getTask = asyncWrapper(async (request,response)=>{
  const taskRequested = await TaskModel.findById(request.params.id);

  if(!taskRequested)
    throw notFoundErr;

  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'success',
      task:taskRequested
    })
})
const updateTask = asyncWrapper(async (request,response)=>{
  const newTask = await TaskModel.findByIdAndUpdate(request.params.id, request.body,{
    //retrieves new task instead of the old one
    returnDocument : 'after',
    runValidators : true
  })

  if(!newTask)
    throw notFoundErr;

  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'success',
      task:newTask
    })
})
const deleteTask = asyncWrapper(async (request,response)=>{
  const taskDeleted = await TaskModel.findByIdAndDelete(request.params.id);
  if(!taskDeleted)
    throw notFoundErr;

  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'success',
      task:taskDeleted
    })
})
module.exports = {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
}
