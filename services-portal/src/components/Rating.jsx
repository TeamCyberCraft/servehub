import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Rating({ serviceId, initialRating = 0, onRate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRate = (value) => {
    if (!isAuthenticated()) {
      navigate('/signup');
      return;
    }
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div className="rating-component">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      <span className="rating-value">{rating > 0 ? `${rating}/5` : 'Not rated yet'}</span>
    </div>
  );
}
