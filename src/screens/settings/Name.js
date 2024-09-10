import { View, Text, TextInput , StyleSheet , Button , TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'
import * as Keychain from 'react-native-keychain';
import { setProfile, setUserName, setuserFullName } from '../../features/inboxSlice'


const Name= () => {
 const dispatch = useDispatch()
  const [input, setinput] = useState('')
  const [data, setdata] = useState({})
  const [status, setstatus] = useState(null)
  const userId = useSelector(state => state.inbox.userId);
  const name = useSelector((state) => state.inbox.userFullName) 
  const darkMode = useSelector((state) => state.inbox.isDarkMode) 

useEffect(()=>{

  const updateData = async () =>{

 


  }

  updateData()
  

},[input])



  const handleClick = async () => {
    

    try {
      const response = await axios.put(`http://192.168.0.118:1000/api/name/${userId}`,{
        name:input
      })



      
const updateObjectInKeychain = async () => {
    try {
     
     
  
      const credentials = await Keychain.getGenericPassword();
  
      if (credentials) {
        // Parse the stored object
        const storedObject = JSON.parse(credentials.password);
  
        // Modify the desired properties or values of the object
        storedObject.userFullName = response.data.name;
  
        // Save the updated object back to Keychain
        await Keychain.setGenericPassword(
          'myAppKey',
          JSON.stringify(storedObject)
        );
  
        dispatch(setuserFullName(response.data.name))
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
      console.log(error.response.data)
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
      <TextInput placeholder='Change Name' style ={ [status ? styles.error : styles.input , !darkMode ? {color:'#000' } : {color:'#fff', borderBottomColor:'#fff'} ]} defaultValue= {name}  onChangeText={handleTyping} />
      <Text style ={[status && styles.texterror, {}] } >{data.msg}</Text>
      
       <TouchableOpacity style ={styles.button} onPress={handleClick}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold' }}>save</Text>
       </TouchableOpacity>

       <Text style ={{fontSize:13, marginVertical:20, color:'gray'}}>Note: If you change your name you can wait for one month to change the name again</Text>
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
    backgroundColor:'#06D7A0',
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
    color:'red',
    fontSize:12
  }
})

export default Name