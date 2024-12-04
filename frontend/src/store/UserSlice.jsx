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
        updatedUser: (state,action)=>
        {
            if(state)
            {
                return {...state,...action.payload}
            }
            return state;
        }
    }
})

export const {LogOutUser,LoginUser,SignUpUser,updatedUser} = userSlice.actions;
export default userSlice.reducer