import { authAxios, axi } from "./useAxios";

export const get_products =async ({pageParam = 1}) => {
    const response = await axi.get(`/products/?page=${pageParam}&page=9`)
    return response.data
}