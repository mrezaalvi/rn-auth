import { SafeAreaView, View, StatusBar, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import { useContext, useState } from "react";
import axios from "../utils/axios";
import { login, getUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function LoginScreen(){
    const {setUser} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function handleLogin(){
        setErrors({});
        try {
            await login({
                email: email,
                password: password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const user = await getUser();
            
            setUser(user);
        } catch (error) {
            console.log(error.response?.data);
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