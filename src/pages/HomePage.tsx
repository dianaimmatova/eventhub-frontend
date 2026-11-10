import { useEffect, useState } from "react";
import type { Category, EventData } from "../types/Event";
import EventCard from "../components/EventCard";

function HomePage() {
    const [events, setEvents] = useState<EventData[]>([])
    const [search, setSearch] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const params = new URLSearchParams()
        if (search) {
            params.append('search', search)
        }
        if (categoryId) {
            params.append('categoryId', categoryId)
        }
        fetch(`http://localhost:3000/events?${params.toString()}`)
            .then((response) => response.json())
            .then((data) => setEvents(data))
    }, [search, categoryId])


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
        <div className="page">
            <h1 className="page__title">Афиша мероприятий</h1>
            <p className="page__subtitle">Открывайте интересные события рядом с вами</p>

            <div className="filters">
                <input
                    className="field__control filters__search"
                    type="text"
                    placeholder="Поиск мероприятий по названию..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="field__control filters__select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categoryItems}
                </select>
            </div>

            <div className="events-grid">
                {listItems}
            </div>
        </div>
    )
}

export default HomePage;