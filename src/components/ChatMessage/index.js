import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('screen') 

export default function ChatMessage({ data }) {
    const user = auth().currentUser.toJSON();
    const isMyMessage = useMemo(() => {
        return data?.user?._id === user.uid
    }, [data])

    const [time, setTime] = useState();

    useEffect(() => {
        if (data?.createdAt > 0) {
            let d = new Date(data.createdAt.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            
            setTime(`${hours}:${minutes}`);
            
        }
    },[data])
   
    return time? (
        <View style={[styles.container, { flexDirection: isMyMessage ? 'row-reverse' : 'row', justifyContent: data?.system ? 'center' : 'flex-start' }]}>
            <View style={styles.messageArea}>
                <View style={[styles.messageBox, { 
                    backgroundColor: isMyMessage ? '#DCF8C5' : '#FFF', }]}>

                    {!isMyMessage && !data?.system ? (<Text style={styles.name}>{data?.user?.displayName ? data?.user?.displayName : ''}</Text>) : ''}
                    
                    <Text style={[styles.message, { fontSize:data?.system ? 12 : 15 }]}>{data.text}</Text>
                    {!data?.system && (<Text style={styles.time}>{time}</Text>)}
                </View>
            </View>

            {data?.system === true ? '' : (<View> 
            </View>)}
        </View>
    ) : ''
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageArea: { 
        maxWidth: width * 0.8,
        minWidth: width * 0.25,
        padding: 5 
    },
    messageBox: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        shadowColor: "#000", shadowOffset:{ width: 0,
            height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
    },
    name: {
        color: '#f53745',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    message: {
        color: '#000'
    },
    time:{
        fontSize:10,
        color: '#777',
        alignSelf: 'flex-end',
        paddingTop: 5
    }
})