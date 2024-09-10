import * as Keychain from 'react-native-keychain';
import {  useSelector , useDispatch} from 'react-redux'
// import { setUserId, setName, setUserName, setProfile, setuserFullName} from '../features/inboxSlice'



const getIsSignedIn = async() => {
  // custom logic

 
  try {
    const token = await Keychain.getGenericPassword()
    const result = token.password
    if (result) {

      // console.log(result, 'come from auth.js')
  
      // dispatch(setUserId(result.id))
      // dispatch(setUserName(result.name))
      // dispatch(setProfile(result.profile))
      // dispatch(setuserFullName(result.name))

    
      return true
  
      
    }else{
      // setIsAuthenticated(false)
      return true
    }
  } catch (error) {
    console.log(error)
  }
};

export default getIsSignedIn