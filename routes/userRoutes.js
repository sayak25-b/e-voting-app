const express=require('express');
const router=express.Router();
const User=require('./../models/User')
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
//post a route to add a person
router.post('/signup',async (req,res)=>{
  try{
    const data=req.body//assuming that request body contains the user data

  //create a user docmt with mongoose model
  const newUser= new User(data);

  // save the new user to the databse
  const response= await newUser.save();
  console.log("data saved");

  const payload={
    id: response.id
  }
  console.log(JSON.stringify(payload))
  const token=generateToken(payload);
  console.log("Token is"+token);

  res.status(200).json({response:response,token:token});
  }
  catch(err){
    console.log(err);
  res.status(500).json('Internal server error');
  }
})

//Login route
router.post('/login',async(req,res)=>{
  try{
    //extract uaddharcardNumber and password from the request body
    const {addharcardNumber,password}=req.body;
    
    //find the user by the addharcardNumber
    const user= await User.findOne({addharcardNumber:addharcardNumber})

    //if ussr does not exist or password dwrong then return error
    if(!user || !(await user.comparePassword(password))){
      res.status(401).json({error:"Invalid addharcardNumber or password"})
    }

    //generate token
    const payload={
      id:user.id

    }
    const token=generateToken(payload)
    //return token as response
    res.json(token)
  }catch(error){
    res.status(500).json({error:"Internal server error"})
  }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log("user data: ", req.user);

    const userId=req.user.userData.id;
    const user=await Person.findById(userId);
    res.status(200).json({user});
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
})
//Put method to update the student
router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try{
        const studentId=req.user;//extract the id from the URL parameter
        const{currentPassword,newPasswword}=req.body

        //find the user by userID
        const user= await User.findById(userId)

        //if password does not match then return error
        if (!(await user.comparePassword(currentPassword))){
        res.status(401).json({error:"Invalid addharcardNumber or password"})
        }

        //update the user's password
        user.password=newPasswword;
        await User.save();

        console.log("password updated");
        res.status(200).json({message:"Password updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
//GET method to get the person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
  try{
    const response=await Person.find();
    console.log("data fetched");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})

module.exports=router;
