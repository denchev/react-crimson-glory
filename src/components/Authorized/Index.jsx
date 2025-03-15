import { useState, useEffect } from 'react';

import { Button } from '@mui/material';

import { db } from '../../config/firebase';

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import { useAuth } from '../../context/AuthContext';

export default function AuthorizedIndex() {
    const {user} = useAuth();
    const [userMetalBands, setUserMetalBands] = useState([]);

    const metalBandsCollectionRef = collection(db, "metalbands");

    const addMetalBand = async () => {
        try {
            const docRef = await addDoc(metalBandsCollectionRef, {
                uid: user.uid,
                band_name: "Crimson Glory",
                created_at: new Date()
            });
            getUserMetalBandsFromDb()
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
                bands.push(doc.data());
            });
            setUserMetalBands(bands);
        } catch (e) {
            console.log(e);
        }
    }

    getUserMetalBandsFromDb();

    return <>
        <p>Добре дошли в енкциклопедия Металиум. Кои са вашите любими метъл групи?</p>
        {userMetalBands.map((band) => {
            return band.band_name
        })}
        <Button variant='contained' onClick={() => addMetalBand()}>Добави група</Button>
    </>
}