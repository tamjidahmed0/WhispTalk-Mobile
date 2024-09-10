import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import * as Keychain from 'react-native-keychain';

let socket = null; // initialize socket object to null

const getSocket = (userId, id) => {
  
  if (!socket) {
   
    // console.log(id , 'come from socket')
    socket = io('ws://192.168.0.118:1000', {
      query: { userID:userId, receiverId:id }  
    });
    // add event listeners and emit events as needed
  }
return socket
  
};

export default getSocket;



//  const socket = io('ws://192.168.0.118:9000');

     
 
// export const getSocket = () => socket; 




// const  socket = io('ws://192.168.0.118:9000');

 

  
// export default socket;
  