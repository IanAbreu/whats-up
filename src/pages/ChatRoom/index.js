import React from 'react';
import { Button, Text, View } from 'react-native';
import { auth } from '@react-native-firebase/auth'

import { useNavigation } from '@react-navigation/native'

const ChatRoom = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ChatRoom</Text>
      <Button title='Login' onPress={()=> navigation.navigate('SignIn')}/>
    </View>
  );
}

export default ChatRoom;