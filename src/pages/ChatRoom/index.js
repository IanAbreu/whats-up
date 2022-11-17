import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useNavigation, useIsFocused } from '@react-navigation/native'

import FabButton from "../../components/FabButton";
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';

const ChatRoom = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null
    setUser(hasUser);
  }, [isFocused])

  useEffect(() => {
    let isActive = true;
    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then((snapshot) => {
          const threads = snapshot.docs.map(documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              lastMessage: { text: '' },
              ...documentSnapshot.data(),
            }
          })
          if (isActive) {
            setThreads(threads);
            setLoading(false);
          }
        })

      return () => isActive = false;
    }
    getChats();
  }, [isFocused, updateScreen])

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(() => { navigation.navigate('SignIn'); }) //dasativar aqui
  }
  function deleteRoom(ownerId, idRoom) {
    if (ownerId !== user?.uid) return;
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text:'Cancel',
          onPress: () => {},
          style:'cancel',
        },
        {
          text: 'Ok',
          onPress: () => handleDeleteRoom(idRoom),
          style: 'default'
        }
      ]
    )
  }
  async function handleDeleteRoom(idRoom) {
    await firestore()
    .collection('MESSAGE_THREADS')
    .doc(idRoom)
    .delete();

    setUpdateScreen(!updateScreen);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#555' />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          {
            user &&
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialIcons name='arrow-back' size={28} color={'#FFF'} />
            </TouchableOpacity>
          }

          <Text style={styles.title}>Grupos</Text>

        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
          <MaterialIcons name='search' size={28} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (<ChatList data={item} deleteRoom={() => deleteRoom(item.owner, item._id)} userStatus={user}/>)}
      />

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType={'fade'} transparent>
        <ModalNewRoom 
        setVisible={() => setModalVisible(false)}
        setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </SafeAreaView>
  );
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#21897E',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10

  }
})