const express=require('express');
const router=express.Router();
const User=require('./../models/User')
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const Candidate = require('./../models/Candidate');


const checkAdminRole = async (userID) => {
  try {
    if (!userID) {
      console.log('checkAdminRole: no userID provided');
      return false;
    }
    const user = await User.findById(userID);
    console.log('user in db:', user);
    if (!user) return false;
    return user.role === 'admin';
  } catch (err) {
    console.log('checkAdminRole error:', err);
    return false;
  }
} 


// POST route to add a candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userData?.id;
    if (!(await checkAdminRole(userId)))
      return res.status(403).json({ message: 'user does not have admin role' });

    const data = req.body; // Assuming the request body contains the candidate data

    // Create a new Candidate document using the Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new candidate to the database
    const response = await newCandidate.save();
    console.log('data saved');
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT method to update the candidate
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userData?.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: 'user does not have admin role' });
    }
    const candidateId = req.params.candidateID; // extract the id from the URL parameter
    const updatecandidateData = req.body; // update data for the candidate
    const response = await Candidate.findByIdAndUpdate(candidateId, updatecandidateData, {
      // return the updated doc
      new: true,
      runValidators: true // run mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE method to delete the candidate
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userData?.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: 'user does not have admin role' });
    }

    const candidateId = req.params.candidateID; // extract the id from the URL parameter
    const response = await Candidate.findByIdAndDelete(candidateId);

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Candidate data deleted");
    res.status(200).json({ message: "candidate deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//let's start voting for the candidate
router.post('/vote/:candidateID',jwtAuthMiddleware,async(req,res)=>{
  //no admin can vote for the candidate
  //user can vote once
  candidateID=req.params.candidateID;
  userID=req.user.userData.id;

  try{
    //fine the candidate dctm with the specified candidate id

    const candidate=await Candidate.findById(candidateID);
    if(!candidate){
      return res.status(404).json({error:"Candidate not found"});
    }
    const user=await User.findById(userID);
    if(!user){
      return res.status(404).json({error:"user not found"});
    }
    if(user.isVoted){
      return res.status(400).json({message:"You have already voted"});
    }
    if(user.role=='admin'){
      return res.status(403).json({error:"Admin is not allowed to vote"})
    }

    //update the candidate dcmt to update the vote
    candidate.votes.push({user:userID});
    candidate.voteCount++;
    await candidate.save();

    //update user dcmt
    user.isVoted=true;
    await user.save();

    res.status(200).json({message:"vote recorded succesfully"})
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

//vote count
router.get('/vote/count',async(req,res)=>{
  try{
    //find all candidates and sort them by vote count in descending order
    const candidate=await Candidate.find().sort({voteCount:'desc'})

    //map the candidate data to return only the name and vote count
    const voteRecord=candidate.map((data)=>{
      return {
        party:data.party,
        name:data.name,
        voteCount:data.voteCount
      }
    })
    res.status(200).json(voteRecord);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports=router;

