import React, {useState} from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import axios from "axios";

export default function RegisterScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const register=() => {
    const obj = {
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
    };

    axios.get('http://10.0.2.2:5000/user/findone/'+username,)
    .then((res) => {
      if(!res.data) {
            axios.post('http://10.0.2.2:5000/user/create', obj)
            .then((res) => {
                Alert.alert("Đăng kí thành công")
            })
            .catch((err) => {
                console.log(err)
                Alert.alert(err.message)
            });
        }
        else {
            alert("Tài khoản đã tồn tại")
        }
    })     
  }

  return (
    <Background>
      <Logo />
      <Header>Tạo tài khoản</Header>
      <TextInput 
        placeholder="Họ và tên"
        value={fullname}
        onChangeText={(text)=> setFullname(text)}   />
      <TextInput 
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={(text)=> setPhone(text)}   />  
      <TextInput 
        placeholder="Tài khoản" 
        value={username}
        onChangeText={(text)=> setUsername(text)} />
      <TextInput 
        placeholder="Mật khẩu" 
        secureTextEntry
        value={password}
        onChangeText={(text)=> setPassword(text)}
        onSubmitEditing={register} />
      <Button
        mode="contained"
        onPress={register}
        style={{ marginTop: 24 }}
      >
        Đăng kí
      </Button>
      <View style={styles.row}>
        <Text>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
