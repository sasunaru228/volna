export const loadSpotifySDK = () => {
    return new Promise<void>((resolve, reject) => {

        if (document.getElementById('spotifySDK')) {
            resolve() // SDK уже загружен
            return
        }

        const script = document.createElement("script")
        script.id = 'spotifySDK'
        script.src = "/spotify-player.js"
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Failed to load Spotify SDK"))
        document.body.appendChild(script)
    })
}

