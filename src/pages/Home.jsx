import { useState, useEffect } from 'react'
import NewsBanner from '../components/NewsBanner'
import '../styles/pages/home.css'

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      title: "Турнирный рай для геймеров",
      subtitle: "Призовые фонды до 500 000 ₽",
      bgImage: "/images/tournament-bg.jpg",
      ctaText: "Участвовать"
    },
    {
      title: "VR-иммерсив без границ",
      subtitle: "Полное погружение в 8K",
      bgImage: "/images/vr-bg.jpg",
      ctaText: "Попробовать"
    },
    {
      title: "Премиум игровые станции",
      subtitle: "RTX 4090 + 240Hz мониторы",
      bgImage: "/images/pc-bg.jpg",
      ctaText: "Забронировать"
    }
  ]

  const news = [
    {
      id: 1,
      title: 'Новый сезон киберлиги',
      description: 'Регистрация на осенний чемпионат открыта до 30 сентября',
      date: '15.09.2023',
      tag: 'Турниры'
    },
    {
      id: 2,
      title: '24/7 - теперь и в выходные!',
      description: 'С пятницы по воскресенье работаем без перерывов',
      date: '01.09.2023',
      tag: 'Акция'
    }
  ]

  const stats = [
    { value: "150+", label: "Довольных клиентов" },
    { value: "20+", label: "Проведённых турниров" },
    { value: "99%", label: "Удовлетворённости" },
    { value: "240Hz", label: "Мониторы" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="cta-button">{slide.ctaText}</button>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-club">
        <div className="container">
          <div className="about-content">
            <h2>CyberZone — это стиль жизни</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  Мы создали не просто игровой клуб, а эпицентр киберкультуры вашего города. 
                  Здесь сходятся профессиональные киберспортсмены и casual-геймеры, 
                  чтобы получить незабываемый опыт.
                </p>
                <ul className="features-list">
                  <li>🎯 Турнирная лига с ежемесячными чемпионатами</li>
                  <li>💎 Лучшее "железо" на рынке (апгрейд каждые 6 месяцев)</li>
                  <li>🍕 Уютный лаунж-бар с геймерским меню</li>
                  <li>🎮 50+ лицензионных игр всегда установлены</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <h2>Что нового?</h2>
          <div className="news-grid">
            {news.map(item => (
              <NewsBanner key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <h2>Нас уже выбрали</h2>
          <div className="proof-grid">
            <div className="proof-item">
              <img src="/images/esforce.png" alt="ESForce" />
            </div>
            <div className="proof-item">
              <img src="/images/redbull.png" alt="Red Bull" />
            </div>
            <div className="proof-item">
              <img src="/images/dota2.png" alt="Dota 2" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Готов окунуться в мир киберспорта?</h2>
          <p>Первые 2 часа игры — со скидкой 30% для новых посетителей</p>
          <button className="cta-button">Забронировать место</button>
        </div>
      </section>
    </div>
  )
}

export default Home