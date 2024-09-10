import { View, Text ,Image, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, ToastAndroid, Switch, StatusBar, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import { Waveform } from '@uiball/loaders'

import Modal from 'react-native-modal'
import { useSelector , useDispatch} from 'react-redux'
import { setProfile, setUserName, setuserFullName, setUserEmail, setIsDarkMode } from '../../features/inboxSlice'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../firebase/config'

import axios from 'axios'
import {Tools} from '.'

import {launchCamera, launchImageLibrary,  } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import * as Keychain from 'react-native-keychain';




const ImgUri = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKHW8UvKihTaQXue3o0UKafle3fy9GpFk9c2BLUo5BhPalnnkSqa8roRwaFX-hM4msy8oY18X7sctyLPoTpanrfx4YX7GgV7luQF_TnHTPCtp0bcKoaFJa8GxiG1zj_YqnkGcKVO83gUcQBFZB0sGbkAARUrO3zlCbdFpLG9NvrumQhSkyadb_JXvstg/s4032/IMG_20220712_152510.jpg'

const defaultPic ='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'




const instance = axios.create({
  baseURL: 'http://192.168.0.118:1000'
})

const Settings = () => {

  const baseURL = instance.defaults.baseURL
 
    // const route = useRouter()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const name = useSelector((state) => state.inbox.userFullName) 
    const userName = useSelector((state) => state.inbox.userName) 
    const userEmail = useSelector((state) => state.inbox.userEmail) 
    const profilePic = useSelector((state) => state.inbox.profilepic) 
    const darkMode = useSelector((state) => state.inbox.isDarkMode) 
    const userId = useSelector((state) => state.inbox.userId) 
    const obj = useSelector((state) => state.auth.obj);
    const [Modals, setModals] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);


    // console.log(userId, 'come from setting.js')

    const [isModalVisible, setModalVisible] = useState(false);
    const [ProfileData, setProfileData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
   
    const [email, setemail] = useState('')

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const [image, setImage] = useState(defaultPic);



    useEffect(() => { 
      const fetchData = async()=>{
          try {
              const response  = await instance.get(`/api/profile/${userId}`)     
           
             setProfileData(response.data)
             setImage(`${response.data.profilePic}`)
             updateObjectInKeychain(response.data)
             setemail(response.data.email)
            } catch (error) {
                console.log(error) 
            } 
      }
      fetchData() 

   



      const updateObjectInKeychain = async ( response) => {
        try {
         
         
      console.log(response, 'come')
          const credentials = await Keychain.getGenericPassword();
      
          if (credentials) {
            // Parse the stored object
            const storedObject = JSON.parse(credentials.password);
      
            // Modify the desired properties or values of the object
            storedObject.userFullName = response.name;
            storedObject.userName = response.username;
            storedObject.email = response.email;
            storedObject.profilepic = `${response.profilePic}`;
           
      
            // Save the updated object back to Keychain
            await Keychain.setGenericPassword(
              'myAppKey',
              JSON.stringify(storedObject)
            );
      
            dispatch(setuserFullName(response.name))
            dispatch(setUserName(response.username))
            dispatch(setUserEmail(response.email))
            dispatch(setProfile(`${response.profilePic}`))
          
            console.log('Object updated successfully in Keychain');
          } else {
            console.log('No object found in Keychain');
          }
        } catch (error) {
          console.log('Error updating object in Keychain:', error);
        }
      };






  }, [])




    
 


  
    
    











//upload image to firebase storage
// const uploadImage = async(result) =>{
//   try {
//     const response = await fetch(result.path);
//     const blob = await response.blob();
//     // const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);
//     const storageRef = firebase.storage().ref().child(`profiles/${userId}`);
    
//     // Check if the image exists
//     storageRef.getDownloadURL()
//     .then(url => {
//     // Image exists, update it
//     const file = new File([blob], userId, { type: "image/jpeg" });
//     setIsLoading(true)
//     storageRef.put(file)
//     .then(async snapshot => {

//     await ImagePicker.clean()
//     ToastAndroid.show('Image updated successfully', ToastAndroid.SHORT);
//     // console.log('Image updated successfully');
//     setIsLoading(false)
//     const downloadURL = await snapshot.ref.getDownloadURL()
    
//     await axios.put(`http://192.168.0.118:1000/api/profilepicupdate/${userId}`,{
//      profilePic:downloadURL
//      })
//     setImage(downloadURL);
//     dispatch(setProfile(downloadURL))
//     updateObjectInKeychain({...ProfileData,profilePic:downloadURL})
//     })
//     .catch(error => {
//     console.error('Error updating image:', error);
//     });
//     })
//     .catch(async error => {
//     // Image does not exist, handle the error or upload the new image
//     // console.error('Image does not exist:', error);
//     const snapshot = await storageRef.put(blob);
//     const downloadURL = await snapshot.ref.getDownloadURL();
//     setImage(downloadURL)
//     });
    
//     setModalVisible(false)
//   } catch (error) {
//     console.log(error)
//     setModalVisible(false)
//   }

// }





const uploadImage = async(result) =>{
console.log(result)
  setIsLoading(true)

  try {

    const formData = new FormData();
    formData.append('image', {
      uri: result.path,  
      type: result.mime,
      name: 'image.jpg',
 
    });

    console.log(formData)

    const response = await instance.post(`/api/test/${userId}?type=profile`, formData, {
      headers: {
        
        'Content-Type': 'multipart/form-data',
      },
    });

     



    if(response.status === 201){

  


      setImage(`${baseURL}/${response.data.url}`)
      dispatch(setProfile(`${response.data.url}`))

     const deleteImageFromDevice = await RNFS.unlink(result.path);

     console.log(deleteImageFromDevice, 'deleted')


      ImagePicker.clean()
      console.log('Image uploaded successfully:', response.data);

      ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);

      setIsLoading(false)
      setModalVisible(false)
    }

   


  } catch (error) {
    console.log(error, 'hhoo')
    setModalVisible(false)
    setIsLoading(false)
  }
}







//pick image from gallery
const pickImage = async () => {

try {
const options = {
  width: 300,
  height: 400,
  cropping: true
}

const result = await ImagePicker.openPicker(options)
uploadImage(result)


} catch (error) {
  console.log(error)
  setModalVisible(false)
  
}

};



//pick image from camera
const pickFromCamera = async()=>{
  const options = {
    width: 300,
    height: 400,
    cropping: true,
    mediaType:'photo'
  }
  try {
  const result = await ImagePicker.openCamera(options)
 
  uploadImage(result)
  console.log(result)
  } catch (error) {
    console.log(error)
    setModalVisible(false)
    ToastAndroid.show('Cancelled', ToastAndroid.SHORT);
  }

}


const toggleSwitch = (e) => {

    dispatch(setIsDarkMode(e)) 
 
  
 console.log(e)
};

console.log(darkMode,'come from dark mode')


useEffect(()=>{





},[])




  return (
    <SafeAreaView style ={[{flex:1},  darkMode ? styles.darkMode : styles.lightMode]}>

      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' ,  justifyContent:'center', marginTop:10}}>
  <View style={{ position: 'relative' }}>
    {image && <Image source={{ uri: `${baseURL}/${profilePic}` }} style={{ height: 110, width: 110, borderRadius: 100,  }}  />}
    {isLoading && 
        <ActivityIndicator size={30} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'  }}
         
        />
 
        }
    <TouchableOpacity style={[styles.iconContainer, darkMode ? styles.darkIconContainer : styles.lightIconContainer]} onPress={toggleModal}>
      <Icon name="camera" size={20} color = {darkMode ? '#fff' : '#000' } />
    </TouchableOpacity>
    
  </View>
  
</View>

<Text style={[{fontWeight:'bold', fontSize:25, textAlign:'center', marginTop:15}, darkMode ? styles.darkMode : styles.lightMode]}>{name}</Text>










  
      {/* <View  style={{ alignItems:'center', justifyContent:'center', top:10, }}>
        <View style={{position:'relative', justifyContent: 'center', alignItems: 'center'}}>
       {image && <Image source={{uri:profilePic}} style={{height:100, width:100, borderRadius:100,  }} />}
        <Icon name='camera' size={20}
        style={[{padding:8, borderRadius:100, marginRight:15 , position:'absolute', right:-15, bottom:10, }, !darkMode ? {backgroundColor:'#F6F6F6' } : {backgroundColor:'#333333'}]}
        onPress={toggleModal}
        color= {!darkMode ? '#000' : '#fff'}
        />

        {isLoading && 
        <ActivityIndicator size={30} style={{ position:'absolute',}}/>
        }


        </View>
    
      <Text style={[{fontWeight:'bold', fontSize:25, top:10}, darkMode ? styles.darkMode : styles.lightMode]}>{name}</Text>

   
      </View> */}
        
        {/* here is all tools */}
      <Tools />

      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection=  'down' 
        onSwipeComplete={toggleModal}
       
        
        animationInTiming={400}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={[styles.modalContent, !darkMode ? {backgroundColor:'#fff' } : {backgroundColor:'#333333'}]}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            <Text style={[styles.text , darkMode ? {color:'#fff'} : {color:'#000'}]}>Change profile picture</Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity style={styles.iconContent} onPress={pickFromCamera}>
               <Icon name='camera' size={20}  color= {!darkMode ? '#000' : '#fff'} />
               <Text style={[{left:20}, darkMode ? {color:'#fff'} : {color:'#000'}]}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContent} onPress={pickImage}>
               <Icon name='images' size={20} color= {!darkMode ? '#000' : '#fff'}/>
               <Text style={[{left:20} , darkMode ? {color:'#fff'} : {color:'#000'}]}>Choose from library</Text>
            </TouchableOpacity>
              
          </View>
        </View>
      </Modal>

      </ScrollView>
 
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    minHeight: 200,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#000",
    fontSize: 20,
    fontWeight:500,
    marginTop: 15,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  icon:{
    top:30,
    left:10,
   
  },
  iconContent:{
    flexDirection:'row',
    marginVertical:10
  },
  loading:{
    position:'absolute',
    left:'50%'
  },
  darkMode:{
    backgroundColor:'#000',
    color:'#fff'
  },
  lightMode:{
    backgroundColor:'#fff'
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth:4
  },
  darkIconContainer: {
    backgroundColor: '#333333',
    borderColor: '#000'
  },
  lightIconContainer: {
    backgroundColor: '#F6F6F6',
    borderColor: '#fff'
  },
});



export default Settings