import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

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
                    <Button variant={"outlined"} onClick={() => {
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }}>{theme === 'light' ? 'dark' : 'light'}</Button>
                </li>
                {user && <li><Button variant={'outlined'} type="button" onClick={() => logout()}><LogoutIcon /> Изход {user.email}</Button></li>}
            </ul>
        </>
    )
}
