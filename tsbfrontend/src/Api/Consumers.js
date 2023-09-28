import axios from "axios"

export const getAllConsumers=()=>{
    return axios.get('http://localhost:8080/consumer')
}

export const createConsumers=(consumer)=>{
    return axios.post('http://localhost:8080/consumer',consumer)
}

export const deleteConsumer=(id)=>{
    return axios.delete('http://localhost:8080/consumer/'+id)
}