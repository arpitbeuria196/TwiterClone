import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import userFollowReducer from "./userFollowSlice"
import postReducer  from "./postSlice"

const appStore = configureStore({

    reducer:{
        user: userReducer,
        userFollow: userFollowReducer,
        post: postReducer
    },
})

export default appStore;