import TeamMember from '../components/TeamMember'
import ReviewCard from '../components/ReviewCard'
import '../styles/pages/about.css'

function About() {

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

  const reviews = [
    {
      id: 1,
      author: 'Артем "Re1nforce" Иванов',
      text: 'Играл здесь на последнем турнире по Dota 2 — лучшая организация из всех, где я был! Буду возвращаться снова.',
      rating: 5,
      date: '12.05.2025',
      avatar: '/images/reviews/avatar1.jpg'
    },
    {
      id: 2,
      author: 'Карина "Aurora" Смирнова',
      text: 'Как девушка-геймер оценила дружелюбную атмосферу. Ни разу не столкнулась с хейтом, только с поддержкой!',
      rating: 5,
      date: '05.05.2025',
      avatar: '/images/reviews/avatar2.jpg'
    }
  ]

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

      <section className="reviews-section">
        <div className="container">
          <h2>Что говорят геймеры</h2>
          <div className="reviews-grid">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

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

export default About