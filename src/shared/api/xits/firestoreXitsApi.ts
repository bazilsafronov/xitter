import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { Xit } from '../../../entities/xit/model/types';

const XITS_COLLECTION = 'xits';


export const createXitInFirestore = async (text: string, authorId: string): Promise<string> => {
    const docRef = await addDoc(collection(db, XITS_COLLECTION), {
        text,
        authorId,
        createdAt: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
};


export const loadXitsFromFirestore = async (): Promise<Xit[]> => {
    try {
        const q = query(collection(db, 'xits'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const xits = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Документ из Firestore:', { id: doc.id, data });

            return {
                id: doc.id,
                text: data.text,
                authorId: data.authorId,
                createdAt: data.createdAt.toDate().toISOString(),
            } as Xit;
        });

        console.log('Загружено xitов:', xits);
        return xits;
    } catch (error) {
        console.error('Ошибка в loadXitsFromFirestore:', error);
        throw error;
    }
};