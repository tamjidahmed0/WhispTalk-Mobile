import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import splash from '../../../assets/splash.png'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const Loading = () => {
  return (
    <View>
     <Image source={splash} style={{ height: responsiveHeight(100), width: responsiveWidth(100)}} />
     <View style={{ 
          position:'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: responsiveHeight(40),
          bottom: 0,}}>
     <ActivityIndicator size={50} color={'#006AFF'} />
     </View>
     
    </View>
  )
}

export default Loading