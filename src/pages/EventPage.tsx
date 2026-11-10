import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { EventData } from "../types/Event";
import { AuthContext } from "../context/AuthContext";
import { authFetch } from "../utils/api";
import { ArrowLeft, Calendar, MapPin, User, Users, Wallet } from "lucide-react";

function EventPage() {
    const { id } = useParams()
    const [event, setEvent] = useState<EventData | null>(null)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [error, setError] = useState('')


    function loadEvent() {
        fetch(`http://localhost:3000/events/${id}`)
            .then(response => {
                if (response.status === 404) {
                    throw new Error('Мероприятие не найдено')
                }
                if (!response.ok) {
                    throw new Error('Не удалось загрузить мероприятие')
                }
                return response.json()
            })
            .then(data => {
                setError('')
                setEvent(data)
            })
            .catch(err => setError(err.message === 'Мероприятие не найдено'
                ? 'Мероприятие не найдено'
                : 'Не удалось загрузить мероприятие'))
    }

    useEffect(() => { loadEvent() }, [id])

    useEffect(() => {
        if (!auth?.isLoggedIn) {
            setCurrentUserId(null)
            return
        }

        authFetch('http://localhost:3000/auth/me')
            .then((response) => response.json())
            .then((data) => setCurrentUserId(data.id))
    }, [auth?.isLoggedIn])

    if (error) {
        return (
            <div className="page">
                <Link to="/" className="back-link">
                    <ArrowLeft size={18} />
                    <span>Назад к мероприятиям</span>
                </Link>
                <p className="error">{error}</p>
            </div>
        )
    }

    if (!event) {
        return <div className="page"><p className="empty">Загрузка...</p></div>
    }

    const isOwner = currentUserId !== null && currentUserId === event.user?.id

    function handleRegister() {
        setMessage('')

        if (!auth?.isLoggedIn) {
            navigate('/login')
            return
        }

        authFetch('http://localhost:3000/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: id }) })
            .then(response => {
                if (response.ok) {
                    setMessage('Вы записаны')
                    loadEvent()
                    return
                }
                if (response.status === 409) {
                    response.json().then(data => {
                        setMessage(data.message)
                    })
                    return
                }
                setMessage('Не удалось записаться')
            })
            .catch(() => { setMessage('Нет связи с сервером') })
    }

    function handleDelete() {
        if (!window.confirm('Удалить мероприятие?')) return;

        authFetch(`http://localhost:3000/events/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    navigate('/')
                    return
                }
                if (response.status === 403) {
                    setMessage('Нельзя удалить чужое мероприятие')
                    return
                }
                setMessage('Не удалось удалить')
            })
            .catch(() => { setMessage('Нет связи с сервером') })
    }

    return (
        <div className="page">
            <Link to="/" className="back-link">
                <ArrowLeft size={18} />
                <span>Назад к мероприятиям</span>
            </Link>

            <div className="event-details">
                <div className="event-details__main">
                    <div className="event-details__image">
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.title}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        )}
                    </div>

                    <section className="event-details__about">
                        <h2 className="event-details__about-title">О мероприятии</h2>
                        <p className="event-details__description">{event.description}</p>
                    </section>
                </div>

                <aside className="event-details__side">
                    <span className="tag">{event.category.name}</span>
                    <h1 className="event-details__title">{event.title}</h1>

                    <p className="event-details__info">
                        <Calendar size={20} />
                        <span>
                            {new Date(event.date).toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </p>
                    <p className="event-details__info">
                        <MapPin size={20} />
                        <span>{event.address}</span>
                    </p>
                    <p className="event-details__info">
                        <Wallet size={20} />
                        <span>{event.price === 0 ? "Бесплатно" : `${event.price} сом`}</span>
                    </p>
                    <p className="event-details__info">
                        <Users size={20} />
                        <span>Осталось {event.freeSeats} мест из {event.capacity}</span>
                    </p>
                    <p className="event-details__info">
                        <User size={20} />
                        <span>{event.user?.name}</span>
                    </p>

                    <button className="btn btn--lg btn--block" onClick={handleRegister}>
                        Записаться
                    </button>

                    {message && <p className="message">{message}</p>}

                    {isOwner && (
                        <div className="event-details__actions">
                            <Link to={`/events/${id}/edit`} className="btn btn--outline">Редактировать</Link>
                            <button className="btn btn--danger" onClick={handleDelete}>Удалить</button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default EventPage;