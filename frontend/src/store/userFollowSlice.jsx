import { createSlice } from "@reduxjs/toolkit";

const userFollowSlice = createSlice({
    name:"userFollow",
    initialState: [],

    reducers : 
    {
            getAllUser : (state,action)=>
            {
                return action.payload;
            }
    }
})

export const {getAllUser} = userFollowSlice.actions;

export default userFollowSlice.reducer;