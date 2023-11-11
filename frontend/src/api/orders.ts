import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";

export const solo_order = async () => {
    const response = await authAxios.get('/orders/solo/${id}')
    return response.data
}

export const my_orders = async () => {
    const response = await authAxios.get('orders/my/orders/')
    return response.data
}

export const create_order =async (data: Order) => {
    await authAxios.post('/orders/create/', data)
}