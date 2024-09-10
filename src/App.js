import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
// import { SignIn } from './screens/authentication'
import { Chat, Layout, Inbox } from './screens/chat'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../src/screens/authentication'
import { Provider} from 'react-redux'
import store from './store/store'
import Main from '../Main'


const App = () => {
  



  
 
  return (
      <Provider store={store} >
      <NavigationContainer>
        {/* <Stack.Navigator>
             <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
             <Stack.Screen name="Chat" component={Layout} options={{headerShown:false}}/>
             <Stack.Screen name="Inbox" component={Inbox} />
        </Stack.Navigator>       */}
        <Main />
      </NavigationContainer>
      </Provider>

      

  )
}

export default App