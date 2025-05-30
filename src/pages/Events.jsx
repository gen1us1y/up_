import EventCard from '../components/EventCard'
import '../styles/pages/events.css'
import { useState, useEffect, useReducer, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext.jsx';

function eventsReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'REGISTER':
      return {
        ...state,
        events: state.events.map(event => 
          event.id === action.payload ? { ...event, registered: true } : event
        )
      };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'DELETE_EVENT':
      return { 
        ...state, 
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
}

export default function Events() {
  const { API_URL } = useContext(ApiContext);
  const [state, dispatch] = useReducer(eventsReducer, { events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных (GET)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        dispatch({ type: 'SET_EVENTS', payload: data });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_URL]);

  // Регистрация на мероприятие (PATCH)
  const handleRegister = async (id) => {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registered: true })
      });
      
      if (!response.ok) throw new Error('Ошибка регистрации');
      dispatch({ type: 'REGISTER', payload: id });
    } catch (err) {
      setError(err.message);
    }
  };

  // Удаление мероприятия (DELETE)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Ошибка удаления');
      dispatch({ type: 'DELETE_EVENT', payload: id });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="events-page">
      <h2>Мероприятия</h2>
      <ul className="events-list">
        {state.events.map(event => (
          <li key={event.id} className="event-item">
            <div>
              <h3>{event.title}</h3>
              <p>Дата: {event.date}</p>
              <p>Статус: {event.registered ? '✅ Зарегистрирован' : '❌ Не участвует'}</p>
            </div>
            <div className="event-actions">
              <button 
                onClick={() => handleRegister(event.id)}
                disabled={event.registered}
              >
                {event.registered ? 'Уже участвую' : 'Зарегистрироваться'}
              </button>
              <button 
                onClick={() => handleDelete(event.id)}
                className="delete-btn"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <AddEventForm />
    </div>
  );
}

<section className="rules-section">
<div className="container">
  <h2>Правила участия</h2>
  <div className="rules-content">
    <ol>
      <li>Регистрация на турнир обязательна</li>
      <li>Минимальный возраст участника - 14 лет</li>
      <li>Запрещается использование читов и запрещённого ПО</li>
      <li>Организаторы оставляют право изменять правила</li>
      <li>Призовой фонд выплачивается в течение 3 дней после турнира</li>
    </ol>
    <p>
      Для регистрации на мероприятие нажмите кнопку "Зарегистрироваться" на карточке события.
      После регистрации с вами свяжется наш администратор для подтверждения.
    </p>
  </div>
</div>
</section>  

// Компонент формы (добавление через POST)
function AddEventForm() {
  const { API_URL } = useContext(ApiContext);
  const [formData, setFormData] = useState({ 
    title: '', 
    date: '',
    registered: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Ошибка добавления');
      const newEvent = await response.json();
      alert(`Мероприятие "${newEvent.title}" добавлено!`);
      setFormData({ title: '', date: '', registered: false });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3>Добавить новое мероприятие</h3>
      <div className="form-group">
        <label>Название:</label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Введите название"
          required
        />
      </div>
      <div className="form-group">
        <label>Дата:</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        Добавить мероприятие
      </button>
    </form>
  );
}

