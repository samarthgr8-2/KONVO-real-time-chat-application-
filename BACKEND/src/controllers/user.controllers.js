import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId = req.user.id;//or _id
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id:{$ne : currentUserId}}, //exclude the current user id
                {_id : {$nin : currentUser.friends}},//exclude the current user's friends 
                {isOnboarded:true}//he/she should have fulfilled all the criteria of the onboarding dashboard
            ]
        })

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendedUsers controller",error.message);

        res.status(500).json({message : "Internal Server Error !"});
        
    }
}


export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends","fullName profilePicture nativeLanguage learningLanguage ");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller",error.message);
        res.status(500).json({message : "Internal Server Error !"});
        
    }
}


export async function sendFriendRequest(req,res) {
    try {
        const myId = req.user.id;
        const {id : recipientId } = req.params;

        //prevent sending request to yourself
        if(myId === recipientId){
            return res.status(400).json({message : "You cant send friend request to yourself !"});
        }

        const recipient = await User.findById(recipientId);

        //if recipient existed or not
        if(!recipient){
            return res.status(404).json({message : "Recipient not found !"});
        }

        if(recipient.friends.includes(myId)){//that means if the recipient already has the sender in his/her friend list then we will not send the request
            return res.status(400).json({message : "You are already friends with this user !"});
        }


        //checks if a request already exists between the sender and the recipient
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId } //this means if the sender has already sent a request to the recipient or the recipient has already sent a request to the sender then we will not send another request
            ]
        })

        if(existingRequest){
            return res.status(400).json({message : "A friend request already exists between you and this user !"});
        }


        //creating  a new friend request 
        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId,
        });

        res.status(201).json(friendRequest);



    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.message);
        res.status(500).json({message : "Internal Server Error !"});
    }
}


export async function acceptFriendRequest(req,res) {
    try {
        const {id : requestId}= req.params;

        const friendRequest = await FriendRequest.findById(requestId);//finding the request by id

        if(!friendRequest){//if the request does not exist
            return res.status(404).json({message : "Friend request not found !"});
        }

        //verify if the current user is the recipient of the friend request
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message : "You are not authorized to accept this friend request !"});
        }


        friendRequest.status = "accepted";//if the request is accepted then we will change the status of the request to accepted
        await friendRequest.save();//save this to the database


        //now update the friend list of both users (sender and recipient)
        await User.findByIdAndUpdate(friendRequest.sender,
            {$addToSet : {friends : friendRequest.recipient}
        });//push the recipient

        await User.findByIdAndUpdate(friendRequest.recipient,
            {$addToSet : {friends : friendRequest.sender}
        });//push the sender

        //addToSet is used to add the friend to the friend list of both users without creating duplicates

        res.status(200).json({message : "Friend request accepted successfully !"});
    } catch (error) {
        console.error("Error in acceptFriendRequest controller",error.message);
        res.status(500).json({message : "Internal Server Error !"});
        
    }
}



// export async function getFriendRequests(req,res) {
//     try {
//         const incomingRequests = await FriendRequest.find({recipient : req.user.id, status : "pending"}).populate("sender","fullName profilePicture nativeLanguage learningLanguage");

//         const acceptedRequests = await FriendRequest.find({recipient : req.user.id, status : "accepted"}).populate("recipient","fullName profilePicture");

//         res.status(200).json({incomingRequests,acceptedRequests});

//     } catch (error) {
//         console.log("Error in getPendingFriendRequests controller",error.message);
//         res.status(500).json({message : "Internal Server Error !"});  
//     }
// }

export async function getFriendRequests(req, res) {
  try {
    // ✅ incoming requests (people sent YOU request)
    const incomingRequests = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePicture nativeLanguage learningLanguage",
    );

    // ✅ accepted requests (YOU sent, THEY accepted)
    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id, // 🔥 FIX HERE
      status: "accepted",
    }).populate(
      "recipient",
      "fullName profilePicture nativeLanguage learningLanguage",
    );

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error !" });
  }
}





export async function getOutgoingFriendRequests(req,res) {
    try {
        const outgoingRequests = await FriendRequest.find({sender : req.user.id, status : "pending"}).populate("recipient","fullName profilePicture nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);

    } catch (error) {
        console.log("Error in getOutgoingFriendRequests controllers",error.message);
        res.status(500).json({message : "Internal Server Error !"});
        
        
    }
}



