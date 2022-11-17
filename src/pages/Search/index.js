import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Search = () => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput 
          placeholder='Digite o nome da sala.'
          value={input}
          onChangeText={(text) => setInput(text)}
          autoCapitalize='none'
          style={styles.input}
        />
        <TouchableOpacity style={styles.btnSearch}>
          <MaterialIcons name='search' size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Search;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerInput:{
    flexDirection:'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 14,  
  },
  input:{
    backgroundColor: '#EBEBEB',
    height: 50,
    width: '80%',
    marginLeft: 10,
    borderRadius: 4,
    padding: 5,
    
  },
  btnSearch:{
    backgroundColor: '#21897E',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: 50,
    marginLeft: 5,
    marginRight: 10,
  }
})