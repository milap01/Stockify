import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

function Navbar() {

   

    const handleLogout = () => {
        const encRefreshCookie = Cookies.get('refresh_token');

        if (encRefreshCookie) {
        document.cookie = "refresh_token=;expires = Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
        window.location.href = `http://localhost:5173/auth/login`;
        
    }
}



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent' enableColorOnDark  >
                <Toolbar variant="dense">
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                        <InsightsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    </Link>

                    <Typography variant="h6" color="inherit" component="div">

                        Stockify

                    </Typography>

                    <Link to='watch-list' style={{ textDecoration: 'none', color: 'black' }} >
                        <Typography variant="h6" color="inherit" component="div" sx={{ ml: 8 }}>

                            Watch List

                        </Typography>
                    </Link>

                    <Link to='create-watch-list' style={{ textDecoration: 'none', color: 'black' }} >
                        <Typography variant="h6" color="inherit" component="div" sx={{ ml: 8 }}>

                            Create Watch List

                        </Typography>
                    </Link>


                    <div onClick={handleLogout}>
                        <LogoutIcon sx={{ml:8}} / >
                    </div>



                </Toolbar>


            </AppBar>
        </Box>
    )
}

export default Navbar
