import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";


export const create_order =async (data: Order) => {
    await authAxios.post('/orders/create/', data)
}