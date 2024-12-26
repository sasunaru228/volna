import { makeAutoObservable } from "mobx";
import userFetchedData from "../types/userFetchedData.ts";

interface User {
    id: string
    name: string
    photo: string
    admin: boolean
    token: string
    deviceId: string | null
}

class UserStore {
    user: User | null = null
    device_id: string | null  = null

    constructor() {
        makeAutoObservable(this)
    }

    setUser(userData: userFetchedData) {
        console.log(userData)
        if (userData.data.session && userData.data.session.provider_token) {
            this.user = {
                id: userData.data.session.user.id,
                name: userData.data.session.user.user_metadata.full_name,
                photo: userData.data.session.user.user_metadata.avatar_url,
                admin: true,
                token: userData.data.session.provider_token,
                deviceId: null
            }
        }
    }
    setDeviceId(device_id: string) {
        this.device_id = device_id
    }
    clearUser() {
        this.user = null
    }
}

export const userStore = new UserStore()