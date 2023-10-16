import { authAxios, axi } from "./useAxios";

export const searchUsers = async (query: string) => {
    const response = await authAxios.get(`/users/search/?query=${query}`)
    return response.data
}

export const deleteUser =async (id: number) => {
    await authAxios.delete(`/users/delete/${id}/`)
}

export const getUsers = async () => {
    const response = await authAxios.get("/users/get/")
    return response.data
}

export const registerRequest = async (email: string, name: string, last_name: string, password: string) => {
    await axi.post("/users/register/", {email, name, last_name, password})
};

export const loginRequest = async (email: string, password: string) => {
    const response = await axi.post("/users/login/", {email, password})
    return response;
};