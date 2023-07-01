import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addNote(state,action){
            state.push(action.payload)
        },
        deleteNote(state,action){
           return state.filter((user,index)=>index !== action.payload)
        }
    }
});

export default userSlice.reducer;
export const {addNote,deleteNote} = userSlice.actions;