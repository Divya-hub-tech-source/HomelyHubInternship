import {propertyAction} from "./property-slice";
import {axiosInstance} from "../../utils/axios";
//get all properties
//start api req
//tell redux loading started
//get searcg parameters
//wait for response
//get property data
//Send dat to  redux store
//if error=> send error to redux
//dispatch:send to redux
//getState:get from redux

export const getAllProperties =( )=>async(dispatch,getState)=>{
    try{
        console.log("api call started");
         dispatch(propertyAction.getRequeset())
         const {searchParams} = getState().properties
         console.log(searchParams)
         const response = await axiosInstance.get(`/v1/rent/listing`,{
          params:{...searchParams} 
         })

         if(!response){
            throw new Error("Could not fetch any properties")
         }

         const {data} = response;
         console.log(data);
         dispatch(propertyAction.getProperties(data))

    
    }catch(error){
        dispatch(propertyAction.getErrors(error.message))

    }
}