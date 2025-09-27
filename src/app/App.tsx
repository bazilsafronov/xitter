import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../entities/user';
import { subscribeToAuthChanges } from '../shared/api/firebase';
import {Outlet} from "react-router-dom";
import {loadXits} from "../entities/xit/model/slice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadXits());
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
            if (firebaseUser) {
                dispatch(setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                }));
            } else {
                dispatch(clearUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <Outlet />;
}

export default App;