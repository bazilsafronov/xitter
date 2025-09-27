import {configureStore} from "@reduxjs/toolkit";
import xitsReducer from "../entities/xit/model/slice";
import likesReducer from "../features/xit/like-hit/model/slice";
import followReducer from "../features/follow/user/model/slice";
import {userReducer} from "../entities/user"

const store = configureStore({
    reducer: {
        xits: xitsReducer,
        likes: likesReducer,
        follows: followReducer,
        user: userReducer,
    },

})


export type RootState = ReturnType<typeof store.getState>;

export default store;