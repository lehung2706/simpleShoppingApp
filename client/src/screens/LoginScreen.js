import React, {useState} from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {

  const [data, setData] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async () => {
    try {
    await AsyncStorage.setItem('@username', username)
    } catch (e) {
        
    }

}

  const login = () => {
    axios.post('http://10.0.2.2:5000/user/login', {
            username: username,
            password: password,
        })
          .then((res) => {
              if(res.data.exists == true) {   
                  setData(res.data.data)
                  navigation.navigate("HomeScreen",{username:username});
              }
              else {
                  alert("Tài khoản hoặc mật khẩu sai")
              }
          })
    storeData()
  }

  return (
    <Background>
        <Logo />
        <Header>Đăng nhập</Header>
        <TextInput 
          placeholder="Tài khoản" 
          value={username}
          onChangeText={(text)=> setUsername(text)} />
        <TextInput 
           placeholder="Mật khẩu" 
           secureTextEntry
           value={password}
           onChangeText={(text)=> setPassword(text)}
           onSubmitEditing={login}
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={login}
        >
          Đăng nhập
        </Button>
        <View style={styles.row}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("RegisterScreen")}
          >
            <Text style={styles.link}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
