import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  //chat messages
  const { messages, getMessages, isMessagesLoading, currentGameroom  } = useChatStore();

  useEffect(() => {
    if (currentGameroom?._id)
    getMessages(currentGameroom._id);
  }, [currentGameroom?._id, getMessages]);

  if (isMessagesLoading) return (<div>Loading...</div>);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      

      <MessageInput />
    </div>
  );
};
export default ChatContainer;