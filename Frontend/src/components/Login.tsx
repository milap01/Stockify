import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button} from '@mui/material';
import { useRecoilValue } from 'recoil';
import {authLogin, loginAtom} from '../store/atoms/auth'
import { Link } from 'react-router-dom'

function Login() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const isLoggedIn = useRecoilValue(loginAtom)


    const handleSubmit = async () => {
        
        const isError: boolean = await authLogin(username,password);

        console.log(isError)

        if (isError){
            window.location.href = 'http://localhost:5173/auth/login'
        }else {
            window.location.href = 'http://localhost:5173/'
        }


    }

    if (isLoggedIn){
        window.location.href = 'http://localhost:5173/'
    }

    return (

        <>

            <h1 style={{textAlign:'center',marginTop:'100px'}}>
                Login Form
            </h1>

            <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px", flexDirection:"column", alignItems:'center'}}>


                <TextField onChange={(e) => setUsername(e.target.value)} value={username} style={{marginTop:'20px', width: "300px"}}  label="Username" />

                <TextField onChange={(e) => setPassword(e.target.value)} value={password} style={{marginTop:'20px',  width: "300px"}} label="Password" type='password' />

                <Button onClick={handleSubmit} variant='contained' color='success' style={{width:"300px", marginTop:"20px"}} > Login </Button>

                <Link to='/auth/register' style={{textDecoration:'none', marginTop: '20px', color:'black'}}>
                    Not Registered? Regsiter here
                </Link>

            </div>


        </>
    )
}

export default Login
