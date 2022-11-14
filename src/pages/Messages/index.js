import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ChatMessage from '../../components/ChatMessage';



const Messages = ({ route }) => {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const user = auth().currentUser.toJSON();

  useEffect(() => {
    const unsubscribeListener = firestore().collection('MESSAGE_THREADS')
      .doc(thread._id).collection('MESSAGES').orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          }

          if (!firebaseData.system) data.user = { ...firebaseData.user, name: firebaseData.user.displayName }
          return data;
        })
        setMessages(messages);
      })

    return () => unsubscribeListener();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={messages}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (<ChatMessage data={item} />)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={100}
      >
        <View style={styles.containerInput}>
          <View style={styles.mainContainerInput}>

            <TextInput
              style={styles.textInput}
              placeholder='Mensagem'
              value={input}
              onChangeText={text => setInput(text)}
              multiline={true}
            />

          </View>

          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Feather name='send' size={22} color={'#FFF'} />
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 150,
    minHeight: 48,
    fontSize: 16,
  },
  btnContainer: {
    backgroundColor: '#51C880',
    width: 48,
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
})