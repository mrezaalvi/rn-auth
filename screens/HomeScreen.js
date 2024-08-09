import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar } from "react-native";
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";

export default function HomeScreen(){
    const{user, setUser} = useContext(AuthContext);

    async function handleLogout(){
        await logout();
        setUser(null);
    }

    return(
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text>Selamat Datang, {user.name}</Text>
                <Button title="Logout" onPress={handleLogout}/>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10,
    },

    container:{
        rowGap:12,
    },

    welcome:{
        fontSize:16,
    },
    
    button:{
        backgroundColor:"white",
        borderColor:"#2563eb",
        borderWidth:1,
        color:"#2563eb",
    }
});