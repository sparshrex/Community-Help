import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import RatingModal from '../Rating/RatingModal';


function ChatWindow({ recipientName, messages, onSendMessage, onClose }) {
  const [newMessage, setNewMessage] = useState('');
  const [showRating,setShowRating]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleRatingSubmit = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    setShowRating(false);
    // Here you would typically make an API call to save the rating
  };
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">{recipientName}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-75">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={()=>setShowRating(true)}
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-green-600"
          >
            <Send className="w-5 h-5" />
          </button>


        </div>
      </form>

   
    </div>
  );
}

export default ChatWindow;