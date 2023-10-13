import axios from "axios"

export const getAllProducts=()=>{
    return axios.get('http://localhost:8080/product')
}

export const getProductById = (id) => {
    return axios.get('http://localhost:8080/product/'+id);
};
  
export const getProductByType = (id) => {
    return axios.get("http://localhost:8080/product/type/"+id);
}

export const getProductOnSale = () => {
    return axios.get('http://localhost:8080/product/onsale')
}
export const createProducts=(product)=>{
    return axios.post('http://localhost:8080/product',product)
}
export const updateProduct = (id, data) => {
  const formData = new FormData();

  // Agrega los campos de datos al FormData
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("image", data.image);
  formData.append("onSale", data.onSale);

  // Convierte typeProduct a un número antes de agregarlo
  const typeProductID = parseInt(data.typeProduct, 10);
  formData.append("typeProduct", typeProductID);

  return axios.put(`http://localhost:8080/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct=(id)=>{
    return axios.delete('http://localhost:8080/product/'+id)
}