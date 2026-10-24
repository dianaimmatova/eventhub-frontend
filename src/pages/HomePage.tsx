import { useEffect, useState } from "react";
import type { EventData } from "../types/Event";
import EventCard from "../components/EventCard";

function HomePage() {
    const [events, setEvents] = useState<EventData[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/events')
        .then((response) => response.json())
        .then((data) => setEvents(data))
    }, [])

    const listItems = events.map(event => (
        <EventCard key={event.id} event={event}/>
    ))
    return (
        <>
        <h1>Афиша мероприятий</h1>
        {listItems}
        </>
    )
}

export default HomePage;