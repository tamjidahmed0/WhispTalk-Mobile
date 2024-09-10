import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import axios from 'axios';
// import socket from '../../utils/socket';
import getSocket from '../../../utils/socket';
// import socket from '../../utils/socket';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Media from './Media';

import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from './options/call';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

// import { useRoute } from '@react-navigation/native';

import {setClientPic, setConversation, setMessageId} from '../../features/inboxSlice';
// import Animated, {SlideInUp, SlideInRight, SlideOutDown, SlideInDown, SlideOutRight, set} from 'react-native-reanimated';
import {outgoingCall} from '../../../Main';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
// const senderId = '64174337887ec69826f12aae'
// const receiverId = '64174393887ec69826f12ab5'

const ImgUri =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKHW8UvKihTaQXue3o0UKafle3fy9GpFk9c2BLUo5BhPalnnkSqa8roRwaFX-hM4msy8oY18X7sctyLPoTpanrfx4YX7GgV7luQF_TnHTPCtp0bcKoaFJa8GxiG1zj_YqnkGcKVO83gUcQBFZB0sGbkAARUrO3zlCbdFpLG9NvrumQhSkyadb_JXvstg/s4032/IMG_20220712_152510.jpg';



  const instance = axios.create({
    baseURL: 'http://192.168.0.118:1000'
  })
  





const Inbox = () => {
  const baseURL = instance.defaults.baseURL

  const dispatch = useDispatch();
  const id = useSelector(state => state.inbox.id);
  const userId = useSelector(state => state.inbox.userId);
  const name = useSelector(state => state.inbox.userFullName);
  const profile = useSelector(state => state.inbox.profilepic);
  const seen = useSelector(state => state.inbox.seen);
  const socket = getSocket(userId, id);
  const [isLoading, setIsLoading] = useState(false);

  const scrollViewRef = useRef(null);
  const isMounted = useRef(false);
  const [msgs, setMsg] = useState([]);
  // const [socket, setSocket] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isButtonDisabled, setisButtonDisabled] = useState(null);
  const [isKeyboardShow, setisKeyboardShow] = useState(false);
  const [userTyping, setuserTyping] = useState(false);
  const [userTypingPic, setuserTypingPic] = useState(null);
const [socketmsg, setsocketmsg] = useState({})
  const profilepic = useSelector(state => state.inbox.profilepic);
  const darkMode = useSelector((state) => state.inbox.isDarkMode) 


  const senderId = userId;
  const receiverId = id;

  //use this axios because load old chat history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `/api/message/${senderId}/${receiverId}?limit=30&offset=0`,
        );
        setMsg(response.data);

        

        // dispatch(setClientPic(list.Id))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

   
  }, []);




useEffect(()=>{

if(socket !== null){

socket.emit('seen', {
  senderId,
  receiverId,
  socketId:socket.id
})



}



},[])





  useEffect(() => {
    socket.emit('addUser', senderId);
  });

  //send msg when button click
  const handleSubmit = () => {
    setInputValue('');
    const date = new Date();
    const timeString = date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
    socket.emit('sendMessage', {
      name: name,
      profile: profile,
      senderId: senderId,
      receiverId: receiverId,
      text: inputValue,
      socketId: socket.id,
      Dates: timeString,
    });

    console.log(name);

    socket.on('sendermsg', sendermsg => {
      // console.log(sendermsg, 'come from sender')
      dispatch(setConversation(sendermsg));

      setMsg(msgs => [...msgs, sendermsg]);
    });

    socket.emit('typing', {
      socketId: socket.id,
      receiverId,
      senderId,
      key: 'enter',
      msg: 0,
    });
  };

  // useEffect(() => {
  //   // Auto-scroll to the bottom of the list when a new message is received
  //   scrollViewRef.current.scrollToEnd({ animated: true });

  // }, []);

  useEffect(() => {
  

      socket.on('receivermessage', async datas => {

        setsocketmsg(datas)
      
               //receieved msg
        if (id === datas.iSend) {
          setMsg(msgs => [...msgs, datas]);
  
          console.log(datas.messageId)
          dispatch(setMessageId(datas.messageId))

         
    
  
          socket.on('typingmsg', data => {
            if (data.key === 'enter') {
              setuserTyping(false);
            }
          });
        }
      
   
  
        // setReceiveValue(datas.text)
        console.log(datas, 'come from inbox');
      });

    return () =>{
      socket.off('receivermessage')
    }

  }, [msgs]);



  useEffect(()=>{


    const newMsg = msgs.map(user =>{
      if(user.messageId === socketmsg.messageId){

        return { ...user , seen: true}

      }
      return user
    })

   

  


  },[msgs])



  const handleTyping = e => {
    setInputValue(e);

    if (socket !== null) {
      socket.emit('typing', {
        socketId: socket.id,
        receiverId,
        senderId,
        msg: e,
        profile,
      });
    }
  };

  useEffect(() => {
    socket.on('typingmsg', data => {
      if (id === data.senderId) {
        setuserTyping(true);

        setuserTypingPic(data.profile);

        console.log(data);
        if (!isKeyboardShow) {
          if (data.count === 0 || data.key === 'keyboardoff') {
            setuserTyping(false);
          }
        }
      }
    });
  }, []);



  const handleKeyPress = event => {
    // if(socket !== null){

    //   socket.emit('typing', {
    //     socketId:socket.id,
    //     receiverId,
    //     senderId,
    //     msg:inputValue,

    //   })

    //   }

    if (event.nativeEvent.key === 'Backspace') {
      const updatedValue = inputValue.slice(0, -1);
      const updatedReverseLength = updatedValue
        .split('')
        .reverse()
        .join('').length;

      if (updatedReverseLength === 0) {
        setTimeout(() => {
          setuserTyping(false);
        }, 0);
      }
    }
  };



  useEffect(() => {
    socket.on('incommingoffer', async incomming => {
      console.log(incomming);
      alert(incomming.name);
    });

    return () => {
      socket.off('incommingoffer');
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (
        Object.keys(inputValue).length === 0 ||
        inputValue.trim().length === 0
      ) {
        setisButtonDisabled(false);
      } else {
        setisButtonDisabled(true);
      }
    } else {
      isMounted.current = true;
    }
  }, [inputValue]);

  //keyboard hide show
  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setisKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setisKeyboardShow(false);

        socket.emit('typing', {
          socketId: socket.id,
          receiverId,
          senderId,
          key: 'keyboardoff',
          msg: 0,
        });

        // socket.on('typingmsg', (data)=>{
        //   if(data.key === 'keyboardoff'){

        //     if(id === data.senderId){
        //       setuserTyping(false)
        //     }
        //     }
        //  })
      },
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFocus = () => {
    setisKeyboardShow(true);
  };

  const handleBlur = () => {
    setisKeyboardShow(false);
  };

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;

    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight < contentHeight) {
      // The user has scrolled up, disable automatic scrolling
      setShouldAutoScroll(false);
    } else {
      // The user has scrolled to the bottom, enable automatic scrolling
      setShouldAutoScroll(true);
    }

    const isAtTop = contentOffset.y === 0;

    if (isAtTop) {
      setIsLoading(true);
      // Calculate the next offset value based on the number of existing messages
      const nextOffset = msgs.length;
      console.log(nextOffset);

      // Fetch the next set of messages
      instance
        .get(
          `/api/message/${senderId}/${receiverId}?limit=10&offset=${nextOffset}`,
        )
        .then(response => {
          setMsg([...response.data, ...msgs]);
          setIsLoading(false);
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    // Set shouldAutoScroll to true when the component is first rendered
    scrollViewRef.current.scrollToEnd({animated: true});
  }, []);

  //scroll end

  useEffect(() => {
    if (shouldAutoScroll) {
      // Automatically scroll to the bottom of the component
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [msgs, shouldAutoScroll]);

useEffect(()=>{


  if (!msgs) {
    return null; // Return null or a loading indicator if msgs is undefined or null
  }


  return () =>{
    console.log('back')
    dispatch(setMessageId(null))
  }

},[])


const handlePress = (list) => {
console.log(list.messageId)
}



  return (
    <View style={[{flex: 1} , darkMode ? {backgroundColor:'#000'} : {backgroundColor:'#fff'}] }>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        // onLayout={() => scrollViewRef.current.scrollToEnd({ animated: false })}

        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={50} style={{top: '40%'}} />
          </View>
        )}


{/* {msgs.map((msg, index) => (
          <TouchableOpacity
            onPress={() => handlePress(msg)}
            key={index}
            style={msg.whoSend ? [styles.incoming, darkMode ? {backgroundColor:'#333'} : {backgroundColor:'#F6F6F6'}] : [styles.outgoing,  {backgroundColor:'#9129F8'} ]  }>
            {msg.whoSend && (
              <Image source={{uri: msg.profile}} style={styles.incomingImage} />
            )}
            <View>
              <Text
                style={msg.whoSend ? [styles.incomingText, darkMode ? {color:'#fff'} : {color:'#000'}] : [styles.outgoingText]}>
                {msg.text}
              </Text>
              <Text style={styles.date}>{msg.Date}</Text>
            </View>
            {msg.seen && <Text style = {{alignSelf:'flex-end'}}>seen</Text>}
          </TouchableOpacity>
        ))} */}


        {msgs.map((msg, index) => (
          <LinearGradient
          key={index}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={msg.whoSend ? darkMode ? ['#333', '#333'] : ['#F6F6F6', '#F6F6F6']  : [ '#F77737', '#FCAF45'] }
          style={msg.whoSend ? [styles.incoming, darkMode ? {backgroundColor:'#333'} : {backgroundColor:'#F6F6F6'}] : [styles.outgoing,  {backgroundColor:'#9129F8'} ]  }
          >

            {msg.whoSend && (
              <Image source={{uri: `${baseURL}/${msg.profile}`}} style={styles.incomingImage} />
            )}
          
          <TouchableOpacity
            onPress={() => handlePress(msg)}
            
            >
        
            <View>
              <Text
                style={msg.whoSend ? [styles.incomingText, darkMode ? {color:'#fff'} : {color:'#000'}] : [styles.outgoingText]}>
                {msg.text}
              </Text>
              <Text style={styles.date}>{msg.Date}</Text>
            </View>
            {msg.seen && <Text style = {{alignSelf:'flex-end'}}>seen</Text>}
          </TouchableOpacity>

          </LinearGradient>
        ))}

{/* {msgs.map((msg, index) => (
        <LinearGradient
          colors={msg.whoSend ? ['#333', '#333'] : ['#9129F8', '#9129F8']}
          key={index}
          style={[
            styles.messageContainer,
            msg.whoSend ? styles.incoming : styles.outgoing,
            darkMode && { backgroundColor: '#333' },
          ]}
        >
          <TouchableOpacity onPress={() => handlePress(msg)} style={styles.touchable}>
            {msg.whoSend && (
              <Image source={{ uri: msg.profile }} style={styles.incomingImage} />
            )}
            <View>
              <Text
                style={[
                  styles.messageText,
                  msg.whoSend && darkMode && { color: '#fff' },
                ]}
              >
                {msg.text}
              </Text>
              <Text style={styles.date}>{msg.Date}</Text>
            </View>
            {msg.seen && <Text style={{ alignSelf: 'flex-end' }}>seen</Text>}
          </TouchableOpacity>
        </LinearGradient>
      ))} */}

        {userTyping && (
          <View
            style={{
              alignSelf: 'flex-start',

              margin: 10,

              marginLeft: 50,
              position: 'relative',
            }}>
            <View style={{borderRadius: 100, overflow: 'hidden'}}>
              <Image
                source={{
                  uri: 'https://media.tenor.com/SEaMoEswK3sAAAAC/typing-imessage.gif',
                }}
                style={{height: 40, width: 70}}
              />
            </View>
          
            {userTypingPic && (
              <Image
                source={{uri: `${baseURL}/${userTypingPic}`}}
                style={styles.incomingImage}
              />
            )}
            
          </View>
        )}

          {/* {seen && <Text style = {{alignSelf:'flex-end'}}>seen</Text>} */}
      </ScrollView>

      <View style={[styles.inputContainer,  darkMode ? {backgroundColor:'#000'} : {backgroundColor:'#fff'}]}>
        {/**{ width: isKeyboardShow ? '90%' : '50%' } */}

        {isKeyboardShow && (
          <Arrow
            name="keyboard-arrow-right"
            size={30}
            color= {!darkMode ? '#000' : '#fff'}
            style={{
              padding: 8,
              borderRadius: 100,
              position: 'absolute',
              top: responsiveHeight(1),
            }}

            onPress={() => setisKeyboardShow(false)}
          />
        )}

        {!isKeyboardShow && <Media />}

        <View
          style={[
            styles.inputText,
            {maxHeight: 100, minHeight: 50},
            {
              width: isKeyboardShow ? responsiveWidth(75) : responsiveWidth(50),
              right: isKeyboardShow
                ? responsiveWidth(-10)
                : responsiveWidth(-35),
            },
            !darkMode ? {backgroundColor:'#F6F6F6'} : {backgroundColor:'#333'}
          ]}>
          <TextInput
            style={[styles.input, !darkMode ? {backgroundColor:'#F6F6F6'} : {backgroundColor:'#333', color:'#fff'}]}
            placeholderTextColor={ !darkMode ?'gray': '#fff'}
            placeholder="Type here..."
            multiline
            numberOfLines={1}
            onChangeText={handleTyping}
            onKeyPress={handleKeyPress}
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Icon
            name="emoji-happy"
            size={20}
            color= {!darkMode ? '#000' : '#fff'}
            style={{
              padding: 8,
              borderRadius: 100,
              position: 'absolute',
              right: 5,
            }}
            onPress={() => console.log('clicked emoji')}
          />

          {isButtonDisabled ? (
            <Icon3
              name="send-sharp"
              size={25}
              color={'#3B71F3'}
              style={{
                padding: 8,
                borderRadius: 100,
                position: 'absolute',
                right: -40,
              }}
              onPress={handleSubmit}
            />
          ) : (
            <Icon2
              name="heart"
              size={30}
              color={'red'}
              style={{
                padding: 8,
                borderRadius: 100,
                position: 'absolute',
                right: -40,
              }}
              onPress={() => console.log('clicked love')}
            />
          )}
        </View>

        <TouchableOpacity style={styles.sendButton}></TouchableOpacity>
      </View>
    </View>
  );
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
};

const styles = StyleSheet.create({
  incoming: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 20,
    margin: 10,
    maxWidth: '70%',
    padding: 10,
    marginLeft: 50,
    position: 'relative',
    // ...shadow,
    
  },

  incomingText: {
    fontSize: 16,
   
  },
  outgoing: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 20,
    margin: 10,
    maxWidth: '50%',
    padding: 10,
    // ...shadow,
    
  },
  outgoingText: {
    fontSize: 16,
    color:'#fff'
  },
  date: {
    fontSize: 12,
    marginTop: 5,
    color: '#888888',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  input: {
    // position:'absolute',
    // paddingHorizontal: 10,
    // paddingRight: 40,
    // backgroundColor: '#F6F6F6',
    // borderRadius: 10,

    width: '100%',
    // // marginLeft:20
    // right:30
    // backgroundColor: '#333333',
  },
  inputText: {
    //  borderRadius:100,
    //  paddingVertical:1,
    //  marginVertical:1
    //  backgroundColor:'red',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 10,
    paddingRight: 40,

    // backgroundColor: '#F6F6F6',
    borderRadius: 10,
    // marginLeft:20
    width: responsiveWidth(50),

    right: responsiveWidth(-35),
  },
  incomingImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 15,
    position: 'absolute',
    bottom: 0,
    left: -40,
    shadowColor: 'black',
    shadowOffset: {height: 2},
    shadowOpacity: 1,
  },
});

export default Inbox;
