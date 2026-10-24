import { useEffect, useState } from "react";
import type { Category, EventData } from "../types/Event";
import EventCard from "../components/EventCard";

function HomePage() {
    const [events, setEvents] = useState<EventData[]>([])
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch(`http://localhost:3000/events?search=${encodeURIComponent(search)}`)
        .then((response) => response.json())
        .then((data) => setEvents(data))
    }, [search])


    useEffect(() => {
        fetch('http://localhost:3000/categories')
        .then((response) => response.json())
        .then((data) => setCategories(data))
    }, [])

    const listItems = events.map(event => (
        <EventCard key={event.id} event={event}/>
    ))


    return (
        <>
        <h1>Афиша мероприятий</h1>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        {listItems}
        </>
    )
}

export default HomePage;