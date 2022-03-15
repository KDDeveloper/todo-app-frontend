import { AppBar, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';


const Navbar = ()=>{
    return(
        <>
        <AppBar sx={{background:"yellow"}}>
            <Toolbar>
                <Typography sx={{color:"#151516"}} variant="h5">Todo note's</Typography>
                {/* <SwipeableDrawer>
                </SwipeableDrawer> */}
            </Toolbar>
        </AppBar>
        <Outlet/>
        </>
        
    )
}

export default Navbar