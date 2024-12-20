import React from 'react'
import supabase from "../utils/supabase.ts";
import {useStores} from "../stores/StoreContext.tsx";
import classes from './../styles/style.module.css'
import exit from './../assets/svg/Exit.svg'


const NavBar: React.FC = () => {
    const { userStore } = useStores()

    const logOut = async () => {
        await supabase.auth.signOut()
        userStore.clearUser()
    }

    return (
        <>
            <div className={classes.navBar}>
                <span className={classes.navBar_exit} onClick={logOut}>
                    <img src={exit} alt="exit"/>
                </span>
                <span className={classes.navBar_profile}>
                    <img src={userStore.user?.photo} alt="your photo"/>
                </span>
            </div>
        </>
    )
}

export default NavBar