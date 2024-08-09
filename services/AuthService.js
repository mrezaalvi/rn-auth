import axios from "../utils/axios";
import {getToken, setToken} from "./TokenService";

export async function login (credentials){
    const {data} = await axios.post("/login", credentials);
    console.log(data.token);
    await setToken(data.token);
}

export async function getUser(){
    // const token = await getToken();

    // const {data:user} =  await axios.get("/user",{
    //     headers:{
    //         Authorization: `Bearer ${token}`,
    //     } 
    // });
    
    const {data:user} =  await axios.get("/user");
    
    return user;
}

export async function logout(){
    const token = await getToken();

    await axios.post(
        "/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
    );
    
    return setToken(null);
}




