import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { axiosApi } from '../api/axios';
import Cookies from 'js-cookie';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateWatchList() {

    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [stocks, setStocks] = useState([])
    const [selectedStocts,setSelectedStocks] = useState([])

    useEffect(() => {

        const accessToken = Cookies.get('access_token')

        async function userStocks() {
            const response = await axiosApi.get(`all-stocks/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            console.log(response.data);


            setStocks(response.data)

        }

        userStocks()

    }, [])


    const handleChange = (event: any) => {
        const {
          target: { value },
        } = event;
        setSelectedStocks(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    async function handleSubmit(){

        console.log(selectedStocts)

        const accessToken = Cookies.get('access_token')
        try {

            const response = await axiosApi.post(`watch-list/`,{
                "stocks": selectedStocts,
                "type" : type,
                "description" : description
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
              });

              console.log(response.data);
              
            
        } catch (error) {
            
        }
        
    }

    return (
        <>

            <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
                Create Watch List
            </h1>

            <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px", flexDirection: "column", alignItems: 'center' }}>


                <TextField onChange={(e) => setType(e.target.value)} value={type} style={{ marginTop: '20px', width: "300px" }} label="Type" />

                <TextField onChange={(e) => setDescription(e.target.value)} value={description} style={{ marginTop: '20px', width: "300px" }} label="Description" />

                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedStocts}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{width: '300px',marginTop:'20px'}}
                >
                    {stocks.map((stock) => (
                        <MenuItem key={stock['symbol']} value={stock['id']}>
                            <Checkbox checked={selectedStocts.indexOf(stock['id']) > -1} />
                            <ListItemText primary={stock['symbol']} />
                        </MenuItem>
                    ))}
                </Select>

                <Button onClick={handleSubmit} variant='contained' color='success' style={{width:"300px", marginTop:"20px"}} > Create </Button>

            </div>


        </>
    )
}

export default CreateWatchList
