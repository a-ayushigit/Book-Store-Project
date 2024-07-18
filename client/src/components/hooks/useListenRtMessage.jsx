import React from 'react'
import {SocketContext} from '../Contexts/SocketContext.jsx';
import { useContext } from 'react';
const useListenRtMessage = () => {

  const { socket } = useContext(SocketContext);
  
}

export default useListenRtMessage
