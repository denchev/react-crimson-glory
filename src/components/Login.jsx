import { useState } from "react";
import { auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (e) {
            console.error(e.message);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (e) {
            console.error(e.emessage);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e.message);
        }
    }
    return (
        <>
            <div>Вход</div>
            <form>
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}} />
                <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} />
                <button type="button" onClick={signIn}>Вход</button>
                <button type="button" onClick={signInWithGoogle}>Вход с Google</button>
                <button type="button" onClick={logout}>Изход</button>
            </form>
        </>
    );
}