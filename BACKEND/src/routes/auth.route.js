//here we will be defining the routes for authentication

import express from "express"; 
import { login, logout, signup, onboard} from "../controllers/auth.controllers.js";//importing from controllers
import { protectRoute } from "../middleware/auth.middleware.js";//importing protectRoute




const router = express.Router(); //to use router we have to import it from express and then we can use it to define routes

router.post("/signup",signup); //this will call the signup function from auth.controllers.js file when someone opens http://your-site/signup and they will just see the message:
//get method is used to get the response so we use it to see on localhost 
//post method is for real world application


router.post("/login", login);
//get method is used to get the response so we use it to see on localhost 
//post method is for real world application


router.post("/logout",logout);
//get method is used to get the response so we use it to see on localhost 
//post method is for real world application

//This defines a GET route called /logout in an Express.js server.
//If someone opens http://your-site/logout, they will just see the message:




//onboarding route is created here 
router.post("/onboarding",protectRoute,onboard);



//CHECKS IF USER IS LOGGED IN OR NOT
router.get("/me",protectRoute, (req,res)=>{
    res.status(200).json({success : true, user : req.user});
})


export default router; //to use this router in other files we have to export it and then we can import it in server.js file and use it there to define routes for authentication



// //3. Fix overwrite mode (typing replaces letters)

// If typing deletes characters ahead:

// Press Insert (INS) key
// This toggles overwrite ↔ normal typing.