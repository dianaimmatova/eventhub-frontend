import { useEffect, useState } from "react";
import type { EventData } from "../types/Event";
import EventCard from "../components/EventCard";

function MyEventsPage() {
    const [tab, setTab] = useState('created')
    const [myEvents, setMyEvents] = useState<EventData[]>([])
    const [myRegistrations, setMyRegistrations] = useState<EventData[]>([])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        fetch('http://localhost:3000/events/my', {headers: {'Authorization': `Bearer ${token}` }})
            .then((response) => response.json())
            .then((data) => setMyEvents(data))
    }, [])
    console.log(myEvents)
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        fetch('http://localhost:3000/registrations/my', {headers: {'Authorization': `Bearer ${token}`} })
            .then((response) => response.json())
            .then((data) => setMyRegistrations(data))
    }, [])

    const list = tab === 'created' ? myEvents: myRegistrations      

    return (
        <>
            <button onClick={() => setTab('created')}>Созданные мной</button>
            <button onClick={() => setTab('registered')}>Я записан</button>
            {list.map(event => (<EventCard key={event.id} event={event} />))}
        </>
    )
}

export default MyEventsPage;