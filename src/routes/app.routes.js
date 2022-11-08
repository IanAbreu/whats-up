import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import ChatRoom from '../pages/ChatRoom';
import Messeges from '../pages/Messeges';
import Search from '../pages/Search';

const AppStack = createNativeStackNavigator();


const AppRoutes = () => {
    return (
        <AppStack.Navigator initialRouteName='ChatRoom'>
            <AppStack.Screen 
                component={SignIn} 
                name={'SignIn'} 
                options={{ 
                    title: 'Faça Login', 
                    headerStyle: {
                        backgroundColor: '#21897E'
                    },
                    headerTintColor: '#FFF',
                    headerTitleStyle: {
                        fontSize: 22,
                    }
                }}
            />

            <AppStack.Screen 
                component={ChatRoom} 
                name={'ChatRoom'} 
                options={{
                    headerShown: false,
                    }
                }
            />
            
            <AppStack.Screen 
                component={Messeges} 
                name={'Messeges'}
            />

            <AppStack.Screen 
                component={Search} 
                name={'Search'}
            />
            
        </AppStack.Navigator>
        );
    }
export default AppRoutes;