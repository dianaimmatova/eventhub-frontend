import type { EventData } from "../types/Event";

function EventCard({event} : {event: EventData}) {


   return (
    <>
    <h3>{event.title}</h3>
    <p>{event.category.name}</p>
    <p>{new Date(event.date).toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <p>{event.address}</p>
    <p>{event.price === 0 ? "Бесплатно" : `${event.price} сом`}</p>
    <p>Осталось {event.freeSeats} мест</p>
     </>
   )
}

export default EventCard