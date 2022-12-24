const httpCodes = require('../http-codes');
const mongoose = require('mongoose');
const TaskModel = require('../models/Task'); //each schema maps to a mongodb collection, it shapes how the document(instance of a model) would be shaped, it has other uses.
//TaskModel is a class that would instance every document in the mongoDB

async function getTasks(request,response,next){
  //request wasn't required since I requested all objects
  try{
    const tasks = await TaskModel.find({});// devuelve un array de objetos
    response
      .status(httpCodes.SUCCESS)
      .json({
        status:'success',
        allTasks:tasks
      })
  }catch(err){
    next(err)
  }
}
async function createTask(request,response,next){
  try{
    const taskName = request.body.name;
    const task = await TaskModel.create({
      name:taskName,
    })
    response
      .status(httpCodes.SUCCESS)
      .json({
        task
      })
  }catch(err){
    next(err)
  }
}
async function getTask(request,response,next){
  try{
    const taskRequested = await TaskModel.findById(request.params.id);
    if(!taskRequested){
      return response
        .status(httpCodes.NOT_FOUND)
        .json({
          status:'not found',
          message:'no task found with that id'
        })
    }
    response
      .status(httpCodes.SUCCESS)
      .json({
        status:'success',
        task:taskRequested
      })
  }catch(err){
    next(err)
  }
}
async function updateTask(request,response,next){
  try{
    patchedTask = await TaskModel.findByIdAndUpdate(request.params.id, request.body,{
      returnDocument : 'after',
      runValidators : true
    })

    response
      .status(httpCodes.SUCCESS)
      .json({
        status:'success',
        oldData:patchedTask
      })

  }catch(err){
    next(err)
  }
}

async function deleteTask(request,response,next){
  try{
    const taskDeleted = await TaskModel.findByIdAndDelete(request.params.id);
    if(!taskDeleted){
    return response
        .status(httpCodes.NOT_FOUND)
        .json({
          status:'not found',
          message:'no task found with that id'
        })
    }
    response
      .status(httpCodes.SUCCESS)
      .json({
        status:'success',
        task:taskDeleted
      })

  }catch(err){
    next(err);
  }
}
//care with this function since it isn't async
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
module.exports = {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
  checkMongooseId,
}
