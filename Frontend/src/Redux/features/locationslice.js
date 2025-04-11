import {createSlice} from '@reduxjs/toolkit'

export const locationSlice=createSlice({
    name:'location',
    initialState:{
        location:
        {
            ltd:0,
            lng:0,}
    },
    reducers:{
        setLocation:(state,action)=>{
            state.location=action.payload;
        }
    }
})

export const {setLocation}=locationSlice.actions