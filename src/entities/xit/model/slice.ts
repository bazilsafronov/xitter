// import type {Xit} from "./types";
// import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
//
// const initialState: Xit[] = [
//     { id: "1", text: "Первый хит 🎉", authorId: "user1", createdAt: new Date().toISOString() },]
//
// const xitsSlice = createSlice({
//     name: 'xits',
//     initialState: initialState,
//     reducers: {
//         addXit: {
//             reducer: (state, action: PayloadAction<Xit>) => {
//                 state.push(action.payload);
//             },
//             prepare: (text: string, authorId: string) => {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         text,
//                         authorId,
//                         createdAt: new Date().toISOString(),
//                     } as Xit,
//                 }
//             }
//         },
//         removeXit: (state, action: PayloadAction<string>) => {
//             return state.filter((xit) => xit.id !== action.payload)
//         }
//     }
//
// })
//
// export const { addXit } = xitsSlice.actions;
// export default xitsSlice.reducer;



import type {Xit} from "./types";
import {createXitInFirestore, loadXitsFromFirestore} from "../../../shared/api/xits/firestoreXitsApi";
import {createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export const loadXits = createAsyncThunk<Xit[], void, { rejectValue: string }>(
    'xits/loadXits',
    async (_, { rejectWithValue }) => {
        try {
            return loadXitsFromFirestore();
        }  catch (error: any) {
            console.error('Подробная ошибка Firestore:', error);
            const message = error.message || 'Неизвестная ошибка при загрузке хитов';
            return rejectWithValue(message);
        }
    }
);

export const createXit = createAsyncThunk<Xit, { text, authorId }, { rejectValue: string }>(
    'xits/createXit',
    async ({ text, authorId }, { rejectWithValue }) => {
        try {
            const id = await createXitInFirestore(text, authorId);
            return {
                id,
                text,
                authorId,
                createdAt: new Date().toISOString(),
            }
        } catch (error){
            return rejectWithValue('Не удалось создать хит')
        }
    }
)
const initialState: Xit[] = [];

const xitsSlice = createSlice({
    name: 'xits',
    initialState,
    reducers: {
        // Оставим removeXit как локальный (или тоже сделаем async)
        removeXit: (state, action: PayloadAction<string>) => {
            return state.filter(xit => xit.id !== action.payload);
        },
    },
    extraReducers: (builder) => {

        builder.addCase(loadXits.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(loadXits.rejected, (_, action) => {
            console.error('Ошибка загрузки хита:', action.payload);
            return []; // или оставить старое состояние
        });


        builder.addCase(createXit.fulfilled, (state, action) => {
            state.unshift(action.payload); // добавляем в начало (как в Twitter)
        });
        builder.addCase(createXit.rejected, (_, action) => {
            console.error('Ошибка создания хита:', action.payload);
            // Можно показать уведомление
        });
    },
});

export const { removeXit } = xitsSlice.actions;
export default xitsSlice.reducer;