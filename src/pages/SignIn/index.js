import React, { useState } from 'react';
import { Text, TextInput, Platform, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation } from '@react-navigation/native'

const SignIn = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false); //true === cadastrar || false === logar


const handleLogin = () => {
  if (type) {
    if (name === '' || email === '' || password === '') { 
      alert('Preencha todos os campos para continuar');
      return;
    }

    auth().createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
    .then((user) => {
      user.user.updateProfile({
        displayName: name.trim()
      })
      .then(() => {navigation.goBack()})
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email já em uso!');
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert('Senha fraca!');
        return;
      }
      if (error.code === 'auth/invalid-email') {
        alert('Email inválido!');
        return;
      }
    })
    
  } else {
    auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password)
    .then(() =>{
      navigation.goBack();
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        alert('Email inválido!');
        return;
      }
      if (error.code === 'auth/user-disabled') {
        alert('Usuário desabilitado!');
        return;
      }
      if (error.code === 'auth/user-not-found') {
        alert('Usuário não encontrado!');
        return;
      }
      if (error.code === 'auth/wrong-password') {
        alert('Senha inválida!');
        return;
      }
    })
    
  }

}

const clearInputs = () =>{
  setName('');
  setEmail('');
  setPassword('');
  Keyboard.dismiss();
}
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Whats<Text style={styles.logoSpan}>Up!</Text></Text>
      <Text style={styles.subTitle}>Ajude, colabore, faça networking!</Text>

      {type && <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={'Digite seu Nome'}
        placeholderTextColor={'#BABABA'}
      />}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={'Digite seu Email'}
        placeholderTextColor={'#BABABA'}
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Digite sua Senha'}
        placeholderTextColor={'#BABABA'}
        secureTextEntry={true}
      />

      <TouchableOpacity 
      onPress={handleLogin}
      style={styles.btnArea}>
        <Text style={styles.btnText}>{type ? 'Cadastrar' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={{padding:20}}
      onPress={() => {
        setType(!type);
        clearInputs();
        }}>
        <Text>{type ? 'Já possuo uma conta' : 'Criar uma nova conta'}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

export default SignIn;

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
    backgroundColor: '#21897E',
    borderRadius: 6,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})