import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <>
            <h1>Регистрация</h1>
            <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <button onClick={handleSubmit}>Зарегистрироваться</button>
            {error && <p>{error}</p>}
        </>
    )
}

export default RegistrationPage;