import { View, Text, Image, StyleSheet, useWindowDimensions , ScrollView, KeyboardAvoidingView , TouchableWithoutFeedback, Keyboard, ActivityIndicator, Pressable} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
// import { API_URL } from '@env';



const API_URL = 'localhost:8000'



const SignUp = () => {
    const navigation = useNavigation()
    
    const {height} = useWindowDimensions()
    const [isLoading, setIsLoading] = useState(false)


    const [formdata, setformdata] = useState({
        name: '',
        username: '',
        email:'',
        password: ''
    })

    const handleSubmit = (name, value) =>{
        setformdata({ ...formdata, [name]: value });
     
    }
console.log(formdata)

const onPress = async()=>{
    setIsLoading(true)
    const {name, username, email, password} = formdata

if(Object.keys(username && password).length === 0){
    setIsLoading(false)
    Toast.show({
        type: "error",
        text1: "all fields required!"
    })
}else{
   
    axios.post(`${API_URL}/api/register`, {
    name,
    username,
    email,
    password
}).then(async(res)=>{
    Toast.show({
        type: "success",
        text1: `${res.data.msg}`
    })
    setIsLoading(false);
    AsyncStorage.setItem('token', res.data.token)
const cookie = await AsyncStorage.getItem('token')


    navigation.navigate('otp')
}).catch((err)=>{
    if(!err.response){

        Toast.show({
        type: "error",
        text1: 'something went wrong!',
        text2:'Please check your internet connection!'
    })

        setIsLoading(false);
        
    }else{
        Toast.show({
            type: "error",
            text1: `${err.response.data.msg}`
        })
        setIsLoading(false);
        console.log(err)
    }


   
})


}

}

const handlePress = () =>{
   navigation.navigate('SignIn')
}

  return (

<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
<KeyboardAvoidingView 
    behavior='position'
    keyboardVerticalOffset={-200}
    style={{}}
    >
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
      <Input placeholder='name' name= 'name' onChangeText={(value) => handleSubmit('name', value)} />
      </View>

      <View style={styles.iconInput}>
      <Icon name="user" size={28} color="gray" style= {styles.icon} />
      <Input placeholder='username' name= 'username' onChangeText={(value) => handleSubmit('username', value)} />
      </View>

      <View style={styles.iconInput}>
      <Icon name="envelope" size={20} color="gray" style= {styles.icon} />
      <Input placeholder='Email' name= 'email' onChangeText={(value) => handleSubmit('email', value)} />
      </View>

      {/* password input */}
      <View style={styles.iconInput}>
      <Icon name="lock" size={28} color="gray" style= {styles.icon} />
      <Input placeholder='password' name= 'password' onChangeText={(value) => handleSubmit('password', value)} secureTextEntry/>
      </View>
     
      <Button text='sign up' onPress={onPress} type ='PRIMARY'  />
      
      <Button text='Forgot password?'  type = 'TERTIARY' />
      {/* <Button text='Already have an account?'  type = 'TERTIARY' onPress={handlePress} /> */}
      <Pressable onPress={handlePress}>
      <Text style={styles.text}>Already have an account?</Text>
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

export default SignUp