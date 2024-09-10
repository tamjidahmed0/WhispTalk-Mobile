import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Profile, Chat, Audio, Video } from '.';


import { TouchableOpacity , Image, View} from "react-native";
// import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';

const ImgUri = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKHW8UvKihTaQXue3o0UKafle3fy9GpFk9c2BLUo5BhPalnnkSqa8roRwaFX-hM4msy8oY18X7sctyLPoTpanrfx4YX7GgV7luQF_TnHTPCtp0bcKoaFJa8GxiG1zj_YqnkGcKVO83gUcQBFZB0sGbkAARUrO3zlCbdFpLG9NvrumQhSkyadb_JXvstg/s4032/IMG_20220712_152510.jpg'

const Tab = createBottomTabNavigator();


const baseURL = 'http://192.168.0.118:1000'


export default function Layout (){

  const navigation = useNavigation()
  const profilepic = useSelector((state) => state.inbox.profilepic) 
  const darkMode = useSelector((state) => state.inbox.isDarkMode) 
 
  // const profilepic = profile.profilepic
// console.log(profilepic, 'profi')

// useEffect(()=>{

//   const fetchData = async() =>{
//     const result = await Keychain.getGenericPassword()
//     const data = result.password
//     const profile = JSON.parse(data)
//     setprofile(profile)
//   }

// // fetchData()

// },[])


// console.log(profilepic, 'come from layout')



  // const route = useRouter()
    return(

<Tab.Navigator   screenOptions={{tabBarActiveTintColor:'#FB7F6B',tabBarHideOnKeyboard:true,
     headerStyle:{
        backgroundColor: `${darkMode ? '#000' : '#fff'}`,
      
      },
       headerTintColor: `${!darkMode ? '#000' : '#fff'}`,
       tabBarStyle :{
        backgroundColor: `${darkMode ? '#000' : '#fff'}`,
       }
       
       }}>
      
      <Tab.Screen name="chat"
       component={Chat}
       options={{      
       headerTitle: 'Chats',
       tabBarBadge:2,
       tabBarShowLabel: false,
   
       headerLeft: ()=>(
  
        
        <TouchableOpacity onPress={()=> navigation.navigate('Settings')}>
         

        <Image source={{uri:`${baseURL}/${profilepic}`}} style={{height:40, width:40, borderRadius:100, marginLeft:15}} />
        </TouchableOpacity>
       ),
       headerRight: ()=>(
        <Icon name='edit-3'  color= {!darkMode ? '#000' : '#fff'} size={20} style={[{ padding:8, borderRadius:100, marginRight:15 }, !darkMode ? {backgroundColor:'#F6F6F6' } : {backgroundColor:'#333333'}]}/>
       ),
       tabBarIcon:({color})=>(
      <Icon name='message-circle' size={25} color={color}/>
        
      )}} />
  
  
  <Tab.Screen name="video" component={Video}  options={{ 
        headerTitle: 'calls',
        tabBarShowLabel: false ,
        
        headerLeft: ()=>(
          <TouchableOpacity onPress={()=> navigation.navigate('Settings')}>
          <Image source={{uri:`${baseURL}/${profilepic}`}} style={{height:40, width:40, borderRadius:100, marginLeft:15}} />
          </TouchableOpacity>
         ),
        tabBarIcon:({color})=>(
        <Icon name='video' size={25} color={color}  />
        
      )}} />
  
  
  
  <Tab.Screen name="audio" component={Audio} options={{ 
         headerTitle: 'Stories',
         tabBarShowLabel: false ,
         headerLeft: ()=>(
          <TouchableOpacity onPress={()=> navigation.navigate('Settings')}>
          <Image source={{uri:`${baseURL}/${profilepic}`}} style={{height:40, width:40, borderRadius:100, marginLeft:15}} />
          </TouchableOpacity>
          ),
        tabBarShowLabel: false ,
        tabBarIcon:({color})=>(
        <Icon name='phone' size={25} color={color}  />
        
      )}}  />
  
  
  
  <Tab.Screen name="profile" component={Profile} options={{
       
        headerTitle:'Stories',
        tabBarShowLabel: false,
        headerLeft: ()=>(
          <TouchableOpacity onPress={()=> navigation.navigate('Settings')}>
          <Image source={{uri:`${baseURL}/${profilepic}`}} style={{height:40, width:40, borderRadius:100, marginLeft:15}} />
          </TouchableOpacity>
          ),
        tabBarIcon:({color})=>(
        <Icon2 name='view-array-outline' size={25} color={color} />
        
      )}}  />
  
          </Tab.Navigator>
   
    
     
    
        
    )
}