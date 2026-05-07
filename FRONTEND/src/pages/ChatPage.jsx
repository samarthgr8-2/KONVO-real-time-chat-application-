import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser.js';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api.js';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat';
import { toast } from "react-hot-toast";
import ChatLoader from '../components/ChatLoader.jsx';
import CallButton from '../components/CallButton.jsx';


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
//const STREAM_API_KEY = "2u33u9twsj6r";

const ChatPage = () => {

  const {id : targetUserId} = useParams();

  // const {chatClient , setChatClient} = useState(null);
  // const {channel , setChannel} = useState(null);
  // const {loading , setLoading} = useState(true);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const {authUser} = useAuthUser();

  const {data : tokenData} = useQuery({
    queryKey : ["streamToken"],
    queryFn : getStreamToken,
    enabled : !!authUser  //donot run this query function until we run this authenticated user
  });




  useEffect(() => {
    const initChat = async()=>{
      if(!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client ...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        //_id is for mongo db
        await client.connectUser({
          id : authUser._id,
          name : authUser.fullName,
          image : authUser.profilePicture
        },
      tokenData.token);

      //for chat we are creating a unique channel id
      const channelId = [authUser._id , targetUserId].sort().join("-");

      //if a and b start a chat  
      //if a starts a chat with b then channel id will be [aid,bid]
      //if b starts a  chat with a then channel id will be [bid,aid]==> sorted array will give [aid,bid] which are same

      const currentChannel = client.channel("messaging" ,channelId,{
        members : [authUser._id , targetUserId]
      });

      await currentChannel.watch();//incoming changes ie messages

      setChatClient(client);
      setChannel(currentChannel);
    
      } catch (error) {
        console.error("Error initializing chat :",error);
       // console.log("STREAM_API_KEY:", STREAM_API_KEY);
       // console.log(import.meta.env.VITE_STREAM_API_KEY);
        toast.error("Could not initialize chat.Please try again.");
        
      }finally{
        setLoading(false);
      }
    };

    initChat();
  },[tokenData,authUser,targetUserId]);




  const handleVideoCall = ()=>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text : `Started a video call.Please join : ${callUrl}`
      })

      toast.success("Video call link sent to the chat!");
    }

  };



  

  if(loading || !chatClient || !channel)  return <ChatLoader />;





  return (
    <div className="h-[93vh] ">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <Window>
              <CallButton handleVideoCall={handleVideoCall} />
              <ChannelHeader />
              <MessageList />
              <MessageComposer focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatPage;

