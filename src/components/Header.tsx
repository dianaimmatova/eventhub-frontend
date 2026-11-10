import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Header() {
    const auth = useContext(AuthContext)



    return (
        <header className="header">
            <div className="header__inner">
                <Link to="/" className="header__logo">Event<span>Hub</span></Link>

                {auth?.isLoggedIn ? (
                    <>
                        <nav className="header__nav">
                            <NavLink to="/events/new" className="header__link">Создание мероприятия</NavLink>
                            <NavLink to="/my-events" className="header__link">Мои мероприятия</NavLink>
                        </nav>
                        <div className="header__actions">
                            <button className="btn btn--outline" onClick={() => auth?.logout()}>Выйти</button>
                        </div>
                    </>
                ) : (
                    <div className="header__actions">
                        <Link to="/login" className="btn btn--outline">Войти</Link>
                        <Link to="/register" className="btn">Зарегистрироваться</Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;