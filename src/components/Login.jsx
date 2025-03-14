import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    return (
        <>
            <div>Вход</div>
            <form>
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}} />
                <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} />
                <button type="button" onClick={signIn}>Вход</button>
            </form>
        </>
    );
}