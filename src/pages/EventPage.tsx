import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { EventData } from "../types/Event";
import { AuthContext } from "../context/AuthContext";
import { authFetch } from "../utils/api";

function EventPage() {
    const { id } = useParams()
    const [event, setEvent] = useState<EventData | null>(null)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)


    function loadEvent() {
        fetch(`http://localhost:3000/events/${id}`)
            .then(response => response.json())
            .then(data => setEvent(data))
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

    if (!event) {
        return <p>Загрузка...</p>
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
            .catch(() => {setMessage('Нет связи с сервером')})
    }

    return (
        <>
            <p>{event.category.name}</p>
            <h1>{event.title}</h1>
            <p>{new Date(event.date).toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p>{event.address}</p>
            <p>{event.price === 0 ? "Бесплатно" : `${event.price} сом`}</p>
            <p>Осталось {event.freeSeats} мест из {event.capacity}</p>
            <p>{event.user?.name}</p>
            <button onClick={handleRegister}>Записаться</button>
            {message && <p>{message}</p>}
            <p>{event.description}</p>

            {isOwner && <button onClick={handleDelete}>Удалить</button>}
            {isOwner && <Link to={`/events/${id}/edit`}>Редактировать</Link>}

        </>
    )
}

export default EventPage;