import { useEffect, useState } from "react";
import type { Category } from "../types/Event";
import { Link, useNavigate, useParams } from "react-router-dom";
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

        authFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, date: new Date(form.date).toISOString(), price: Number(form.price), capacity: Number(form.capacity) }) })
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
        <div className="page">
            <h1 className="page__title">
                {isEdit ? 'Редактировать мероприятие' : 'Создать мероприятие'}
            </h1>
            <p className="page__subtitle">
                Расскажите о вашем мероприятии, чтобы привлечь участников
            </p>

            <div className="event-form">
                <div className="event-form__main">
                    <div className="field">
                        <label className="field__label" htmlFor="title">
                            Название мероприятия <span className="field__required">*</span>
                        </label>
                        <input className="field__control" id="title" type="text"
                            placeholder="Например, Летний джаз в Саду «Эрмитаж»"
                            name="title" value={form.title} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label className="field__label" htmlFor="description">
                            Описание <span className="field__required">*</span>
                        </label>
                        <textarea className="field__control" id="description"
                            placeholder="Расскажите, о чём ваше мероприятие, что ждёт участников..."
                            name="description" value={form.description} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label className="field__label" htmlFor="date">
                            Дата и время <span className="field__required">*</span>
                        </label>
                        <input className="field__control" id="date" type="datetime-local"
                            name="date" value={form.date} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label className="field__label" htmlFor="address">
                            Адрес <span className="field__required">*</span>
                        </label>
                        <input className="field__control" id="address" type="text"
                            placeholder="Например, Москва, ул. Покровка, 47"
                            name="address" value={form.address} onChange={handleChange} />
                    </div>

                    <div className="field-row">
                        <div className="field">
                            <label className="field__label" htmlFor="categoryId">
                                Категория <span className="field__required">*</span>
                            </label>
                            <select className="field__control" id="categoryId"
                                name="categoryId" value={form.categoryId} onChange={handleChange}>
                                <option value="">Выберите категорию</option>
                                {categoryItems}
                            </select>
                        </div>

                        <div className="field">
                            <label className="field__label" htmlFor="price">
                                Цена билета, сом <span className="field__required">*</span>
                            </label>
                            <input className="field__control" id="price" type="number" min="0"
                                placeholder="Например, 500"
                                name="price" value={form.price} onChange={handleChange} />
                        </div>

                        <div className="field">
                            <label className="field__label" htmlFor="capacity">
                                Количество мест <span className="field__required">*</span>
                            </label>
                            <input className="field__control" id="capacity" type="number" min="1"
                                placeholder="Например, 100"
                                name="capacity" value={form.capacity} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="event-form__side">
                    <div className="field">
                        <label className="field__label" htmlFor="image">
                            Изображение мероприятия
                        </label>
                        <input className="field__control" id="image" type="text"
                            placeholder="Ссылка на изображение"
                            name="image" value={form.image} onChange={handleChange} />
                    </div>

                    {form.image && (
                        <div className="event-form__preview">
                            <img
                                src={form.image}
                                alt="Предпросмотр"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="event-form__footer">
                <Link to="/" className="back-link">Отмена</Link>
                <button className="btn btn--lg" onClick={handleSubmit}>
                    {isEdit ? 'Сохранить' : 'Создать мероприятие'}
                </button>
            </div>
        </div>
    )
}

export default CreateEventPage;