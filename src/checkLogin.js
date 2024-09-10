import * as Keychain from 'react-native-keychain';
import { setUserId, setName, setUserName, setProfile, setuserFullName, setUserEmail} from './features/inboxSlice'
import { setAuth } from './features/auth'
import {  useSelector , useDispatch} from 'react-redux'

const checkToken = async () => {
    const dispatch = useDispatch()
    setIsLoading(false)
  
    try {
      const token = await Keychain.getGenericPassword()
      const result = token.password
     
      if (result) {
        // setIsAuthenticated(true);
        const data = JSON.parse(result)

    
    
        console.log(result, 'come from main.js')
       
    
        dispatch(setUserId(data.userId))
        dispatch(setUserName(data.userName))
        dispatch(setProfile(`${baseURL}/${data.profilepic}`))
        dispatch(setuserFullName(data.userFullName))
        dispatch(setUserEmail(data.userEmail))
       
    
        // dispatch(setObj(data))
        dispatch(setAuth(true))
        dispatch(setObj(data))
        // setIsAuthenticated(true)
        dispatch(setAuth(true))
       
        
      }else{
        // setIsAuthenticated(false)
        dispatch(setAuth(false))
        // setIsAuthenticated(false)
        // setIsLoading(false)
        dispatch(setAuth(false))
      }
    } catch (error) {
      console.log(error)
      
    }
    
    };

export default checkToken