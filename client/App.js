import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/Home";
import CartScreen from "./src/screens/Cart";
import DetailScreen from "./src/screens/Detail";
import { SafeAreaView } from "react-native";
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
LogBox.ignoreAllLogs()