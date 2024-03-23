
const init = {
    taxs:localStorage.getItem("taxs")?JSON.parse(localStorage.getItem("taxs")):[],
    customer:localStorage.getItem("customer")?JSON.parse(localStorage.getItem("customer")):[]
    }

const billingreducer = (state=init,action)=>{
switch (action.type) {
    case"addtaxes":
    let existingData = JSON.parse(localStorage.getItem("taxs")) || []; 
    let newData = [...existingData, ...action.payload]; 
    localStorage.setItem("taxs", JSON.stringify(newData));
    return {
        ...state,
        taxs: [...newData]
    };

    case"addcustomer":
        let existingdata = JSON.parse(localStorage.getItem("customer")) || []; 
        let newdata = [...existingdata, ...action.payload]; 
        localStorage.setItem("customer", JSON.stringify(newdata));
        return {
            ...state,
            customer: [...newdata]
        };


    default:
       return state;
}
}

export default billingreducer;