import {createSlice} from '@reduxjs/toolkit'

export const moodslice=createSlice({
    name:'mood',
    initialState:{
        mood:null,
        
    },
    reducers:{
        setmood:(state,action)=>{
            state.mood=action.payload;
        }
    }
})

export const {setmood}=moodslice.actions