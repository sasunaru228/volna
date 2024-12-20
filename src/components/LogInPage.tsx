import classes from './../styles/style.module.css'
import supabase from "../utils/supabase.ts"
import spotifyLogo from './../assets/svg/SpotifyLogo.svg'
import {scopes} from "../utils/spotify.ts";

const LogInPage = () => {

    const logIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'spotify',
            options: {
                scopes: scopes
            }
        })
    }

    return (
        <div className={classes.authScreen}>

            <div className={classes.logoBack}>
                <span className={classes.logo}>V</span>
                <span className={classes.logoThin}>Volna</span>
            </div>

            <span className={classes.authButton} onClick={logIn}>
                Log in
                <img src={spotifyLogo} alt="spotify logo"/>
            </span>

        </div>
    )
}

export default LogInPage