import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  StatusBar,
  ToastAndroid
  
} from 'react-native';
import React, {useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react';
import axios from 'axios';
import {
  NavigationContainer,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import getSocket from '../../../utils/socket';

import {
  requestUserPermission,
  notificationListener,
  getFcmToken,
} from '../../firebase/Notification';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {useSelector, useDispatch} from 'react-redux';

import notifee, { AndroidImportance, AndroidBadgeIconType, AndroidVisibility} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain';
import { setUserId, setName, setUserName, setProfile, setuserFullName ,setId, setClientPic, setConversation, setSeen} from '../../features/inboxSlice'
// const ImgUri = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKHW8UvKihTaQXue3o0UKafle3fy9GpFk9c2BLUo5BhPalnnkSqa8roRwaFX-hM4msy8oY18X7sctyLPoTpanrfx4YX7GgV7luQF_TnHTPCtp0bcKoaFJa8GxiG1zj_YqnkGcKVO83gUcQBFZB0sGbkAARUrO3zlCbdFpLG9NvrumQhSkyadb_JXvstg/s4032/IMG_20220712_152510.jpg'

import SplashScreen from 'react-native-splash-screen';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// const socket = getSocket()


const instance = axios.create({
  baseURL: 'http://192.168.0.118:1000'
})





const Chat =   () => {
  const baseURL = instance.defaults.baseURL
  const [result, setresult] = useState({})
  const isSignedIn = useSelector((state)=> state.auth.auth)
  const conversation = useSelector((state)=> state.inbox.conversation)
  const messageId = useSelector(state => state.inbox.messageId);

  // const obj = useSelector((state) => state.auth.obj);

  const [newMsg, setnewMsg] = useState({})
  const [conv, setconv] = useState({})

  const [isBold, setisBold] = useState(true)
  const [count, setcount] = useState(0)

  const dispatch = useDispatch();
  const userId = useSelector(state => state.inbox.userId);
  // const userId = obj.userId;
  const id = useSelector(state => state.inbox.id);
  // const id = obj.id;
 const socket = getSocket(userId, id); 
 const darkMode = useSelector((state) => state.inbox.isDarkMode) 

//  const [socket, setSocket] = useState(null);

//  useEffect(() => {
//   // Only call getSocket if userId is not null
//   if (userId !== null) {
//     const newSocket = getSocket(userId, id);
//     setSocket(newSocket);
//   }
// }, []);
  
  
// console.log(id)
  // console.log(obj, 'come from obj')



  const navigation = useNavigation();

  const name = useSelector(state => state.inbox.name);
  // const name = result.name;

  // console.log(name);
 
  // console.log(userId, 'come from userId');


useLayoutEffect(()=>{
  console.log(id, 'come from id');
  console.log(userId, 'come from userId');
},[isSignedIn])

 


  const [list, setList] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await instance.get(
          `/api/conversations/${userId}`,
        );
       
        setList(response.data);
        // dispatch(setConversation(response.data));
        const find = response.data.find(obj => obj.Id === id);
        // response.data.map(obj=> console.log(obj.profile) )
        // console.log(find)
        dispatch(setClientPic(find.profile));
        // console.log(response.data, 'come from fetch data')
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

 

  // useEffect(()=>{
  //   socket.emit('conversations', {name:'tamjid'})

  //   return ()=>{
  //     socket.off('conversations')
  //   }

  // },[])


// useEffect(()=>{

//   const retrieveData = async() =>{
//     try {
//       const results = await Keychain.getGenericPassword();
//       const myObject = results.password;
//       if (myObject) {
//         const data = myObject
//         setresult(data)
//         console.log('Object retrieved successfully:', data);


//         // dispatch(setUserId(data.userId))
//         // dispatch(setUserName(data.name))
//         // dispatch(setProfile(data.profile))
//         // dispatch(setuserFullName(data.name))


//       } else {
//         // console.log('No object found in keychain');
//       }
//     } catch (error) {
//       console.log("Couldn't retrieve object from keychain", error);
//     }
//   }

//   retrieveData()



// },[])


useEffect(()=>{



  
if(socket !== null){

 if(conversation){


  const newList = list.map(user => {
            
    if (user.Id === conversation.receiverId) {
     
      console.log('matched blah')
      const originalText = conversation.text
      const trimText = originalText.substring(0,23)
     
        return {...user, convText: trimText.length < 23 ? `You: ${trimText}.` : `You: ${trimText}...` , date:conversation.Date };
   
    }
    return user;
  
  });
 
  if(newList.length !== 0){
    setList(newList);
  }


 }
   

 

}

},[conversation])

 




useEffect(()=>{

  const checkNotificationPermission  = async() =>{

    try {




     const check = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION
      )   
  console.log(check)

    } catch (error) {
      console.log(error)
      
    }
 

  }

  checkNotificationPermission()


},[])







  useEffect(() => {

 
    if (socket !== null) {


      socket.on('conversations', async datas => {
        setnewMsg(datas)

   console.log(datas,' datas')

//    console.log(list, 'come from list')

//    const find = list.find((element)=> element.Id === datas.iSend)
// const findIndex = list.findIndex((element)=> element.Id === datas.iSend)


// console.log(find, findIndex)

//  const newlist = list.with(findIndex, {convText:datas.convText})

//     console.log(newlist) 
  
        const newList = list.map(user => {
            
          if (user.Id === datas.iSend) {
            const originalText = datas.convText
            const trimText = originalText.substring(0,23)
            setcount(count+1)
           
            setconv(datas)
             setisBold(true)
              return {...user, convText:trimText.length < 23 ? `${trimText}.` : `${trimText}...`, date:datas.Date };
         
          }
          return user;
        
        });
       
        if(newList.length !== 0){
          setList(newList);
        }
       
       
   

        



  
  
      
        try {


          // await PermissionsAndroid.request(
          //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION
          // )






          const channelId = await notifee.createChannel({
            id: 'custom-vibration',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            sound:'notification',
         
           
          });
  
  
          // Display a notification
        await notifee.displayNotification({
        title: datas.name,
        body: datas.convText,
        
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
         
          largeIcon: datas.profile,
          showTimestamp: true,
          visibility:AndroidVisibility.PUBLIC,     
          sound:'notification',        
          pressAction: {
            id: 'sound',
          },
        },
      });
  
  
  
  
        } catch (error) {
          console.log(error)
        }
  
  
  
      });




    }



   

    return () => {


      if(socket !== null){
        socket.off('conversations');
        socket.off('sendermsg');
        console.log('exit');
      }



     
    };

  }, [list]);

  const handleclick = lists => {
    // router.push('inbox')
    navigation.navigate('Inbox');

    dispatch(setId(lists.Id));
    dispatch(setName(lists.name));

    // const find = list.find(obj => obj.Id === id)
    // // response.data.map(obj=> console.log(obj.profile) )
    //   // console.log(find)
    dispatch(setClientPic(`${baseURL}/${lists.profile}`));
   

    if(lists.Id === newMsg.iSend){
      setisBold(false)
      setcount(0)
    }

   

    socket.emit('inboxId', {
      senderId: userId,
      receiverId: id,
      socketId: socket.id,
    });



    if(socket !== null){

      // socket.emit('seen', {
      //   senderId:userId,
      //   receiverId: lists.Id,
      //   socketId: socket.id,
      //   messageId
      // })

 
    
    }


  };


  useEffect(()=>{

    // if(socket !== null){
    //   socket.on('seen' , data =>{
    //     console.log(data)

        
    //     if(data.messageId !== null){
    //       dispatch(setSeen(true))
    //     }
    //   })
    // }

  },[])


  return (
    <View style ={[{flex:1}, darkMode ? {backgroundColor:'#000'} : {backgroundColor:'#fff'} ] }> 
      <StatusBar backgroundColor = {darkMode ? '#000' : '#fff'}  barStyle= {!darkMode ? 'dark-content' : 'light-content'} />
    <View style={styles.chatList}>
      {list.map((list, index) => (
        <TouchableOpacity key={index} onPress={() => handleclick(list)}>
          <View style={styles.chatPerson}>
            <View>
              <Image
                source={{uri: `${baseURL}/${list.profile}`}}
                style={{height: 60, width: 60, borderRadius: 100}}
              />
            </View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={
              darkMode ? 
              isBold ? list.Id === newMsg.iSend ? {fontWeight:'bold', fontSize: 17, color:'#fff'}  : {fontWeight: '400', fontSize: 17 , color:'#fff'} :  {fontWeight: '400', fontSize: 17, color:'#fff'}
              :
              isBold ? list.Id === newMsg.iSend ? {fontWeight:'bold', fontSize: 17,}  : {fontWeight: '400', fontSize: 17 } :  {fontWeight: '400', fontSize: 17,}
              
              }>
                {list.name}              
              </Text>
            
             

              <Text style={
                darkMode ?
                  
               isBold ? list.Id === newMsg.iSend ? {fontWeight:'bold', color:'#fff'} : {color:'gray'} : {color:'gray'}
               :
               isBold ? list.Id === newMsg.iSend ? {fontWeight:'bold'} : {color:'gray'} : {color:'gray'}
              
              }>
                {list.convText}
                
                </Text>
             
           
               
              
             
            </View>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Text style={isBold ? list.Id === newMsg.iSend ? {fontWeight:'bold'} : {color:'gray'} :  {color:'gray'} }>{list.date}</Text>
              {/* <Text style={{color: 'gray'}}>s</Text> */}
              {isBold && list.Id === newMsg.iSend ?  <Text style ={styles.badgeCount}>{count}</Text>
               : 
              <Text style={{color: 'gray'}}>s</Text>
              }
             
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {/* <View>
      <TextInput value={messageInput} onChangeText={handleInputChange} />
      <Button title="Send" onPress={handleSendMessage} />
    </View> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatList: {
  
   
  },
  chatPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  badgeCount:{
    
    textAlign:'center',
    backgroundColor:'#FF2F2F',
    borderRadius:100,
    color:'#fff' ,
    fontWeight:'bold',
    width:20,
    height:20,
    
  }
});

export default Chat;
