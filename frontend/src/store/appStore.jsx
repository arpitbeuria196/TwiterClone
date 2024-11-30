import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import userFollowReducer from "./userFollowSlice"

const appStore = configureStore({

    reducer:{
        user: userReducer,
        userFollow: userFollowReducer,
    },
})

export default appStore;