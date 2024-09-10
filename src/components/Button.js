import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const Button = ({onPress, text, type}) => {
  return (
    <Pressable onPress={onPress}  style={[styles.container, styles[`container_${type}`]]} >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        alignItems:'center',
        borderRadius:5,
        marginVertical:5
    },
    container_PRIMARY:{
        backgroundColor:'#3B71F3',
    },
    container_TERTIARY:{

    },
    text:{
        fontWeight: 'bold',
        color:'#fff'
    },
    text_TERTIARY:{
        color:'gray'
    }
})

export default Button