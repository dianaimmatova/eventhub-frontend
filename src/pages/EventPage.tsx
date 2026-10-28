import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { EventData } from "../types/Event";

function EventPage() {
    const { id } = useParams()
    const [event, setEvent] = useState<EventData | null>(null)

    useEffect(() => {
        fetch(`http://localhost:3000/events/${id}`)
            .then((response) => response.json())
            .then((data) => setEvent(data))
    }, [id])

    if (!event) {
        return <p>Загрузка...</p>
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
            <button>Записаться</button>

            <p>{event.description}</p>

        </>
    )
}

export default EventPage;