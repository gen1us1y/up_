import TeamMember from '../components/TeamMember'
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import '../styles/components/reviews.css'
import '../styles/pages/about.css'

export default function About() {
  const { API_URL } = useContext(ApiContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const features = [
    {
      icon: '🎮',
      title: '150+ довольных геймеров',
      text: 'Еженедельно к нам приходят новые участники сообщества'
    },
    {
      icon: '🏆',
      title: '20 проведенных турниров',
      text: 'С суммарным призовым фондом более 1 000 000 рублей'
    },
    {
      icon: '💻',
      title: 'Топовое оборудование',
      text: 'Каждые 6 месяцев полное обновление парка техники'
    }
  ]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) throw new Error('Ошибка загрузки отзывов');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [API_URL]);

  // Обработчик добавления нового отзыва
  const handleNewReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  if (isLoading) return <div>Загрузка отзывов...</div>;
  if (error) return <div>Ошибка: {error}</div>;


  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Мы — больше чем просто игровой клуб</h1>
          <p>Это место, где рождаются киберспортивные легенды</p>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-content">
            <h2>Наша философия</h2>
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <h3>🤝 Сообщество</h3>
                <p>Мы создаем пространство без токсичности, где каждый геймер найдет единомышленников</p>
              </div>
              <div className="philosophy-card">
                <h3>⚡ Энергия</h3>
                <p>Заряжаем атмосферой настоящего киберспорта — с эмоциями, азартом и адреналином</p>
              </div>
              <div className="philosophy-card">
                <h3>💎 Качество</h3>
                <p>Только профессиональное оборудование и регулярные апгрейды</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Почему выбирают нас</h2>
          <div className="features-grid">
            {features.map((item, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

		<div className="about-page">
		  <section className="reviews-section">
			<h2>Отзывы наших клиентов</h2>
			
			<div className="reviews-list">
			  {reviews.map(review => (
				<ReviewCard 
				  key={review.id} 
				  review={review} 
				/>
			  ))}
			</div>
			
			<ReviewForm onReviewAdded={handleNewReview} />
			
		  </section>
		</div>
	  );
	}

      <section className="join-section">
        <div className="container">
          <h2>Готов вступить в наше комьюнити?</h2>
          <p>Первая игровая сессия со скидкой 50% для новых участников</p>
          <button className="cta-button">Забронировать место</button>
        </div>
      </section>
    </div>
  )
}