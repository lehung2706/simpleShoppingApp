import React, { useLayoutEffect, useEffect,useState } from 'react'
import {Text, Image, View, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import Background from "../components/Background"
import Button from "../components/Button"
import Paragraph from "../components/Paragraph"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({navigation,route}) {
    const [username,setUsername] = useState("")
    const [data,setData] = useState([])
    const [quantity,setQuantity] = useState('')
    const [total,setTotal] = useState('')

    const {id,name,price,description,image} = route.params

    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@username')
        if(value !== null) {
            setUsername(value)
        }
        } catch(e) {
        alert('Failed to fetch the data from storage')
        }
    }

    useEffect(()=>{
        getData()
       
    },[])

    useEffect(()=>{
        axios.post('http://10.0.2.2:5000/cart/find/',{
            username:username,
            id:id,
        })
            .then(res =>{
                if(res.data.exists === false){
                    
                }
                else{
                    setQuantity(res.data.data.quantity)
                    setTotal(res.data.data.total)
                }
            })
    },[data])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chi tiết sản phẩm",
            headerShown: true,
            headerStyle: {backgroundColor:"#66c5ed"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })
      }, [navigation])

    const addToCart = () => {
        axios.post('http://10.0.2.2:5000/cart/find/',{
            username:username,
            id:id,
        })
            .then(res=> {
                setData(res.data)
                if(res.data.exists === false){
                    axios.post('http://10.0.2.2:5000/cart/create',
                    {
                        id:id,
                        name:name,
                        price:price,
                        image:image,
                        username:username,
                        total : price
                    })
                    .then(()=> Alert.alert("Đã thêm"))
                }
                else {

                    axios.post('http://10.0.2.2:5000/cart/update',{
                        username:username,
                        id:id,
                        quantity: quantity + 1,
                        total: total + price
                    })
                    .then(()=> Alert.alert("Đã thêm"))
                }

            })
    }
    return (
        <Background>
            <Image
                style={styles.thumb}
                source={{ uri : image }}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>$ {price}</Text>
                <Paragraph>{description}</Paragraph>
            </View>

            <Button mode="contained" onPress={addToCart}>Thêm vào giỏ hàng</Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    button:{
        width: '100%',
        backgroundColor:'#a5f0e8',
        alignItems: 'center',
        height:50,
        
    }
})
