require('dotenv').config(); //executes dotenv module to set process.env
const express = require('express');
const app = express();
const httpCodes = require('./http-codes');
const PORT = process.env.PORT || 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const mongoURI = process.env.MONGO_URI;
const internalErrorHandler = require('./middleware/internal-error');
const notFound = require('./middleware/not-found');


app.use(express.static('./public')); // serve statics file using get method when required
app.use(express.json());
/* middleware that parses all requests payloads and
 * adds the body propertie to the request object on
 * the last middleware */

app.use('/api/v1/tasks',tasks);

app.get('/',(request,response)=>{
  response
    .status(httpCodes.SUCCESS)
    .json({
      status:'ok',
      message:'serving main page'
    })
})


// error handlers sequence
app.use([notFound,internalErrorHandler]);
// the stack reaches this last function, if there aren't any errors, but can't get the endpoint
app.use('*',(request,response)=>{
  return response
    .status(httpCodes.BAD_REQ)
    .json({
      status:'not found',
      message:'not valid endpoint'
    })
})

//Add error handlers at the end of the middleware stack, so each middleware that won't handle the error sent in
//each catch block by using next(err), handles it to the next middleware unitl it reaches internalErrorHandler

async function startDB(uri){
  try{
    await connectDB(uri); //if there's a connection to a database, we start the server
    app.listen(PORT, ()=>{
      console.log(`listening on port: ${PORT}`);
    })
  }catch(error){
    console.log(error);
  }
}
startDB(mongoURI);
