import { useEffect, useState } from "react";
import type { Category } from "../types/Event";

function CreateEventPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [capacity, setCapacity] = useState('')
    const [image, setImage] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    const categoryItems = categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ))

    function handleSubmit() {

    }

    return (
        <>
            <h1>Создать мероприятие</h1>
            <input type="text" placeholder="Название мероприятия" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="datetime-local" placeholder="Дата и время" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="number" min="0" placeholder="Цена билета" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" min="1" placeholder="Количество мест" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            <input type="text" placeholder="Изображение мероприятия" value={image} onChange={(e) => setImage(e.target.value)}/>
            <select aria-placeholder="Категория" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Выберите категорию</option>
                {categoryItems}
            </select>
            <button onClick={handleSubmit}>Создать мероприятие</button>
            {error && <p>{error}</p>}


        </>
    )
}

export default CreateEventPage;