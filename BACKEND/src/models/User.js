import mongoose from "mongoose";
import bcrypt from "bcryptjs"; //for password hashing

//firstly we will create a  schema for the  user and then we will create a model for the user

const userSchema = new mongoose.Schema(
  {
    //fullName Email Password
    //bio native language learning language location
    fullName: {
      //required
      type: String,
      required: true,
    },
    email: {
      //required
      type: String,
      required: true,
      unique: true,
    },
    password: {
      //required
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      //anything thing to share like insta bio
      type: String,
      default: "",
    },
    profilePicture: {
      //an avatar
      type: String,
      default: "",
    },
    nativeLanguage: {
      //your native language
      type: String,
      default: "",
    },
    learningLanguage: {
      //the chat will be changed into that language real time
      type: String,
      default: "",
    },
    location: {
      //your location
      type: String,
      default: "",
    },
    isOnboarded: {
      //if these fields are  filled then the user will be onboarded on this application
      type: Boolean,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId, //refers to  a paticular  id assigned  by the mongodb database
        ref: "User", //refers to the user model  so that we can populate the friends field with the user data
      },
    ],
  },
  { timestamps: true },
); //timestamps will automatically add createdAt and updatedAt fields to the schema

//PRE HOOK
//HERE BEFORE SAVING THE USER TO OUR DATABASE WE WOULD LIKE TO HASH THEIR PASSWORDS
//GENERATING A HASH CODE FOR OUR PASSWORDS

userSchema.pre("save", async function () { //this pre-hooke says that before you save your password in the database please hash the password
  //async function (next)
  //before saving the  user info into the db it hashes the password uing bcrypt js


  //the modern mongoose does not support next function in pre hook so we will not use it and instead we will use try catch block to handle the errors

  if (!this.isModified("password")) return ; // next ()); //if  the password is not modified then it will not hash it again else it will hash

  try {
    const salt = await bcrypt.genSalt(10); //generate a 10 length hash code
    this.password = await bcrypt.hash(this.password, salt); //changes  the real password with hash password and save it to the database

    //next(); //next function is called
  } catch (error) {
    //next(error);
  }
});



userSchema.methods.matchPassword = async function(enteredPassword) {

  const isPasswordCorrect = await bcrypt.compare(enteredPassword,this.password);//entered  password is compared to the saved password
  return isPasswordCorrect;
 
};












const User = mongoose.model("User", userSchema); //creating the model named user


export default User;
