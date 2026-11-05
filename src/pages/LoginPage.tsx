import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')



    function handleSubmit() {
        setError('')

        fetch('http://localhost:3000/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        localStorage.setItem('accessToken', data.accessToken)
                        localStorage.setItem('refreshToken', data.refreshToken)
                        auth?.login()
                        navigate('/')
                    })
                    return
                }
                if (response.status === 401) {
                    setError('Неверная почта или пароль')
                    return
                }
                setError('Не удалось войти, попробуйте позже')
            })
            .catch(() => { setError('Нет связи с сервером') })

    }


    return (
        <div className="form-card form-card--center">
            <h1 className="form-card__title">Вход</h1>
            <p className="form-card__subtitle">
                Войдите в свой аккаунт, чтобы управлять мероприятиями и покупать билеты
            </p>

            <div className="field">
                <label className="field__label" htmlFor="email">Электронная почта</label>
                <input className="field__control" id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="password">Пароль</label>
                <input className="field__control" id="password" type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {error && <p className="form-card__error">{error}</p>}

            <button className="btn btn--lg btn--block" onClick={handleSubmit}>Войти</button>

            <p className="form-card__footer">
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </p>
        </div>
    )
}

export default LoginPage;