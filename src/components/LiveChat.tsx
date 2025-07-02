import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! 👋 How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'Track my order',
    'Size guide',
    'Return policy',
    'Shipping info'
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: "Thanks for your message! I'll connect you with a customer service representative who can help you with that.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      message: reply,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate specific responses
    setTimeout(() => {
      let botMessage = '';
      switch (reply) {
        case 'Track my order':
          botMessage = 'I can help you track your order! Please provide your order number and email address.';
          break;
        case 'Size guide':
          botMessage = 'You can find our comprehensive size guide in the product pages or visit our Size Guide page for detailed measurements.';
          break;
        case 'Return policy':
          botMessage = 'We offer a 30-day return policy for all items. Items must be unworn with tags attached. Would you like more details?';
          break;
        case 'Shipping info':
          botMessage = 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, express shipping 1-2 days.';
          break;
        default:
          botMessage = 'Let me connect you with a customer service representative.';
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: botMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-50 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">SHOP.CO Support</h3>
                <p className="text-xs opacity-75">Online now</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot size={16} className="mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User size={16} className="mt-0.5 flex-shrink-0" />
                    )}
                    <span>{message.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
              <div className="grid grid-cols-2 gap-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t p-4 flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChat;