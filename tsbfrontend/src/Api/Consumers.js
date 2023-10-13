import axios from "axios"

export const getAllConsumers=()=>{
    return axios.get('http://localhost:8080/consumer')
}

export const getConsumerById=(id)=>{
    return axios.get('http://localhost:8080/consumer/'+id)
}

export const createConsumers=(consumer)=>{
    return axios.post('http://localhost:8080/consumer',consumer)
}
export const updateConsumer=(id,data)=>{
    return axios.put('http://localhost:8080/consumer/'+id,data)
}
export const deleteConsumer=(id)=>{
    return axios.delete('http://localhost:8080/consumer/'+id)
}