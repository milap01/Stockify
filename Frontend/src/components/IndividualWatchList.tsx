import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '../store/atoms/auth'
import { axiosApi } from '../api/axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type StockData = {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };

function IndividualWatchList() {
    const { type } = useParams();

    const [symbol, setSymbol] = useState('MSFT')
    const isLoggedIn = useRecoilValue(loginAtom)
    const [stockData, setStockData] = useState<StockData>({
        "1. open": '',
        "2. high": '',
        "3. low": '',
        "4. close": '',
        "5. volume": ''
      })
    const [watchList, setWatchList] = useState([])

    useEffect(() => {

        const accessToken = Cookies.get('access_token')

        async function userStocks() {
            const response = await axiosApi.get(`user-stocks-inside-particular-watch-list/${type}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setWatchList(response.data[0]['stocks'])
        }

        userStocks()


    }, [])

    useEffect(function () {

        const accessToken = Cookies.get('access_token')

        async function listStocks() {
            const response = await axiosApi.get(`list-stocks/${symbol}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            console.log(response.data);

            const key = Object.keys(response.data['Time Series (5min)'])[0]

            const value = response.data['Time Series (5min)'][key]

            setStockData(value)

        }

        try {
            listStocks();
        } catch (error) {

        }



    }, [symbol, stockData])

    if (!isLoggedIn) {
        window.location.href = "http://localhost:5173/auth/login"
    }

    function handleClick(symb: any) {
        console.log(symb)
        setSymbol(symb)
    }

    return (
        <>
            <h1 style={{textAlign:'center'}}>
                {type}
            </h1>

            <div>

                <div style={{ marginTop: "40px", display: 'flex', justifyContent: "center" }}>

                    {
                        watchList?.map((ele: any) => (
                            <Chip key={ele['symbol']} label={ele['symbol']} variant="outlined" onClick={() => handleClick(ele['symbol'])} color='primary' style={symbol == ele['symbol'] ? { backgroundColor: "lightgreen", margin: "4px" } : { margin: "4px" }} />
                        ))
                    }

                </div>

            </div>

            <div style={{ margin:'120px', marginTop: '20px', }}>


<TableContainer component={Paper}>
  <Table sx={{ minWidth: 1000 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Types</TableCell>
        <TableCell align="right">Values</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>

      <TableRow key={"Open"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
           Open
        </TableCell>

        <TableCell align="right">{stockData['1. open']}</TableCell>
      </TableRow>


      <TableRow key={"High"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
           High
        </TableCell>

        <TableCell align="right">{stockData['2. high']}</TableCell>
      </TableRow>

      <TableRow key={"Low"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
           Low
        </TableCell>

        <TableCell align="right">{stockData['3. low']}</TableCell>
      </TableRow>

      <TableRow key={"Close"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
           Close
        </TableCell>

        <TableCell align="right">{stockData['4. close']}</TableCell>
      </TableRow>

      <TableRow key={"Volume"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
           Volume
        </TableCell>

        <TableCell align="right">{stockData['5. volume']}</TableCell>
      </TableRow>

    </TableBody>
  </Table>
</TableContainer>

</div>

        </>
    )
}

export default IndividualWatchList
