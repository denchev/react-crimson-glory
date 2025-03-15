import { useState } from "react";
import { auth, googleProvider} from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Grid2 as Grid, Alert, Stack } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const {user} = useAuth();

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

    return (
        <Stack spacing={2}>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            <form>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField disabled={user} type="text" label="Email" onChange={(event) => {setEmail(event.target.value)}} fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <TextField disabled={user} type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} fullWidth/>
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={signIn} disabled={user}>Вход</Button>
                    </Grid>
                    <Grid size={12}>
                        <Button sx={{gap: 1}} variant="contained" onClick={signInWithGoogle} disabled={user}><GoogleIcon />   Вход с Google</Button>
                    </Grid>
                </Grid>
                
               
            </form>
        </Stack>
    );
}