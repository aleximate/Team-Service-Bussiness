import axios from "axios"

export const getAllProducts=()=>{
    return axios.get('http://localhost:8080/product')
}

export const getProductById = (id) => {
    return axios.get('http://localhost:8080/product/'+id);
  };

export const createProducts=(product)=>{
    return axios.post('http://localhost:8080/product',product)
}
export const updateProduct=(id)=>{
    return axios.put('http://localhost:8080/product/'+id)
}

export const deleteProduct=(id)=>{
    return axios.delete('http://localhost:8080/product/'+id)
}