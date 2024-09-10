import { View, Text , TouchableOpacity, Image, PermissionsAndroid, ActivityIndicator, StatusBar, AppState,  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform, ToastAndroid} from 'react-native'
import React, {useState, useEffect, useRef, useLayoutEffect, useMemo} from 'react'
import { SignIn , SignUp} from './src/screens/authentication'
import { Chat, Layout, Inbox } from './src/screens/chat'
import { Settings, Username, Name, Email, TimeSpend } from './src/screens/settings' 
import {  useSelector , useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator , } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native'
import getSocket from './utils/socket'
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { setUserId, setName, setUserName, setProfile, setuserFullName, setUserEmail} from './src/features/inboxSlice'
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment'


import { Loading } from './src/screens/chat'



import { setAuth, setObj } from './src/features/auth'


import getIsSignedIn from './src/auth/Auth'

import AuthStack from './src/auth/Auth'
import { permissions } from 'react-native-webrtc'
import Button from './src/components/Button'










const Stack = createNativeStackNavigator();


// const getIsSignedIn = () => {
//   // custom logic
//   return true;
// };

const baseURL = 'http://192.168.0.118:1000'


const Main = () => {
  
  const dispatch = useDispatch()
  const name = useSelector((state) => state.inbox.name);
 
  const clientPic = useSelector((state) => state.inbox.clientPic)
  const navigation = useNavigation()
  const userFullName = useSelector((state) => state.inbox.userFullName) 
  const userId = useSelector((state) => state.inbox.userId) 
  const id = useSelector((state) => state.inbox.id) 
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  const isMounted = useRef(false);
  const isSignedIn = useSelector((state)=> state.auth.auth)
  const isDarkMode = useSelector((state) => state.inbox.isDarkMode) 
  const [appState, setAppState] = useState(AppState.currentState);
  const [time, setTime] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false)
const [appRunning, setappRunning] = useState(true)
  
  const [totalTimeSpent, setTotalTimeSpent] = useState(null);

  // const [isSignedIn, setisSignedIn] = useState(false)  
//  const socket = getSocket(userId, id) 

// console.log(isSignedIn, 'isSignin')



useEffect(()=>{
  setTotalTimeSpent(true)

  
},[])




const outgoingCall = () =>{
  const socket = getSocket(userId, id)
  socket.emit('offerSend',{
      name:userFullName,
      socketId:socket.id,
      id:userId, 
      receiverId:id,
      title:'call you' 
  })


  // route.push('../../options/call')

}


// const isSignin = useMemo(() => {
//   return isSignedIn !== null || isSignedIn !== undefined ? isSignedIn : false;
// }, [isSignedIn]);

const isLogin = async() =>{
try {
  const isSignedIn = await getIsSignedIn();
  // setisSignedIn(isSignedIn)

  dispatch(setAuth(isSignedIn))

} catch (error) {
  console.log(error)
}
}


// isLogin()
const checkToken = async () => {
    setIsLoading(false)
  
    try {
      const token = await Keychain.getGenericPassword()
      const result = token.password
      
      setIsLoading(true)
       
      
      if (result) {
        // setIsAuthenticated(true);
        const data = JSON.parse(result)

    
      
        console.log(result, 'come from main.js')
       
    
        dispatch(setUserId(data.userId))
        dispatch(setUserName(data.userName))
        dispatch(setProfile(`${data.profilepic}`))
        dispatch(setuserFullName(data.userFullName))
        dispatch(setUserEmail(data.userEmail))
       
    
        // dispatch(setObj(data))
        dispatch(setAuth(true))
        dispatch(setObj(data))
        setIsAuthenticated(true)
       
        
      }else{
        // setIsAuthenticated(false)
        dispatch(setAuth(false))
        setIsAuthenticated(false)
        // setIsLoading(false)
    
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    
    };
    
   
    
  useEffect(()=>{
    checkToken()
// checkToken()
    console.log(isAuthenticated, 'come from is authenticare')
  },[]) 
    
  


// useLayoutEffect(()=>{
// //  SplashScreen.hide()
// console.log(isAuthenticated, 'cpme from is authenticate')

// },[isAuthenticated])



// useEffect(()=>{

//   console.log(isLoading)


// })

  


  // Remove credentials from keychain
  async function removeCredentials() {
    try {
      await Keychain.resetGenericPassword();
      console.log('Credentials removed successfully!');
      ToastAndroid.show('loging out...', ToastAndroid.SHORT);
    } catch (error) {
      console.log("Couldn't remove credentials from keychain", error);
    }
  }
  
  
  // removeCredentials() 












const startTimer = () => {
  // setStartTime(new Date());
 
};

  


// const stopTimer = () => {
//   if (startTime) {
//     const currentTime = new Date();
//     const elapsedTime = currentTime - startTime;
//     const minutesSpent = Math.floor(elapsedTime / 1000 / 60); // Convert milliseconds to minutes
//     setTotalTimeSpent(totalTimeSpent + minutesSpent);
//     setStartTime(null);
//     setEndTime(currentTime);
//   }
// };





useEffect(()=>{

  const appOpentTime = async() =>{


    if(appState === 'active'){ 
      try {
        // console.log('app running,,') 
        setappRunning(false)
        const time = new Date()
      
       
      
        const currentDate = moment(); // or specify a specific date
        const weekName = currentDate.format('dddd');
        console.log(weekName) 
      
        const timestamp = time;
        const minutesAgo = moment().diff(moment(timestamp), 'minutes');
      
      
      
      await AsyncStorage.setItem('date', JSON.stringify({
        start: time
      }))
  
      } catch (error) {
        console.log(error)
      }
    }
  
  }

  appOpentTime()

return () =>{  
  console.log('return,,,,,') 
}

},[appState])






useEffect(() =>{

  const handleAppClose = async() => {

    if (appState === 'active') {
      try {
        // console.log('app running')
      //   const time = new Date()
      
      
        // const currentDate = moment(); // or specify a specific date
        // const weekName = currentDate.format('dddd');
      //   console.log(weekName) 
      
      //   const timestamp = time;
      //   const minutesAgo = moment().diff(moment(timestamp), 'minutes');
      
      
      
      // await AsyncStorage.setItem('date', JSON.stringify({
      //   start: time
      // }))
 



  //     if(weekName === 'Monday'){



  //       //get app start time data
  //       const data = await AsyncStorage.getItem('date') 
  //       const data2 = JSON.parse(data)
   
  //       const timestamp = data2.start;
  //       const seconds = moment().diff(moment(timestamp), 'seconds');
   
   
  //       console.log(seconds,  'come from else block ') 


  

  //       await AsyncStorage.setItem('timeSpendData', JSON.stringify(
  //         {duration:timestamp, day:weekName},
        
  //       ))

 




  //       const timeSpendData = await AsyncStorage.getItem('timeSpendData')
  //       let timeSpendData2 = JSON.parse(timeSpendData);
        
  //         console.log(timeSpendData2)  
       
            
  //       // if (timeSpendData2 && timeSpendData2.duration) {
  //       //   timeSpendData2.day = weekName
  //       //   timeSpendData2.duration += seconds;
  //       // } else {
  //       //   timeSpendData2 = {
  //       //     day: new Date() ,
  //       //     duration: seconds
  //       //   };

  //       // }



  
  // // await AsyncStorage.setItem('timeSpendData', JSON.stringify(timeSpendData2));
  
  // // // Retrieve and log the updated value
  // // const updatedMondayItem = await AsyncStorage.getItem('timeSpendData');
  // // const updatedMonday = JSON.parse(updatedMondayItem);
  // // console.log(updatedMonday, 'tamjid');


        
  //     }



   
       
      } catch (error) {
        console.log(error, 'hu')
      }



 


      
  
    }else{ 
     
      console.log('remove')
      const data = await AsyncStorage.getItem('date')
      const data2 = JSON.parse(data)
 console.log(data2.start)
      const timestamp = data2.start;
      const minutesAgo = moment().diff(moment(timestamp), 'seconds');
 
 
      console.log(minutesAgo, 'come from else block ') 
 
 
 
      const currentDate = moment(); // or specify a specific date
      const weekName = currentDate.format('dddd');





      


//       if(weekName === 'Sunday'){
//         console.log('its Sunday') 

//         const mondayItem = await AsyncStorage.getItem('Sunday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Sunday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Sunday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');


//       }else if(weekName === 'Monday'){


        
//         console.log('its monday') 

//         const mondayItem = await AsyncStorage.getItem('Monday'); 
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Monday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Monday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');





      
//       }else if(weekName === 'Tuesday'){
//         console.log('its Wednesday') 

//         const mondayItem = await AsyncStorage.getItem('Tuesday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Tuesday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Tuesday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');
      
//       }else if(weekName === 'Wednesday'){

//         console.log('its Wednesday') 

//         const mondayItem = await AsyncStorage.getItem('Wednesday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Wednesday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Wednesday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');


      
//       }else if(weekName === 'Thursday'){

//         console.log('its Thursday') 

//         const mondayItem = await AsyncStorage.getItem('Thursday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // })) 
   
  
//         if (monday && monday.duration) {
//           // monday.day = new Date() 
//           monday.duration += minutesAgo;
//         } else {
//           monday = { 
//             day: new Date() ,
//             duration: minutesAgo 
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Thursday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Thursday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');

// // await AsyncStorage.removeItem('Thursday') 
  



      
//       }else if(weekName === 'Friday'){
//         console.log('its Friday') 

//         const mondayItem = await AsyncStorage.getItem('Friday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Friday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Friday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid'); 


      
//       }else if(weekName === 'Saturday'){ 
//         console.log('its Saturday') 

//         const mondayItem = await AsyncStorage.getItem('Saturday');
//        let monday = JSON.parse(mondayItem);
      
//         // await AsyncStorage.setItem('Sunday', JSON.stringify({
//         //   duration: minutesAgo
//         // }))
   
  
//         if (monday && monday.duration) {
//           monday.day = weekName
//           monday.duration += minutesAgo;
//         } else {
//           monday = {
//             day: new Date() ,
//             duration: minutesAgo
//           };
//         }
      
//    // Store the updated value in AsyncStorage
//   await AsyncStorage.setItem('Saturday', JSON.stringify(monday));
  
//   // Retrieve and log the updated value
//   const updatedMondayItem = await AsyncStorage.getItem('Saturday');
//   const updatedMonday = JSON.parse(updatedMondayItem);
//   console.log(updatedMonday, 'tamjid');
//       }








      
  

 
    }
  };

  handleAppClose()


},[appState, time])


//update time
useEffect(()=>{


 const timer = setInterval(() => {
    setTime(new Date()); 
  }, 1000); 
 
 return () =>{
  clearInterval(timer)
 }
},[]) 



useEffect(() => {
  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  // Add the event listener
  AppState.addEventListener('change', handleAppStateChange);

  // Clean up the event listener
  return () => {
    AppState.removeEventListener('change', handleAppStateChange);
  };
}, []);












// useEffect(()=>{

// const getData = async() =>{

//   try {
//     const data = await Keychain.getGenericPassword()
//     const storedObject = JSON.parse(data.password);
//     console.log(storedObject, 'store obj')
//   } catch (error) {
    
//   }

// }

// getData()






// },[])









  return (
    
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: `${isDarkMode ? '#000' : '#fff'}`,
      
      },
       headerTintColor: `${!isDarkMode ? '#000' : '#fff'}`,
     
    }}> 


    {/* <Stack.Screen name='chat' component={Loading} /> */}

    



 {/* {isLoading ? (
    <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
  ) : isAuthenticated ? (
    <>
     
      <Stack.Screen name="Chat" component={Layout} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings}  options={{
     animation: 'slide_from_left',
    //  animationDuration: 5000,
 
     
      }}/>
      <Stack.Screen name="username" component={Username}  options={{headerShadowVisible:false, title:'Username', animation: 'slide_from_right',}}/>
      <Stack.Screen name="name" component={Name}  options={{headerShadowVisible:false, title:'Name', animation: 'slide_from_right', }}/>
      <Stack.Screen name="email" component={Email}  options={{headerShadowVisible:false, title:'Email', animation: 'slide_from_right', }}/>
      <Stack.Screen name="timeSpend" component={TimeSpend}  options={{headerShadowVisible:false, title:'Time spent', animation: 'slide_from_right', }}/>
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerTitle: name,
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity>
              <Image source={{ uri: clientPic }} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 15 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={outgoingCall}>
              <Icon name='call' size={20} style={{ backgroundColor: '#F7F7F7', padding: 8, borderRadius: 100, marginRight: 15 }} />
            </TouchableOpacity>
          )
        }}
      />
    </>
  ) : (
    <>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </>
  )} */}



{!isLoading ? (
  <Stack.Screen name='loding' component={Loading} options={{headerShown:false}} />
  

) : isAuthenticated ? (

  <>
     
  <Stack.Screen name="Chat" component={Layout} options={{ headerShown: false }} />
  <Stack.Screen name="Settings" component={Settings}  options={{
 animation: 'slide_from_left',
 
  }}/>
  <Stack.Screen name="username" component={Username}  options={{headerShadowVisible:false, title:'Username', animation: 'slide_from_right',}}/>
  <Stack.Screen name="name" component={Name}  options={{headerShadowVisible:false, title:'Name', animation: 'slide_from_right', }}/>
  <Stack.Screen name="email" component={Email}  options={{headerShadowVisible:false, title:'Email', animation: 'slide_from_right', }}/>
  <Stack.Screen name="timeSpend" component={TimeSpend}  options={{headerShadowVisible:false, title:'Time spent', animation: 'slide_from_right', }}/>
  <Stack.Screen
    name="Inbox"
    component={Inbox}
    options={{
      headerTitle: name,
      headerBackVisible: true,
      headerLeft: () => (
        <TouchableOpacity>
          <Image source={{ uri: clientPic }} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 15 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={outgoingCall}>
          <Icon name='call' size={20} style={{ backgroundColor: '#F7F7F7', padding: 8, borderRadius: 100, marginRight: 15 }} />
        </TouchableOpacity>
      )
    }}
  />
</>



) : (

    <>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </>

)}












 
        </Stack.Navigator>      
    


      

  )
}

export default Main