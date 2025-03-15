import { useState, useEffect, Fragment } from 'react';

import { Button, Grid2 as Grid, Modal, Paper, Stack, TextField } from '@mui/material';

import { db } from '../../config/firebase';

import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc} from 'firebase/firestore';

import { useAuth } from '../../context/AuthContext';

export default function AuthorizedIndex() {
    const {user} = useAuth();
    const [userMetalBands, setUserMetalBands] = useState([]);
    const [favoriteBand, setFavoriteBand] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [updateBandId, setUpdateBandId] = useState(null);
    const [updateBandName, setUpdateBandName] = useState(null);
    const [updateBandNameNew, setUpdateBandNameNew] = useState(null);

    const metalBandsCollectionRef = collection(db, "metalbands");

    const addMetalBand = async () => {
        try {
            if (favoriteBand.length > 3) {
                await addDoc(metalBandsCollectionRef, {
                    uid: user.uid,
                    band_name: favoriteBand,
                    created_at: new Date()
                });
                getUserMetalBandsFromDb();
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    const getUserMetalBandsFromDb = async () => {
        try {
            const q = query(metalBandsCollectionRef, where("uid", "==", user.uid));
            const bandsSnapshot = await getDocs(q);
            const bands = [];
            bandsSnapshot.forEach((doc) => {
                bands.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setUserMetalBands(bands);
        } catch (e) {
            console.log(e);
        }
    }

    const removeBand = async (docId) => {
        try {
            await deleteDoc(doc(db, "metalbands", docId));
            getUserMetalBandsFromDb();
        } catch (e) {
            console.log(e)
        }
    }
    
    const showChangeBandName = (docId, bandName) => {
        setUpdateBandName(bandName);
        setUpdateBandId(docId);
        setOpenModal(true);
    }

    const saveBandNameChanges = async () => {
        try {
            await updateDoc(doc(db, 'metalbands', updateBandId), {
                band_name: updateBandNameNew
            });
            getUserMetalBandsFromDb();
            setOpenModal(false);
        } catch (e) {

        }
    }

    useEffect(() => {
        getUserMetalBandsFromDb();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };  

    return <>
        <Modal
            open={openModal}
            onClose={() => {
                setOpenModal(false)
            }}
        >
            <Paper sx={style}>
                <Stack spacing={2}>
                    <TextField value={updateBandName} onChange={(event) => {
                        setUpdateBandNameNew(event.target.value);
                        setUpdateBandName(event.target.value);
                    }}></TextField>
                    <Button variant='contained' onClick={() => {
                        saveBandNameChanges();
                    }}>Запиши</Button>
                </Stack>
            </Paper>
        </Modal>
        <p>Добре дошли в енкциклопедия Металиум. Кои са вашите любими метъл групи?</p>
        <Grid container spacing={2}>
        {userMetalBands.map((band) => {
            return <Fragment key={band.id}>
                <Grid size={8}>{band.data.band_name}</Grid>
                <Grid size={2}>
                    <Button variant='contained' onClick={() => {
                        showChangeBandName(band.id, band.data.band_name);
                    }}>Промени</Button>
                </Grid>
                <Grid size={2}>
                    <Button variant='contained' onClick={() => {
                        removeBand(band.id);
                    }}>Изтрий</Button>
                </Grid>
            </Fragment>
        })}
        </Grid>
        <Grid container size={12}>
            <Grid>
                <TextField name="band_name" label="Вашата любима група" onChange={(event) => {
                    setFavoriteBand(event.target.value);
                }}></TextField>
            </Grid>
            <Grid>
                <Button variant='contained' onClick={() => addMetalBand()}>Добави група</Button>
            </Grid>
        </Grid>
    </>
}