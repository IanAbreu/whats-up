import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';

const AppStack = createNativeStackNavigator();


const AppRoutes = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen component={SignIn} name={'SignIn'} />
        </AppStack.Navigator>
        );
    }
export default AppRoutes;