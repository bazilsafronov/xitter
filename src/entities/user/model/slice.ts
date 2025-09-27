import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
};

interface UserState {
    currentUser: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: UserState = {
    currentUser: null,
    status: "idle",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;