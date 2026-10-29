import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Header() {
    const auth = useContext(AuthContext)



    return (
        <header>
            <Link to='/'>Афиша</Link>
            {auth?.isLoggedIn ? (
                <>
                    <Link to='/events/new'>Создание мероприятия</Link>
                    <Link to='/my-events'>Мои мероприятия</Link>
                    <button onClick={() => auth?.logout()}>Выйти</button>
                </>
            ) : (
                <>
                    <Link to='/login'>Войти</Link>
                    <Link to='/register'>Зарегистрироваться</Link>
                </>
            )}
        </header>
    )
}

export default Header;