import { useEffect, useState } from "react";
import type { Category } from "../types/Event";
import { useNavigate, useParams } from "react-router-dom";
import { authFetch } from "../utils/api";


function toLocalInput(iso: string) {
    const d = new Date(iso)
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

function CreateEventPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = id !== undefined
    const [form, setForm] = useState({
        title: '', description: '', date: '', address: '',
        price: '', capacity: '', image: '', categoryId: ''
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState('')


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    const categoryItems = categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ))


    useEffect(() => {
        if (!isEdit) {
            return
        }
        fetch(`http://localhost:3000/events/${id}`)
            .then(response => response.json())
            .then(data => setForm({ title: data.title, description: data.description, address: data.address, image: data.image, price: String(data.price), capacity: String(data.capacity), categoryId: data.category.id, date: toLocalInput(data.date) }))
    }, [id])


    function handleSubmit() {
        setError('')

        if (Object.values(form).some(value => !value)) {
            setError('Заполните все поля')
            return
        }
        if (Number(form.price) < 0) {
            setError('Укажите цену (0, если мероприятие бесплатное)')
            return
        }
        if (Number(form.capacity) < 1) {
            setError('Укажите количество мест')
            return
        }

        const method = isEdit ? 'PATCH' : 'POST'
        const url = isEdit
            ? `http://localhost:3000/events/${id}`
            : 'http://localhost:3000/events'

        authFetch(url, { method, headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ ...form, date: new Date(form.date).toISOString(), price: Number(form.price), capacity: Number(form.capacity) }) })
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => navigate(`/events/${data.id}`))
                    return
                }
                if (response.status === 401) {
                    setError('Войдите в аккаунт заново')
                    return
                }
                setError('Не удалось создать мероприятие')
            })
            .catch(() => { setError('Нет связи с сервером') })
    }

    return (
        <>
            <h1>{isEdit ? 'Редактировать мероприятие' : 'Создать мероприятие'}</h1>
            <input type="text" placeholder="Например, Летний джаз в Саду 'Эрмитаж'" name="title" value={form.title} onChange={handleChange} />
            <textarea placeholder="Расскажите, о чем ваше мероприятие, что ждет участников..." name="description" value={form.description} onChange={handleChange} />
            <input type="datetime-local" name="date" value={form.date} onChange={handleChange} />
            <input type="text" placeholder="Например, Москва, ул.Покровка, 47" name="address" value={form.address} onChange={handleChange} />
            <input type="number" min="0" placeholder="Например, 500" name="price" value={form.price} onChange={handleChange} />
            <input type="number" min="1" placeholder="Например, 100" name="capacity" value={form.capacity} onChange={handleChange} />
            <input type="text" placeholder="Изображение мероприятия" name="image" value={form.image} onChange={handleChange} />
            <select name="categoryId" value={form.categoryId} onChange={handleChange}>
                <option value="">Выберите категорию</option>
                {categoryItems}
            </select>
            <button onClick={handleSubmit}>{isEdit ? 'Сохранить' : 'Создать мероприятие'}</button>
            {error && <p>{error}</p>}


        </>
    )
}

export default CreateEventPage;