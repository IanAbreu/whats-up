import React from 'react';
import { Text, View } from 'react-native';

const Messeges = ({ route }) => {
  const {thread} = route.params;
  return (
    <View>
      <Text>{thread.name}</Text>
    </View>
  );
}
export default Messeges;