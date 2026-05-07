import {StreamChat} from "stream-chat";
import "dotenv/config";//This automatically loads environment variables from a .env file into process.env.


//make a user in getstream
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key or secret is missing");    
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);//upsert means either create or update
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
};



//for chatting part
export const generateStreamToken = (userId) =>  {
    try {
        //ensures userId  is a string 
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error in generating Stream token:",error.message);  
    }
};


