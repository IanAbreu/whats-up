import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ModalNewRoom = ({ setVisible, setUpdateScreen }) => {

    const [roomName, setRoomName] = useState('');
    const user = auth().currentUser.toJSON();

    function handleButtonCreate() {
        if (roomName.trim() === '') return alert('Dê um nome ao seu grupo.');

        firestore().collection('MESSAGE_THREADS')
        .get()
        .then((snapshot)=>{
            let myThreads = 0;
            let maximumRooms = 4;
            snapshot.docs.map(docItem => {
                if (docItem.data().owner === user.uid) myThreads += 1;
            });
            if (myThreads >= maximumRooms) alert(`Você já atingiu o limite de grupos por usuário! Máximo: ${maximumRooms} grupos.`)
            else createRoom();
        })
        
    }

    function createRoom() {
        firestore().collection('MESSAGE_THREADS')
        .add({
            name: roomName.trim(),
            owner: user.uid,
            lastMessage: {
                text:`Grupo ${roomName.trim()} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            },
        })
        .then((docRef) => {
            docRef.collection('MESSAGES').add({
                text:`Grupo ${roomName.trim()} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                system: true,
            })
            .then(() => {
                setVisible();
                setUpdateScreen();
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => setVisible()}>
                <View style={styles.modal}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo Grupo?</Text>
                <TextInput
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder='Nome para sua sala.'
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={handleButtonCreate}
                    style={styles.buttonCreate}
                >
                    <Text style={styles.buttonText}>Criar Sala</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={setVisible} style={styles.buttonBack} >
                    <Text style={{color: '#BABABA'}} >Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ModalNewRoom;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34,34,34,0.4)'
    },
    modal: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15,
    },
    title: {
        color: '#000',
        marginTop: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#EEE',
        marginVertical: 15,
        fontSize: 16,
        paddingHorizontal: 5,
    },
    buttonCreate: {
        borderRadius: 4,
        backgroundColor: '#21897E',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 19,
    },
    buttonBack:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
})