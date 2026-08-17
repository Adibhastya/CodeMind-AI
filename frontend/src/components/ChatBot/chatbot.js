import { useState } from "react";
import API_BASE_URL from "../../config.js";


function useChatbot() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am CodeMind Coding Assistant. Ask me anything about programming.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);


  const handleCloseChat = () => {
  setIsOpen(false);

  setMessage("");

  setMessages([
    {
      sender: "bot",
      text: "Hi! I am CodeMind Coding Assistant. Ask me anything about programming.",
    },
  ]);
};

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) {
      return;
    }

    const currentMessage = message;

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to get response from CodeMind Assistant.");
      }

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.answer,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ]);
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    setMessage,
    messages,
    isLoading,
    isOpen,
    setIsOpen,
    handleSendMessage,
    handleCloseChat,
  };
}

export default useChatbot;