import { Link } from "react-router-dom";
import type { EventData } from "../types/Event";
import { Calendar, MapPin, Users, Wallet } from "lucide-react";

function EventCard({ event }: { event: EventData }) {

    return (
        <div className="event-card">
            <div className="event-card__image">
                {event.image && <img src={event.image} alt={event.title}  onError={(e) => { e.currentTarget.style.display = 'none'; }}/>}
                <span className="event-card__tag">{event.category.name}</span>
            </div>

            <div className="event-card__body">
                <h3 className="event-card__title">{event.title}</h3>

                <p className="event-card__info">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleString('ru-RU', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    })}</span>
                </p>
                <p className="event-card__info">
                    <MapPin size={16} />
                    <span>{event.address}</span>
                </p>
                <p className="event-card__info">
                    <Wallet size={16} />
                    <span>{event.price === 0 ? "Бесплатно" : `${event.price} сом`}</span>
                </p>
                {event.freeSeats !== undefined && (
                    <p className="event-card__info">
                        <Users size={16} />
                        <span>Осталось {event.freeSeats} мест</span>
                    </p>
                )}

                <Link to={`/events/${event.id}`} className="btn btn--block event-card__btn">
                    Подробнее
                </Link>
            </div>
        </div>
    )
}

export default EventCard