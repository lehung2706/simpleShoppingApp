import React, { useLayoutEffect,useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView,Image, TouchableOpacity,Alert } from 'react-native'
import {Card} from 'react-native-paper'
import axios from 'axios'
import Button from "../components/Button"

export default function Cart({navigation, route}) {

    const [data,setData] = useState([])
    const [total,setTotal] = useState()
    const username = route.params.username

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Giỏ hàng",
            headerShown: true,
            headerStyle: {backgroundColor:"#66c5ed"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })

    }, [navigation])

    useLayoutEffect(() => {
        axios.get('http://10.0.2.2:5000/cart/list/'+username)
            .then(res =>{
                setData(res.data)
                var sum = 0;
                for (var i=0; i < data.length; i++){
                    sum += data[i].total
                }
                setTotal(sum)
            })
    },[data])
    
    const deleteItem = (value) =>{
        Alert.alert("Bạn có muốn xoá sản phẩm này?", "", [
            { 
                text: "OK", onPress: () => {
                    axios.delete('http://10.0.2.2:5000/cart/delete/'+value)
                        .then(Alert.alert("Đã xóa"))
                } 
            },
            { text: "Cancel"}
        ])
    }
    const increase = (value1,value2,value3,value4) =>{
        axios.post('http://10.0.2.2:5000/cart/update',{
            id:value1,
            username:username,
            quantity: value2 + 1,
            total: value3 + value4
        })
    }

    const reduce = (value1,value2,value3,value4,value5) =>{
        if(value2 > 1){
            axios.post('http://10.0.2.2:5000/cart/update',{
                id:value1,
                username:username,
                quantity: value2 - 1,
                total: value3 - value4
            })
        }
        else {
            deleteItem(value5)
        }
    }

    const checkOut =() => {
        if(data.length == 0){}
        else{
            Alert.alert("Bạn có chắc chắn muốn thanh toán?", "", [
                { 
                    text: "OK", onPress: () => {
                        axios.delete('http://10.0.2.2:5000/cart/destroy/'+username)
                            .then(Alert.alert("Thanh toán thành công!!!"))
                        
                    } 
                },
                { text: "Cancel"}
            ])

        }
    }


    const listItems = data.map((item)=>{
        return(
            <Card style={styles.myCard} key={item._id}  >
                    <View style={styles.cardView} >
                        <View style={{flexDirection:"column", justifyContent:"space-around"}} >
                            <TouchableOpacity onPress={()=> deleteItem(item._id)}   style={styles.button}  activeOpacity={0.5} >
                                <View>
                                    <Text style={styles.text}>x</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                        <Image
                            style = {{width: 100, height:100, resizeMode:'contain'}}
                            source={{uri: item.image}}
                        />
                        <View style={{flexDirection:"column", justifyContent:"space-around",paddingLeft: 15}}>
                            <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                            <Text> $ {item.price}</Text>
                        </View>
                        <View style={{flexDirection:"column", justifyContent:"space-around",paddingLeft: 70}}>
                            <TouchableOpacity id="increase"  onPress={()=> increase(item.id,item.quantity,item.total,item.price)}  style={styles.button} activeOpacity={0.5} >
                                <Text style={styles.text}>+</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize:30}}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.button}   onPress={()=> reduce(item.id,item.quantity,item.total,item.price,item._id)} activeOpacity={0.5}>
                                <Text style={styles.text}>-</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </Card>
        )
    })



    return (
        <View style={{flex:1}}>
            <ScrollView>
                {listItems}
            </ScrollView>
            <View style={styles.checkOut}>
                    <TouchableOpacity onPress={()=> navigation.navigate("HomeScreen")}>
                        <Text style={styles.TouchableOpacity}>Tiếp tục mua sắm</Text>
                    </TouchableOpacity>
                    <Text style={styles.total}>Tổng: $ {total}</Text>
                    <Button mode="contained" onPress={checkOut}>Thanh toán</Button>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    myCard:{
        margin: 5,
        padding: 5,
        
    },
    cardView:{
        flexDirection:"row"
    },
    button:{
        borderWidth: 1,
        height:25,
        width:25,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color:'#b50909',
        fontSize:30
    },
    total:{
        fontSize:30,
        fontWeight:'bold'
    },
    checkOut:{
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        padding:15,
        flexDirection:"column"
    },
    TouchableOpacity:{
        fontSize:20,
        color:'red',
        textDecorationLine: 'underline'
    }
})
