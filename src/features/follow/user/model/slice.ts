import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../store";

type FollowState = {
    [userId: string]: boolean;
};

const initialState: FollowState = {};

const followSlice = createSlice({
    name: 'follows',
    initialState,
    reducers: {
        toggleFollow: (state, action:PayloadAction<string>) => {
            const userId = action.payload;
            state[userId] = !state[userId]
        }
    }
});

export const { toggleFollow } = followSlice.actions;
export default followSlice.reducer;

export const selectIsFollowing = (userId: string) => (state: RootState) =>
    !!state.follows[userId]
