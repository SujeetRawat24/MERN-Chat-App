import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { getMessages, isMessagesLoading,selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages]);

  if(isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <p>messages...</p>

      <MessageInput/>

    </div>
  )
}

export default ChatContainer