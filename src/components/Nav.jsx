import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Nav() {
    const {user} = useAuth();

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
                {user && <li><button type="button" onClick={() => logout()}>Изход {user.email}</button></li>}
            </ul>
        </>
    )
}
