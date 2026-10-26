import { useState } from "react";

function RegistrationPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return ( 
    <>
    <h1>Регистрация</h1>
    <input type="text"  placeholder="Ваше имя"  value={name} onChange={(e) => setName(e.target.value)}/>
    <input type="email"  placeholder="Электронная почта"  value={email} onChange={(e) => setEmail(e.target.value)}/>
    <input type="password"  placeholder="Пароль"  value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="password"  placeholder="Подтвердите пароль"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
    <button>Зарегистрироваться</button>
    </>
    )
}

export default RegistrationPage;