import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {
  setProfile,
  setUserName,
  setuserFullName,
  setUserEmail,
  setIsDarkMode,
} from '../../../features/inboxSlice';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';


import * as Keychain from 'react-native-keychain';



const Tools = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const name = useSelector(state => state.inbox.userFullName);
  const userName = useSelector(state => state.inbox.userName);
  const userEmail = useSelector(state => state.inbox.userEmail);
  const darkMode = useSelector(state => state.inbox.isDarkMode);




 

    // Remove credentials from keychain
    async function removeCredentials() {
      try {
        await Keychain.resetGenericPassword();
        console.log('Credentials removed successfully!');
        ToastAndroid.show('loging out...', ToastAndroid.SHORT);
      } catch (error) {
        console.log("Couldn't remove credentials from keychain", error);
      }
    }
    
    
    // removeCredentials() 
    







  const toggleSwitch = e => {
    dispatch(setIsDarkMode(e));

    console.log(e);
  };

  return (
    <View style={{left: 20, marginTop: responsiveHeight(7)}}>
      <Text style={{fontWeight: 'bold', color: '#a2a5a1'}}>Profile</Text>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}
        onPress={() => navigation.navigate('name')}>
        <View
          style={{
            backgroundColor: '#06D7A0',
            height: 30,
            width: 30,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon3 name="user" size={20} color={'#fff'} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={darkMode ? styles.darkMode : styles.lightMode}>
            Name
          </Text>
          <Text style={{fontSize: 12, color: '#a2a5a1'}}>{name}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}
        onPress={() => navigation.navigate('username')}>
        <View
          style={{
            backgroundColor: '#FF3831',
            height: 30,
            width: 30,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon3 name="at-sign" size={20} color={'#fff'} />
        </View>

        <View style={{marginLeft: 20}}>
          <Text style={darkMode ? styles.darkMode : styles.lightMode}>
            Username
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#a2a5a1',
            }}>{`yourdomain.com/${userName}`}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}
        onPress={() => navigation.navigate('email')}>
        <View
          style={{
            backgroundColor: '#F37335',
            height: 30,
            width: 30,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon4 name="envelope" size={17} color={'#fff'} />
        </View>

        <View style={{marginLeft: 20}}>
          <Text style={darkMode ? styles.darkMode : styles.lightMode}>
            Email
          </Text>
          <Text style={{fontSize: 12, color: '#a2a5a1'}}>{userEmail}</Text>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              {
                height: 30,
                width: 30,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              },
              darkMode
                ? {backgroundColor: '#333333'}
                : {backgroundColor: '#000'},
            ]}>
            <Icon2 name="moon-sharp" size={20} color={'#fff'} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={darkMode ? styles.darkMode : styles.lightMode}>
              Dark mode
            </Text>
            <Text style={{fontSize: 12, color: '#a2a5a1'}}>
              {!darkMode ? 'Off' : 'On'}
            </Text>
          </View>
        </View>
        <View style={{right: 25}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={darkMode}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            backgroundColor: '#36B729',
            height: 30,
            width: 30,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: '#fff',
              borderRadius: 100,
            }}>
            <View
              style={{
                height: 7,
                width: 7,
                backgroundColor: '#fff',
                left: '70%',
                top: '60%',
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#36B729',
              }}></View>
          </View>
        </View>

        <View style={{marginLeft: 20}}>
          <Text style={darkMode ? styles.darkMode : styles.lightMode}>
            Active status
          </Text>
          <Text style={{fontSize: 12, color: '#a2a5a1'}}>Off</Text>
        </View>
      </View>


      {/* <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold', color: '#a2a5a1'}}>How you use this apps</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('timeSpend')}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#2196F3',
              height: 30,
              width: 30,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon3 name="clock" size={15} color={'#fff'} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={darkMode ? styles.darkMode : styles.lightMode}>
              Time spent
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}






      <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold', color: '#a2a5a1'}}>Account</Text>

        <TouchableOpacity onPress={removeCredentials}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#F04770',
              height: 30,
              width: 30,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon3 name="log-out" size={15} color={'#fff'} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={darkMode ? styles.darkMode : styles.lightMode}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  darkMode: {
    backgroundColor: '#000',
    color: '#fff',
  },
  lightMode: {
    backgroundColor: '#fff',
  },
});

export default Tools;
