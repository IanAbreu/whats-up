import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const ModalNewRoom = ({ setVisible }) => {

    const [roomName, setRoomName] = useState();
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
                    onPress={() => { }}
                    style={styles.buttonCreate}
                >
                    <Text style={styles.buttonText}>Criar Sala</Text>
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
        justifyContent: 'center'
        
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 19,
    },
})