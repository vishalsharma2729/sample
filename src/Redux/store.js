import { configureStore } from "@reduxjs/toolkit";
import billingreducer from "./reducer";

const store  = configureStore({
    reducer:billingreducer,
    middleware:()=>[],
    devTools:process.env.NODE_ENV==="development"?true:false
})

export default store;