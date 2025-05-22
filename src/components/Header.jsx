import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <Link to="/" className="logo">CyberZone</Link>
          {isMobile && (
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          )}
        </div>
        
        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/services">Услуги</Link></li>
            <li><Link to="/events">Мероприятия</Link></li>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/contact">Контакты</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header