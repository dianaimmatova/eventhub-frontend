import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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