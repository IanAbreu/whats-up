import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard, FlatList } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useIsFocused } from '@react-navigation/native';
import ChatList from '../../components/ChatList';

const Search = () => {
    const IsFocused = useIsFocused();
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
        setUser(hasUser);


    }, [IsFocused])

    async function handleSearch() {
        if (input === '') return;

        let inputFormat = input.trim().toLowerCase();
        console.log(inputFormat);
        const responseSearch = await firestore()
        .collection('MESSAGE_THREADS')
        .where('name', '>=', inputFormat)
        .where('name', '<=', inputFormat + '\uf8ff')
        .get()
        .then((querySnapshot) => {
            const threads = querySnapshot.docs.map( documentSnapshot => {
                return{
                    _id: documentSnapshot.id,
                    name: '',
                    lastMessage: { text: '' },
                    ...documentSnapshot.data(),
                    }
                })
                setChats(threads);
                setInput('');
                Keyboard.dismiss();
            })
    }
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
                <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
                    <MaterialIcons name='search' size={30} color={'#FFF'} />
                </TouchableOpacity>
            </View>
            <FlatList
            data={chats}
            keyExtractor={item => String(item._id)}
            renderItem={({item}) => (<ChatList data={item} userStatus={user}/>)}
            />
        </View>
    );
}
export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 14,
    },
    input: {
        backgroundColor: '#EBEBEB',
        height: 50,
        width: '80%',
        marginLeft: 10,
        borderRadius: 4,
        padding: 5,

    },
    btnSearch: {
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