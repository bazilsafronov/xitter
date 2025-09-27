import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../store";

type LikeStatus = {
    [xitId: string]: number;
}

const initialState: LikeStatus = {};

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state[id] = (state[id] ?? 0) + 1;
        }
    }
})


export const {toggleLike} = likesSlice.actions;
export default likesSlice.reducer;

export const selectLikesByXitId = (id: string) => (state: RootState) => state.likes[id] ?? 0;