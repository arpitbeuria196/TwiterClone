import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({

    name: 'user',
    initialState:null,

    reducers:{
        LoginUser :(state,action)=>
        {
            return action.payload;
        },
        SignUpUser : (state,action)=>
        {
            return action.payload;
        },
        LogOutUser : ()=>
        {
            return null;
        },
    }
})

export const {LogOutUser,LoginUser,SignUpUser} = userSlice.actions;
export default userSlice.reducer