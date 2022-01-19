import React, { useLayoutEffect,useState} from "react";
import { SafeAreaView,Alert,View,TouchableOpacity,Text,StyleSheet } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import { ProductsList } from "./ProductsList";
import { AntDesign,FontAwesome } from "@expo/vector-icons"
import axios from 'axios'

export default function Home({ navigation, route}) {

  const username = route.params.username

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Danh sách sản phẩm",
        headerShown: true,
        headerStyle: {backgroundColor:"#66c5ed"},
        headerTitleStyle:{color:"black"},
        headerTintColor:"black",
        headerLeft: () => (
          <View >
              
          </View>
        ),
        headerRight:() => (
              <View style={{
                  flexDirection:"row",
                  justifyContent:"space-between",
                  width:80,
                  marginRight:20,
              }}>
                  <TouchableOpacity onPress={() => navigation.navigate("CartScreen",{username:username})} activeOpacity={0.5}>
                      <AntDesign name="shoppingcart" size = {30} color="black" >
                        {/* <Text style = {styles.cartQuantity}>1</Text> */}
                      </AntDesign>
                  </TouchableOpacity>
              </View>
        )
    })
  }, [navigation])

  return (
    <Background>
        <ProductsList />
        <Button
          mode="outlined"
          onPress={() =>
            Alert.alert("Bạn có muốn đăng xuất?", "", [
              { text: "OK", onPress: () => navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              }) },
              { text: "Cancel"}
            ])
            
          }
        >
          Đăng xuất
        </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  cartQuantity:{
    color:'red',
    fontSize: 20,
  }
})
