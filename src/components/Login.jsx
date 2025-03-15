import { useState, useEffect } from "react";
import { auth, googleProvider} from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Button, TextField, Grid2 as Grid, Alert, Stack } from '@mui/material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasSignedIn, setHasSignedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const signIn = async () => {
        setErrorMessage(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e.message);

            setErrorMessage('Неуспешен опит за вход.');
        }
    }

    const signInWithGoogle = async () => {
        setErrorMessage(null);
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

    useEffect(() => {
        setHasSignedIn(!!auth?.currentUser);
        onAuthStateChanged(auth, (user) => {
            setHasSignedIn(!!auth?.currentUser);
        })
    }, [auth.currentUser])

    return (
        <Stack spacing={2}>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            <form>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField disabled={hasSignedIn} type="text" label="Email" onChange={(event) => {setEmail(event.target.value)}} fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <TextField disabled={hasSignedIn} type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} fullWidth/>
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={signIn} disabled={hasSignedIn}>Вход</Button>
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={signInWithGoogle} disabled={hasSignedIn}>Вход с Google</Button>
                    </Grid>
                    <Grid size={12}>
                    {hasSignedIn && <Button variant="contained" onClick={logout}>Изход {auth.currentUser.email}</Button>}
                    </Grid>
                </Grid>
                
               
            </form>
        </Stack>
    );
}