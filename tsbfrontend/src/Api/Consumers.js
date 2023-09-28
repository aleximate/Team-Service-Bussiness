import axios from "axios"

export const getAllConsumers=()=>{
    return axios.get('http://localhost:8080/consumer')
}

export const createConsumers=(consumer)=>{
    return axios.post('http://localhost:8080/consumer',consumer)
}