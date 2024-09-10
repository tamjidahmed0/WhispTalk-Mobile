import { createSlice } from "@reduxjs/toolkit"

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {auth:null, obj:{}},
    reducers:{
        setAuth:(state, action) =>{
            state.auth = action.payload;
        },
        setObj:(state, action) =>{
            state.obj = action.payload;
        },
          
    }
})

export const {setAuth, setObj} = AuthSlice.actions
export default AuthSlice.reducer