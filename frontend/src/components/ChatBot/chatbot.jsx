import useChatbot from "./chatbot";
import "./chatbot.css";

function Chatbot() {
  const {
    message,
    setMessage,
    messages,
    isLoading,
    isOpen,
    setIsOpen,
    handleSendMessage,
    handleCloseChat,
  } = useChatbot();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-toggle-button"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          💬 AskMe
        </button>
      )}

      {isOpen && (
        <aside className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <h3>CodeMind Assistant</h3>
              <p>General Coding Help</p>
            </div>

            <button
              className="chatbot-close-button"
              type="button"
              onClick={handleCloseChat}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((chatMessage, index) => (
              <div
                key={index}
                className={`chat-message ${chatMessage.sender}`}
              >
                <p>{chatMessage.text}</p>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask a coding question..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

export default Chatbot;