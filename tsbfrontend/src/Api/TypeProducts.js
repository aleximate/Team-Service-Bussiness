import axios from "axios"

export const getAllTypes=()=>{
    return axios.get('http://localhost:8080/type')
}

export const getTypeById = (id) => {
    return axios.get('http://localhost:8080/type/'+id);
  };

export const createTypes=(type)=>{
    return axios.post('http://localhost:8080/type',type)
}

export const updateType=(id)=>{
    return axios.put('http://localhost:8080/type/'+id)
}
export const deleteType=(id)=>{
    return axios.delete('http://localhost:8080/type/'+id)
}