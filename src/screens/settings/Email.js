import { View, Text, TextInput , StyleSheet , Button , TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserName } from '../../features/inboxSlice'
import * as Keychain from 'react-native-keychain';

import axios from 'axios'

const Username = () => {

  const dispatch = useDispatch()

  const [input, setinput] = useState('')
  const [data, setdata] = useState({})
  const [status, setstatus] = useState(null)
  const userId = useSelector(state => state.inbox.userId);
  const username = useSelector(state => state.inbox.userName);
  const darkMode = useSelector((state) => state.inbox.isDarkMode) 






  const handleClick = async() => {
    console.log(input)

    try {
      const response = await axios.put(`http://192.168.0.118:1000/api/username/${userId}`,{
        username:input
      })


      const updateObjectInKeychain = async () => {
        try {
         
         
      
          const credentials = await Keychain.getGenericPassword();
      
          if (credentials) {
            // Parse the stored object
            const storedObject = JSON.parse(credentials.password);
      
            // Modify the desired properties or values of the object
            storedObject.userName = response.data.username;
      
            // Save the updated object back to Keychain
            await Keychain.setGenericPassword(
              'myAppKey',
              JSON.stringify(storedObject)
            );
      
            dispatch(setUserName(response.data.username))
         
            console.log('Object updated successfully in Keychain');
          } else {
            console.log('No object found in Keychain');
          }
        } catch (error) {
          console.log('Error updating object in Keychain:', error);
        }
      };

      updateObjectInKeychain()


      setdata(response.data)

      console.log(response.data)

      
      setstatus(false)

    } catch (error) {
      console.log(error)
      setstatus(true)
      setdata(error.response.data)
    }


  }


  const handleTyping = (e) => {
    setinput(e)
    console.log(e)
  }


  return (
    <View style ={[styles.container , !darkMode ? {backgroundColor:'#fff' } : {backgroundColor:'#000'}]}>
      <TextInput placeholder='Change Username' style ={ [status ? styles.error : styles.input , !darkMode ? {color:'#000' } : {color:'#fff', borderBottomColor:'#fff'} ]} defaultValue={username}  onChangeText={handleTyping} />
      <Text style ={status && styles.texterror } >{data.msg}</Text>
       
      <TouchableOpacity style ={styles.button} onPress={handleClick}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold' }}>save</Text>
       </TouchableOpacity>

       <Text style ={{fontSize:13, marginVertical:20, color:'gray'}}>Note: If you change your username once you can wait for 2 days for change it again</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    flex:1,
    backgroundColor:'#fff'
  },
  input:{
    borderBottomWidth:1,
  
  },
  button:{
    backgroundColor:'#FF3831',
    width:70,
    textAlign:'center',
    marginVertical:10,
    padding:6,
    borderRadius:10
  },
  error:{
    borderBottomWidth:1,
    borderColor:'red'
  },
  texterror:{
    color:'red'
  }
})

export default Username