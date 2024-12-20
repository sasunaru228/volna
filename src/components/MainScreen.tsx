import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import NavBar from "./NavBar.tsx";
import {useStores} from "../stores/StoreContext.tsx";
import axios from "axios";

const MainScreen: React.FC = observer(() => {
    const {userStore} = useStores()
    const trackUri = 'spotify:track:3gVhsZtseYtY1fMuyYq06F?si=0a398c4ca34c4d39';
    const deviceId = userStore.device_id
    const token = userStore.user?.token
    useEffect(() => {
        console.log(userStore.user)
        console.log(deviceId, token)
    }, [deviceId])

    const playMusic = async () => {
        if (!deviceId || !token) {
            console.error("Device ID or Token is missing");
            return;
        }

        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                { uris: [trackUri] },
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
                <button onClick={playMusic} disabled={!deviceId || !token}>play true music</button>
            </div>
        </>
    );
});

export default MainScreen
