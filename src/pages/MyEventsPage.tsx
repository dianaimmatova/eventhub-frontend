import { useEffect, useState } from "react";
import type { EventData } from "../types/Event";
import EventCard from "../components/EventCard";
import { authFetch } from "../utils/api";

function MyEventsPage() {
    const [tab, setTab] = useState('created')
    const [myEvents, setMyEvents] = useState<EventData[]>([])
    const [myRegistrations, setMyRegistrations] = useState<EventData[]>([])

    useEffect(() => {
        authFetch('http://localhost:3000/events/my')
            .then((response) => response.json())
            .then((data) => setMyEvents(data))
    }, [])
    
    useEffect(() => {
        authFetch('http://localhost:3000/registrations/my')
            .then((response) => response.json())
            .then((data) => setMyRegistrations(data))
    }, [])

    const list = tab === 'created' ? myEvents : myRegistrations

    return (
        <div className="page">
            <h1 className="page__title">Мои мероприятия</h1>
            <p className="page__subtitle">Мероприятия, которые вы создали или на которые записаны</p>

            <div className="tabs">
                <button
                    className={tab === 'created' ? 'tabs__item tabs__item--active' : 'tabs__item'}
                    onClick={() => setTab('created')}
                >
                    Созданные мной
                </button>
                <button
                    className={tab === 'registered' ? 'tabs__item tabs__item--active' : 'tabs__item'}
                    onClick={() => setTab('registered')}
                >
                    Я записан
                </button>
            </div>

            {list.length === 0 ? (
                <p className="empty">
                    {tab === 'created'
                        ? 'Вы пока не создали ни одного мероприятия'
                        : 'Вы пока никуда не записаны'}
                </p>
            ) : (
                <div className="events-grid">
                    {list.map(event => (<EventCard key={event.id} event={event} />))}
                </div>
            )}
        </div>
    )
}

export default MyEventsPage;