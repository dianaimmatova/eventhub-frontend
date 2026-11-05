import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPage() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    function handleSubmit() {
        setError('')
        if (password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов')
            return
        }
        if (password !== confirmPassword) {
            setError('Пароли не совпадают')
            return
        }

        fetch('http://localhost:3000/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
            .then(response => {
                if (response.ok) {
                    navigate('/login')
                    return
                }
                if (response.status === 409) {
                    setError('Пользователь с такой почтой уже существует')
                    return
                }
                setError('Не удалось зарегистрироваться, попробуйте позже')
                return
            })
            .catch(() => { setError('Нет связи с сервером') })
    }


    return (
        <div className="form-card">
            <h1 className="form-card__title">Регистрация</h1>
            <p className="form-card__subtitle">
                Создайте аккаунт, чтобы находить интересные мероприятия и быть в курсе событий рядом с вами.
            </p>

            <div className="field">
                <label className="field__label" htmlFor="name">Ваше имя</label>
                <input className="field__control" id="name" type="text" placeholder="Например, Анна Иванова" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="email">Электронная почта</label>
                <input className="field__control" id="email" type="email" placeholder="example@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="password">Пароль</label>
                <input className="field__control" id="password" type="password" placeholder="Минимум 6 символов" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="confirmPassword">Подтвердите пароль</label>
                <input className="field__control" id="confirmPassword" type="password" placeholder="Введите пароль ещё раз" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {error && <p className="form-card__error">{error}</p>}

            <button className="btn btn--lg btn--block" onClick={handleSubmit}>Зарегистрироваться</button>

            <p className="form-card__footer">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    )
}

export default RegistrationPage;