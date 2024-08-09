import { SafeAreaView, View, StatusBar, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState } from "react";
import axios from "../utils/axios";
import { login, getUser } from "../services/AuthService";

export default function LoginScreen(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function handleLogin(){
        setErrors({});
        try {
            const {data} = await axios.post("/login", {
                email: email,
                password: password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const {data:user} = getUser(data.token);
            console.log(user);
            console.log("res",data.token);
        } catch (error) {
            console.log(error.response.data)
            
            if(error.response){
                setErrors(error.response.data.errors);
            }
        }
    }

    return(
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField 
                    label="Email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)} 
                    keyboardType="email-address"
                    placeholder="Masukkan email anda"
                    errors={errors.email}
                />
                <FormTextField 
                    label="Password"
                    value={password} 
                    onChangeText={(text)=>setPassword(text)}
                    placeholder="Masukkan kata sandi anda"
                    secureTextEntry={true}
                    errors={errors.password}
                />
                <Button style={styles.button} title="Login" onPress={handleLogin}/>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1, 
        backgroundColor:"#fff"
    },
    container:{
        padding:10, 
        rowGap: 10
    },
    button:{
        borderRadius:4,
    },  
});