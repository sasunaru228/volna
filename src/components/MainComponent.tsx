import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import MainScreen from "./MainScreen.tsx";
import LogInPage from "./LogInPage.tsx";
import {useStores} from "../stores/StoreContext.tsx";
import userFetchedData from "../types/userFetchedData.ts";
import supabase from "../utils/supabase.ts";


const MainComponent: React.FC = observer(() => {
    const { userStore } = useStores()

    const fetchUser = async () => {
        const data: userFetchedData = await supabase.auth.getSession()
        if (data) {
            userStore.setUser(data)
        }
    }

    useEffect(() => {

        window.onSpotifyWebPlaybackSDKReady = async () => {
            await fetchUser()

            if (!userStore.user?.token) {
                console.error("Token is missing. Aborting player initialization.")
                return
            }

            const token = userStore.user.token

            const player = new Spotify.Player({
                name: "Volna",
                getOAuthToken: (cb) => cb(token),
                volume: 0.5,
            });

            player.addListener("ready", ({ device_id }) => {
                userStore.setDeviceId(device_id)
                console.log("Ready with Device ID", device_id)
            })

            player.connect().then((connected) => {
                console.log("Player connected:", connected)
            })
        }

        const loadSpotifySDK = () => {
            const script = document.createElement("script")
            script.src = "https://sdk.scdn.co/spotify-player.js"
            script.async = true
            document.body.appendChild(script)
        }

        loadSpotifySDK()
    }, [])

    return (
        <>
            {userStore.user ? <MainScreen/> : <LogInPage/>}
        </>

    )
})

export default MainComponent