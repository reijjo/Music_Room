import { MessageInfo } from "../../utils/types";

const MessageBanner = (message: MessageInfo) => {
  if (!message || !message.message) return null;
  return <p className={message.className}>{message.message}</p>;
};

export default MessageBanner;
