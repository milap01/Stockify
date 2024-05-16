import {useState} from 'react'
import TextField from '@mui/material/TextField';
import { useRecoilValue } from 'recoil'; 
import {loginAtom} from '../store/atoms/auth'
import { axiosApi } from '../api/axios';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom'

function Regsiter() {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const isLoggedIn = useRecoilValue(loginAtom)

const handleSubmit = async () => {

    try {

        const response = await axiosApi.post('register/',{
            "username" : username,
            "password" : password
        })


        console.log(response.data)

        window.location.href = 'http://localhost:5173/auth/login'
        
    } catch (error) {
        
    }


}

if (isLoggedIn){
    window.location.href = 'http://localhost:5173/'
}

  return (
    <>

    <h1 style={{textAlign:'center',marginTop:'100px'}}>
        Register Form
    </h1>

    <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px", flexDirection:"column", alignItems:'center'}}>


        <TextField onChange={(e) => setUsername(e.target.value)} value={username} style={{marginTop:'20px', width: "300px"}}  label="Username" />

        <TextField onChange={(e) => setPassword(e.target.value)} value={password} style={{marginTop:'20px',  width: "300px"}} label="Password" type='password' />

        <Button onClick={handleSubmit} variant='contained' color='success' style={{width:"300px", marginTop:"20px"}} > Regsiter </Button>

        <Link to='/auth/login' style={{textDecoration:'none', marginTop: '20px', color:'black'}}>
            Already have an account? LogIn here
        </Link>

    </div>


</>
  )
}

export default Regsiter
