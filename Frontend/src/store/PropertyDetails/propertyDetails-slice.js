//Properties

//create a slice name
//create a initial state
// requests starts
//property data received
//error occurs
//export actions
//export slice

import {createSlice} from "@reduxjs/toolkit";

const propertDetailsSlice = createSlice({
    name:"propertyDetails",
    initialState:{
        propertydetails:null,
        loading:false,
        error:null
    },
    reducers:{
        getListRequest(state){
            state.loading=true
        },
        getPropertyDetails(state,action){
            state.propertydetails= action.payload;
            state.loading=false
        },getErrors(state,action){
            state.error=action.payload;
            state.loading=false;
        }
    }

})
export const propertDetailsAction = propertDetailsSlice.actions;
export default propertDetailsSlice;
