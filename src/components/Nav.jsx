import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Nav() {
    const {user} = useAuth();
    const {theme, setTheme} = useTheme();

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <>
            <ul className="nav">
                <li><a href="/">Начало</a></li>
                <li><a href="/login">Вход</a></li>
                <li><a href="/register">Регистрация</a></li>
                <li>
                    <button type="button" onClick={() => {
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }}>{theme === 'light' ? 'dark' : 'light'}</button>
                </li>
                {user && <li><button type="button" onClick={() => logout()}>Изход {user.email}</button></li>}
            </ul>
        </>
    )
}
