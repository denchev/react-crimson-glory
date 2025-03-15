import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Nav() {
    const {user, loading} = useAuth();

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <>
            <ul>
                <li><a href="/">Начало</a></li>
                <li><a href="/login">Вход</a></li>
                <li><a href="/register">Регистрация</a></li>
                {user && <li><a href="#" onClick={() => logout()}>Изход {user.email}</a></li>}
            </ul>
        </>
    )
}
