import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import MainScreen from "./MainScreen.tsx";
import LogInPage from "./LogInPage.tsx";
import {useStores} from "../stores/StoreContext.tsx";
import userFetchedData from "../types/userFetchedData.ts";
import supabase from "../utils/supabase.ts";
import {loadSpotifySDK} from "../utils/loadSpotifySDK.ts";


const MainComponent: React.FC = observer(() => {
    const { userStore } = useStores()
    const [sdkIsReady, setSdkIsReady] = useState<boolean>(false)
    const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null)

    const fetchUser = async () => {
        const data: userFetchedData = await supabase.auth.getSession()
        if (data) {
            userStore.setUser(data)
        }
    }

    const initializeSpotifyPlayer = async () => {

        await fetchUser()

        if (!userStore.user?.token) {
            console.error("Token is missing. Aborting player initialization.")
            return
        }

        const token = userStore.user.token

        const player = new window.Spotify.Player({
            name: "Volna",
            getOAuthToken: (cb) => cb(token),
            volume: 0.5,
        })


        player.addListener('not_ready', () => {
            console.log('player is not ready')
        })
        player.addListener("ready", ({ device_id }) => {
            userStore.setDeviceId(device_id)
            console.log("Ready with Device ID", device_id)
        })
        console.log('BEFORE CONNECTED')
        await player.connect()
        console.log('CONNECTED')
        setSpotifyPlayer(player)
        // Активируем элемент (если требуется)
        // try {
        //     const activateResult = await player.activateElement();
        //     console.log("Player activated:", activateResult);
        // } catch (error) {
        //     console.error("Error activating player element:", error);
        // }
    }
    window.addEventListener('beforeunload', () => {
        if (spotifyPlayer) {
            spotifyPlayer.disconnect()
        }
    })
    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('onSpotifyWebPlaybackSDKReady', window.Spotify)
            setSdkIsReady(true)
        }
        loadSpotifySDK()
    }, [])
    useEffect(() => {
        if (sdkIsReady) {
            initializeSpotifyPlayer()
        }
    }, [sdkIsReady])

    return (
        <>
            {userStore.user && spotifyPlayer ? <MainScreen player={spotifyPlayer}/> : <LogInPage/>}
        </>

    )
})

export default MainComponent