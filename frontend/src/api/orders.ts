import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";


export const createOrder =async (data: Order) => {
    await authAxios.post('/orders/create/', data)
}