import axios from "axios"

export const getAllTypes=()=>{
    return axios.get('http://localhost:8080/type')
}

export const createTypes=(type)=>{
    return axios.post('http://localhost:8080/type',type)
}

export const deleteType=(id)=>{
    return axios.delete('http://localhost:8080/type/'+id)
}