import React, { useState } from 'react';
import { Text, TextInput, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Whats<Text style={styles.logoSpan}>Up!</Text></Text>
      <Text style={styles.subTitle}>Ajude, colabore, faça networking!</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={'Digite seu nome'}
        placeholderTextColor={'#BABABA'}
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={'Digite seu E-mail'}
        placeholderTextColor={'#BABABA'}
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Digite sua senha'}
        placeholderTextColor={'#BABABA'}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.btnArea}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Já possui uma conta</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',

  },
  logoSpan: {
    color: '#21897E',
  },
  subTitle: {
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  input:{
    width: '90%',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#EBEBEB',
    color: '#000',
    borderRadius: 6,
  },
  btnArea: {
    width: '90%',
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#21897E',
    borderRadius: 6,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})