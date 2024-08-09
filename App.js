import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContext from "./contexts/AuthContext";
import {getUser} from "./services/AuthService";
import {useState, useEffect} from "react";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App(){
  const [user, setUser] = useState();
  const [isLoadData, setIsLoadData] = useState(true);

  useEffect(()=>{
    async function runEffect(){
      try{
        const user = await getUser();

        setUser(user);
      }catch(e){
        console.log("Failed to load user", e);
      }

      setIsLoadData(false);
    }

    runEffect();
  },[]);

  if(isLoadData)
    return (<SplashScreen/>);

  return(
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown:false
          }}
        >
          {user?(
            <>
              <Stack.Screen name="Home" component={HomeScreen}/>
            </>
          ):(
            <>
              <Stack.Screen name="Login" component={LoginScreen}/>  
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}