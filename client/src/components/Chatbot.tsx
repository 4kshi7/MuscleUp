import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:8787/chat', { message: input });
      const botMessage: Message = { text: response.data.data, isUser: false };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: 'Error: Something went wrong.', isUser: false };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setInput('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg overflow-auto h-[50vh] absolute top-[40%] right-5">
      <div className="flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-lg h-96">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

