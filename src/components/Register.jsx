import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Grid2 as Grid, Alert, Stack} from '@mui/material';
import { useState } from 'react';
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {user} = useAuth();

    const signUp = async () => {
        try {
            setIsPending(true);
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccessMessage('Вие се регистрирахте успешно');
            setErrorMessage(null);
            
        } catch (e) {
            console.error(e.message);

            if (e.message.indexOf('already-in-use') > 0) {
                setErrorMessage('Потребителя вече съществува');
                setSuccessMessage(null);
            }
        }

        setIsPending(false);
    }

    return (
        <>
        {user ? <div>Вие вече сте влязъл в приложението</div> : 
        <Stack spacing={2}>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField type="text" label="Email" onChange={(event) => {setEmail(event.target.value)}} fullWidth />
                    </Grid>
                    <Grid size={6}>
                        <TextField type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} fullWidth/>
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={signUp} disabled={isPending}>Регистрация</Button>
                    </Grid>
                </Grid>
            </form>
        </Stack>}
        </>
    );
}