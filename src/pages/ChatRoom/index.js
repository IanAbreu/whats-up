import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import FabButton from "../../components/FabButton";

const ChatRoom = () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch(() => { console.log('nao tem usuario'); })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name='arrow-back' size={28} color={'#FFF'} />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>

        </View>

        <TouchableOpacity>
          <MaterialIcons name='search' size={28} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={()=> setModalVisible(true)}/>
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
    paddingTop: 40,
    paddingBottom: 20,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10

  }
})