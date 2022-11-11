import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useNavigation, useIsFocused } from '@react-navigation/native'

import FabButton from "../../components/FabButton";
import ModalNewRoom from '../../components/ModalNewRoom';

const ChatRoom = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null
    setUser(hasUser);


  }, [isFocused])

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(() => { navigation.navigate('SignIn'); }) //dasativar aqui
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

        <TouchableOpacity>
          <MaterialIcons name='search' size={28} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType={'fade'} transparent>
        <ModalNewRoom setVisible={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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