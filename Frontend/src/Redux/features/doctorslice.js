import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    doctor: {},
  };
  
export const doctorSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        setdoctor:(state,action)=>{
            state.doctor=action.payload;
        }
    }
})

export const {setdoctor}=doctorSlice.actions