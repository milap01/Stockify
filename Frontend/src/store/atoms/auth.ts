import {atom} from 'recoil';
import Cookies from 'js-cookie'
import { axiosApi } from '../../api/axios';


export const loginAtom = atom({
    key : "loginAtom",
    default : Cookies.get('refresh_token') ? true:false,
})

export const accessToken = atom({
    key : "accessToken",
    default : Cookies.get('access_token')?true:false,
})

export const authLogin = async (username : string,password : string) => {
    
    try {
        const response = await axiosApi.post('api/token/',{
            "username":username,
            "password":password
        });
        const data = response.data;
        console.log(data);
        
        Cookies.set('access_token',data.access,{expires: 1});
        Cookies.set('refresh_token',data.refresh,{expires: 15});
        
        return false

    } catch (error) {
       return true
    }

}