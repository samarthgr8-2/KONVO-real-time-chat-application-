import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({//friend request schema 
  sender: {
    type: mongoose.Schema.Types.ObjectId,//id of  the sender
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,//id of the receiver 
    ref: "User",
    required: true,
  },
  status : {
    type : String ,
    enum : ["pending","accepted"],//status of the  request no rejected friend request
    default : "pending",
  }
},
{
    timestamps : true,//timestamps should be seen  created at
});

const FriendRequest = mongoose.model("FriendRequest",friendRequestSchema);//model of the schema created 

export default FriendRequest;