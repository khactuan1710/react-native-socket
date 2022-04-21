import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
const {io} = require('socket.io-client');
const App = () => {
  const socket = io('http://localhost:3000');
  const [count, setCount] = useState(0);
  const [docket, setDocket] = useState(0);
  const [message, setMessage] = useState('');
  const [messageServer, setMessageServer] = useState('');
  useEffect(() => {
    socket.on('hello', mes => {
      console.log(mes, 'client');
      setDocket(mes);
    });

    socket.on('chat-msg', mes => {
      console.log(mes, 'client');
      setMessageServer(mes);
    });
  }, []);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Show data</Text>

      <Text>{messageServer}</Text>


      <Text>{docket}</Text>
      <TextInput
        onChangeText={text => setMessage(text)}
        placeholder="input message"
        style={{
          borderWidth: 1,
          borderRadius: 20,
          width: 200,
          height: 40,
          paddingLeft: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
          socket.emit('hello', count);


          
          socket.emit('chat-msg', message);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          width: 200,
          backgroundColor: 'blue',
          borderRadius: 10,
          marginTop: 20,
        }}>
        <Text>send data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          width: 200,
          backgroundColor: 'blue',
          borderRadius: 10,
          marginTop: 20,
        }}>
        <Text>receive data</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;
