import { makeAutoObservable } from 'mobx';

class PlayerStore {
    player: Spotify.Player | null = null;
    isPlaying = false;
    trackName = '';
    artistName = '';
    albumCover = '';

    constructor() {
        makeAutoObservable(this);
    }

    setPlayer(player: Spotify.Player) {
        this.player = player;
    }

    setTrackInfo(name: string, artist: string, cover: string) {
        this.trackName = name;
        this.artistName = artist;
        this.albumCover = cover;
    }

    setIsPlaying(isPlaying: boolean) {
        this.isPlaying = isPlaying;
    }
}
export const musicStore = new PlayerStore()