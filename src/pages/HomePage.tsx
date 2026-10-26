import { useEffect, useState } from "react";
import type { Category, EventData } from "../types/Event";
import EventCard from "../components/EventCard";

function HomePage() {
    const [events, setEvents] = useState<EventData[]>([])
    const [search, setSearch] = useState('')
    const [categoryId, setCategoryId] = useState('')
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
        <EventCard key={event.id} event={event} />
    ))

    const categoryItems = categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ))

    return (
        <>
            <h1>Афиша мероприятий</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Все категории</option>
                {categoryItems}
            </select>
            {listItems}
        </>
    )
}

export default HomePage;