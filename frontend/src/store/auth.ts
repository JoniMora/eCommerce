import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
    access: string;
    refresh: string;
    isAuth: boolean;
}

type Action = {
    setToken: (access: string, refresh: string) => void;
    logout: () => void;
};

export const useAuthStore = create(
    persist<State & Action>(
        (set) => ({
            access: '',
            refresh: '',
            isAuth: false,
            setToken: (access: string, refresh: string) => 
                set(() => ({
                    access,
                    refresh,
                    isAuth: !!access && !!refresh,
                })),
                logout: () => set(() => ({access: '', refresh: '', isAuth: false})),
        }),
        {
            name: "auth"
        }
    )
);