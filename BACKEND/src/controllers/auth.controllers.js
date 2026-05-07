//from here we will send the signup,logut and login functions to the auth.route.js
import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";




export async function signup(req, res) {
  const {email,password,fullName}=req.body;//the client sends data in json format so we can access it from there

  try {
    if(!email ||  !password || !fullName){//if user  does not give any of these fields
      return res.status(400).json({message : "All fields are required !"});//missing fields
    }
    if(password.length < 6){//if length of password is less than 6
      return res.status(400).json({message : "Password should be of atleast six characters."});
    }

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email  characters see chtagpt to know more about this regex format

    if(!emailRegex.test(email)){ //if the format of email is not correct
      return res.status(400).json({message : "Invalid email format!"});
    }

    //now since email should be unique so 
    const existingUser = await User.findOne({email});

    if(existingUser){//that means if we have a value of existing user then it will go inside
      return res.status(400).json({message : "User already exists , please use a different email"});
    }

    const idx = Math.floor(Math.random() * 1000) + 1; //generate a no. between 1 to 1000 including both
    const randomAvatar = `https://api.dicebear.com/9.x/toon-head/svg?seed=${idx}`;//gives a random avatar

    
    const newUser = await User.create({  //new user created 
      email,
      password,
      fullName,
      profilePicture : randomAvatar,
    });

 //create a user in stream as well
try {
  await upsertStreamUser({
    id: newUser._id.toString(),
    name: newUser.fullName,
    image: newUser.profilePicture || "",
  });

  console.log(`Stream User created successfully for ${newUser.fullName}`);
} catch (error) {
  console.error("Error creating stream user",error);
}










    //new user id is made    then a jwt secret key is taken   and the token expires in 7 days
    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
      expiresIn : "7d"
    });

    //so the cookies can be generated
    res.cookie("jwt",token,{//max age is in the format of milli second
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly : true, //more secure prevent XSS attacks
      sameSite : "strict",//prevent CSRF attacks
      secure : process.env.NODE_ENV==="production",//only send cookies over https in production
    });

    res.status(201).json({success:true, user:newUser});//201 means any resource is been created


  } catch (error) {
    console.log("Error in signup controller",error);  
    res.status(500).json({message : "Internal Server Error!"});    
  }
}















//LOGIN AUTH
export async function login(req, res) {
  try {
    const {email,password}= req.body;

    if(!email || !password){
      return res.status(400).json({message : "All fields are required!"});//all fields are req
    }

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message : "Invalid Email or Password"}); //that means email is not pre registered


    const isPasswordCorrect = await user.matchPassword(password);

    if(!isPasswordCorrect) return res.status(401).json({ message: "Invalid Email or Password" });



     const token = jwt.sign(
       { userId: user._id }, //newUser._id
       process.env.JWT_SECRET_KEY,
       {
         expiresIn: "7d",
       },
     );

     //so the cookies can be generated
     res.cookie("jwt", token, {
       //max age is in the format of milli second
       maxAge: 7 * 24 * 60 * 60 * 1000,
       httpOnly: true, //more secure prevent XSS attacks
       sameSite: "strict", //prevent CSRF attacks
       secure: process.env.NODE_ENV === "production", //only send cookies over https in production
     });


     res.status(200).json({success:true,user});

  } catch (error) {

    console.log("Error in Login Controller",error.message);
    res.status(500).json({message:"Internal Server Error!"});
   
  }
}













export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success : true , message : "Logout Successful !"});
}

//signup and login will be asynchronous functions because they will involve database operations and we will be using async/await to handle those operations. Logout function is not asynchronous because it will just clear the session or token and it does not involve any database operation.

















//onboarding route 
export async function onboard(req,res){
  //console.log(req.user);//only the protected method can use the req.user

  try {
    const userId = req.user._id;
    const {fullName, bio, nativeLanguage, learningLanguage, location}=req.body;

    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
      return res.status(400).json({
        message:"All fields are required",
        missingFields : [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location"
          ].filter(Boolean),
      });
    }

    const updatedUser=await User.findByIdAndUpdate(userId,{
      ...req.body,
      isOnboarded : true,
    },{new: true})

    if(!updatedUser) return res.status(404).json({message :  "User not Found!"});


    //TODO : UPDATE THE USER INFO IN STREAM
try {
  await upsertStreamUser({
    id: updatedUser._id.toString(),
    name: updatedUser.fullName,
    image: updatedUser.profilePic || "",
  });
  console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
  
} catch (streamError) {
  console.log("Error updating Stream user during onboarding :",streamError.message);
  
}



    res.status(200).json({success : true, user : updatedUser});
  } catch (error) { 
    
    console.error("Onboarding error :",error);
    res.status(500).json({message : "Internal Server Error !"});
    
  }

  
}