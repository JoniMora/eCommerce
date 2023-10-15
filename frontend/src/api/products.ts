import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const categoryAPI = async(category: string) =>{
    const response = await authAxios.get(`/products/category/${category}/`)
    return response.data
}

export const searchProduct =async (query:string) => {
    const response = await authAxios.get(`/products/search/?query=${query}`)
    return response.data
}

export const getSolo = async (name: string) => {
    const response = await authAxios.get(`/products/get/${name}/`)
    return response.data
}

export const getSoloProduct = async (id: number) => {
    const response = await authAxios.get(`/products/get/admin/${id}/`)
    return response.data
}

export const editProduct = async(data: Product) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("count_in_stock", data.count_in_stock.toString())
    formData.append("category", data.category)
    formData.append("price", data.price.toString())

    if(data.image){
        formData.append("image", data.image)
    }
    await authAxios.put(`/products/edit/${data.id}/`, formData)
}

export const deleteProduct =async (id: number) => {
    await authAxios.delete(`/products/delete/${id}/`)
}

export const postProduct = async(data: Product) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("count_in_stock", data.count_in_stock.toString())
    formData.append("category", data.category)
    formData.append("price", data.price.toString())

    if(data.image){
        formData.append("image", data.image)
    }
    await authAxios.post('/products/post/', formData)
}

export const getProducts = async ({pageParam = 1}) => {
    const response = await axi.get(`/products/?page=${pageParam}&pages=9`)
    return response.data
}