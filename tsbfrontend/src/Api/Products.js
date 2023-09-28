import axios from "axios"

export const getAllProducts=()=>{
    return axios.get('http://localhost:8080/product')
}

export const createProducts=(product)=>{
    return axios.post('http://localhost:8080/product',product)
}

export const deleteProduct=(id)=>{
    return axios.delete('http://localhost:8080/product/'+id)
}