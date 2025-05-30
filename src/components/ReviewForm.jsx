import { useState, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';

export default function ReviewForm({ onReviewAdded }) {
  const { API_URL } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    author: '',
    text: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Ошибка при отправке');
      
      const newReview = await response.json();
      onReviewAdded(newReview);
      setFormData({ author: '', text: '', rating: 5 });
      alert('Отзыв успешно добавлен!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось отправить отзыв');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Добавить отзыв</h3>
      
      <div className="form-group">
        <label>Ваше имя:</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          required
          minLength="2"
        />
      </div>

      <div className="form-group">
        <label>Оценка:</label>
        <select
          value={formData.rating}
          onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num} ★</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Текст отзыва:</label>
        <textarea
          value={formData.text}
          onChange={(e) => setFormData({...formData, text: e.target.value})}
          required
          minLength="10"
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-btn"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
      </button>
    </form>
  );
}