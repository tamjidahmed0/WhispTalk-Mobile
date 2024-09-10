import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({value, onChangeText, placeholder, name, secureTextEntry}) => {
  return (
    <View style={styles.container} >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder= {placeholder}
        name = {name}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        

        />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width:'90%',
        backgroundColor:'#fff',
        borderColor: '#e8e8e8',
        borderWidth:1,
        borderRadius: 5,
        padding:2,
        paddingLeft:15,
        marginVertical:5
    },
    input:{

    }
})

export default Input