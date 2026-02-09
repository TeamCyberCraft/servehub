import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Chat({ contextId, type = 'service' }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      user: 'System', 
      text: `Welcome to the ${type} chat${contextId ? ` for ${contextId}` : ''}!`, 
      timestamp: new Date().toLocaleTimeString() 
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { user, isAuthenticated } = useAuth();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) return;
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      user: user.name,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="chat-component">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <span className="chat-user">{msg.user}:</span>
            <span className="chat-text">{msg.text}</span>
            <span className="chat-time">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder={isAuthenticated() ? "Type a message..." : "Auth required (Authelia)"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isAuthenticated() && type === 'community'} // Community is view-only for guests
        />
        <button type="submit" className="btn btn-primary" disabled={!isAuthenticated() && type === 'community'}>
          Send
        </button>
      </form>
      {!isAuthenticated() && (
        <p className="chat-hint">Authentication is handled by Authelia. Please log in via the gateway.</p>
      )}
    </div>
  );
}
