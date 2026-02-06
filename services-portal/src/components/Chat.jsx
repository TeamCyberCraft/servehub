import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Chat({ contextId, type = 'service' }) {
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: `Welcome to the ${type} chat!`, timestamp: new Date().toLocaleTimeString() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      navigate('/signup');
      return;
    }
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
          placeholder={isAuthenticated() ? "Type a message..." : "Sign in to chat"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isAuthenticated() && type === 'community'} // Community is view-only for guests
        />
        <button type="submit" className="btn btn-primary" disabled={!isAuthenticated() && type === 'community'}>
          Send
        </button>
      </form>
      {!isAuthenticated() && (
        <p className="chat-hint">You must <span className="link" onClick={() => navigate('/signup')}>Sign In</span> to participate.</p>
      )}
    </div>
  );
}
