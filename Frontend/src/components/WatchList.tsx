import { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { axiosApi } from '../api/axios';
import Cookies from 'js-cookie';



function WatchList() {


    const [watchList, setWatchList] = useState([])

    useEffect(() => {

        const accessToken = Cookies.get('access_token')

        async function userStocks() {
            const response = await axiosApi.get(`user-stocks/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            console.log(response.data);

            setWatchList(response.data)
        }

        userStocks()


    }, [])

    function handleWatchList(type: string) {

        window.location.href = `http://localhost:5173/watch-list/${type}`
    }

    return (
        <>

            <h1 style={{ textAlign: 'center' }}>
                Your Watch Lists
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {
                    watchList.map((ele) => (
                        <div key={ele['type']} onClick={() => handleWatchList(ele['type'])}   >

                            <List sx={{ width: '500px', maxWidth: 360, bgcolor: 'background.paper', mt: '20px' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={ele['type']} secondary={ele['description']} />
                                </ListItem>

                            </List>

                        </div>
                    ))
                }
            </div>



        </>
    )
}

export default WatchList
