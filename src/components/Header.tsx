import { Link } from "react-router-dom";

function Header() {
    return (
    <header>
        <Link to='/'>Афиша</Link>
        <Link to='/login'>Вход</Link>
        <Link to='/register'>Регистрация</Link>
        <Link to='/events/new'>Создание мероприятия</Link>
    </header>
    )
}

export default Header;