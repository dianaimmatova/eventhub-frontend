import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    function handleSubmit() {}

    return (
        <>
        <h1>Вход</h1>
        <input type="email" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSubmit}>Войти</button>
        {error && <p>{error}</p>}
        </>
    )
}

export default LoginPage;