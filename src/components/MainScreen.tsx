import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar.tsx";
import {useStores} from "../stores/StoreContext.tsx";
import axios from "axios";

interface MainScreenProps {
    player: Spotify.Player
}

const MainScreen: React.FC<MainScreenProps> = observer(({player}: MainScreenProps) => {
    const {userStore} = useStores()
    const trackUri = 'spotify:track:3gVhsZtseYtY1fMuyYq06F?si=0a398c4ca34c4d39';
    const [token, setToken] = useState<string | null>(null)
    const [deviceID, setDeviceID] = useState<string | null>(null)
    useEffect(() => {
        if (userStore.user) {
            setToken(userStore.user?.token)
        }
        setDeviceID(userStore.device_id)
    }, [userStore.user, userStore.device_id])

    const playMusic = async () => {
        player.disconnect()
        await player.connect()
        if (!deviceID || !token) {
            console.error("Device ID or Token is missing");
            return;
        }
        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
                {uris: [trackUri]},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Music is playing");
        } catch (error) {
            console.error("Error playing music:", error);
        }
    };
    return (
        <>
            <NavBar/>
            <div>
                <h2>Spotify Player</h2>
                <button onClick={playMusic} disabled={!deviceID || !token}>skiiis ?</button>
            </div>
        </>
    );
});

export default MainScreen
