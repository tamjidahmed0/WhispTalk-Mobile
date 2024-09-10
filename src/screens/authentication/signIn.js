import { View, Text, Image, StyleSheet, useWindowDimensions ,Pressable, KeyboardAvoidingView , TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView, Modal} from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/ic_launcher.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { setUserId, setName, setUserName, setProfile, setuserFullName} from '../../features/inboxSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';




import { setAuth, setObj } from '../../features/auth'

import { chat } from '../../chat';
// import { API_URL } from '@env';


const instance = axios.create({
    baseURL: 'http://192.168.0.118:1000'
  })


const SignIn = () => {
    const baseURL = instance.defaults.baseURL
    const navigation = useNavigation()
    // const route = useRouter()
    const {height} = useWindowDimensions()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [disableData, setdisableData] = useState({})

    const [formdata, setformdata] = useState({ 
        username: '',
        password: ''
    })

    const handleSubmit = (name, value) =>{
        setformdata({ ...formdata, [name]: value });
     
    }
console.log(formdata.password)







const onPress = ()=>{
    setIsLoading(true)
    const {username, password} = formdata

if(Object.keys(username && password).length === 0){
    setIsLoading(false)
    Toast.show({
        type: "error",
        text1: "all fields required!"
    })
}else{
   
    instance.post(`/api/login`, {
    username,
    password
}).then(async(res)=>{
    console.log(res.data, 'jjjj')
    Toast.show({
        type: "success",
        text1: `${res.data.name}`
    })
    setIsLoading(false);
    dispatch(setUserId(res.data.id))
    dispatch(setUserName(res.data.name))
    dispatch(setProfile(`${res.data.profile}`))
    dispatch(setuserFullName(res.data.name))
    // navigation.navigate('Chat')
    // route.push('../main')       


    try {
        await Keychain.setGenericPassword('myAppKey', JSON.stringify({
            userId: res.data.id,
            userName: res.data.username,
            profilepic: res.data.profile,
            userFullName: res.data.name,
            userEmail: res.data.email

        }));
        console.log('Credentials saved successfully!');
      } catch (error) {
        console.log("Couldn't save credentials to keychain", error);
      }





   





}).catch((err)=>{
    // if(!err.response){

    //     Toast.show({
    //     type: "error",
    //     text1: 'something went wrong!',
    //     text2:'Please check your internet connection!'
    // })

    //     setIsLoading(false);
        
    // }else{
    //     Toast.show({
    //         type: "error",
    //         text1: `${err.response.data.msg}`
    //     })
    //     setIsLoading(false);
    //     console.log(err)
    // }
    setIsLoading(false);
console.log(err.response.data)
if(err.response.status === 403){
    setModalVisible(true)
    setdisableData(err.response.data)
}else if(err.response.status === 401){

        Toast.show({
        type: "error",
        text1: `${err.response.data.msg}`,
       
    })
}
   
})


}

}

const handlePress = () =>{
   
    navigation.navigate('SignUp')
}



// useLayoutEffect(() => {
//     const checkToken = async () => {
//         const token = await Keychain.getGenericPassword()
//         const result = token.password
//         const data = JSON.parse(result)
//         if (result) {
//         //   setIsAuthenticated(true);
//         //   navigation.navigate('Chat')
      
//           console.log(data, 'come from signin.js')
      
//           dispatch(setUserId(result.id))
//           dispatch(setUserName(result.name))
//           dispatch(setProfile(result.profile))
//           dispatch(setuserFullName(result.name))
          
//         }else{
//         //   setIsAuthenticated(false)
//         }
//       };
    
//       checkToken()
// },[])





  return (
    
   
  
    <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor:'#FFF'}}>
       <Modal visible={modalVisible} animationType="fade" transparent={true}  backdropColor="black" backdropOpacity={0.2} style ={{backgroundColor:'#000'}} >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <View style={{ backgroundColor: '#F6F6F6', width: responsiveWidth(80) , borderRadius:10}}>
            <View style ={{borderBottomWidth:1 ,  padding:20, borderBottomColor:'gray'}}>
            <Text style ={{textAlign:'center', fontWeight:'bold',fontSize:16, marginVertical:3}}>{disableData.title}</Text>
            <Text style ={{textAlign:'center'}}>{disableData.text}</Text>
            </View>
            
            <TouchableOpacity  style ={{padding:10}} onPress={() => setModalVisible(false)}>
                <Text style ={{textAlign: 'center', fontSize:15}}>Ok</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>

<KeyboardAvoidingView behavior='position'  keyboardVerticalOffset={-200}> 

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       
     <View style={styles.root} >
        
        <Toast />
     {isLoading && <View style={styles.loading}>
        <ActivityIndicator size={50} style={{top:'40%'}} />
      </View>}
      

      
      <Image source={Logo} resizeMode= 'contain' style ={[styles.logo, {height:height * 0.3}]} />
        <View style = {styles.container}>


      {/* username input */}
      <View style={styles.iconInput}>
      <Icon name="user" size={28} color="gray" style= {styles.icon} />
      
      <Input placeholder='username' name= 'username' onChangeText={(value) => handleSubmit('username', value)} />
      </View>
      {/* password input */}
      <View style={styles.iconInput}>
      <Icon name="lock" size={28} color="gray" style= {styles.icon} />
      <Input placeholder='password' name= 'password' onChangeText={(value) => handleSubmit('password', value)} secureTextEntry/>
      </View>
     
      <Button text='sign in' onPress={onPress} type ='PRIMARY'  />
      
      <Button text='Forgot password?'  type = 'TERTIARY' />

      <Pressable onPress={handlePress}>
      <Text style={styles.text}>Don't have an account?</Text>
      </Pressable>
      
      </View>
    
      </View>

      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
      </ScrollView>    
     
      
   

  )
}

const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        
        height:'100%',
        width:'100%'
    },
    container:{
        alignItems:'center',
        height:'100%',
        width:'100%',
        padding:20
    },
    logo:{
        width:'70%',
        maxWidth:300,
        maxHeight:200,
        height:100,
        zIndex:-1
    },
    iconInput:{
        position: 'relative',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
       
        backgroundColor:'#fff',
        borderColor: '#e8e8e8',
        borderWidth:1,
        borderRadius: 5,
        padding:10,
        left: -3
      
    },
    loading:{
       
      backgroundColor:'#fff',
       width: '100%',
       height: '100%',
       position:'absolute' ,
       bottom:0,
       zIndex:1,
       
    },
    text:{
        color:'gray',
        fontWeight: 'bold',  
    }
})

export default SignIn