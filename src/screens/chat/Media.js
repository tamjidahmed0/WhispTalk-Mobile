import { View, Text } from 'react-native'
import React from 'react'
import Mic from 'react-native-vector-icons/FontAwesome';
import Photo from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

const Media = () => {
  const darkMode = useSelector((state) => state.inbox.isDarkMode) 
  return (
    <View
    style={{
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'center',
      top:responsiveHeight(1.5),
      left:responsiveWidth(4)
    }}>
    <Camera
      name="camera"
      size={20}
      style={{padding: 8}}
      color= {!darkMode ? '#000' : '#fff'}
      onPress={() => console.log('clicked emoji')}
    />
    <Photo
      name="photo"
      size={20}
      style={{padding: 8}}
      color= {!darkMode ? '#000' : '#fff'}
      onPress={() => console.log('clicked emoji')}
    />
    <Mic
      name="microphone"
      size={20}
      style={{padding: 8}}
      color= {!darkMode ? '#000' : '#fff'}
      onPress={() => console.log('clicked emoji')}
    />
  </View>
  )
}

export default Media