import CircularProgress from '@mui/material/CircularProgress'
import classes from './Loading.module.css'

const Loading = () => {
    return (
        <div className={classes.loadingScreen}>
            <CircularProgress/>
        </div>
    )
}

export default Loading