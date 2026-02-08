const express=require('express');
const app = express();
const db=require('./db');
require('dotenv').config();
const bodyParser=require('body-parser')
app.use(bodyParser.json());


//Import router file
const userRoutes=require('./routes/userRoutes');
const candidateRoutes=require('./routes/candidateRoutes');

//use the router
app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})