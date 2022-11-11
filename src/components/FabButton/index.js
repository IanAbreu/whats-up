import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'



export default function FabButton({setVisible, userStatus}) {
	const navigation = useNavigation();

	const handleNavigateButton = () => {
		userStatus? setVisible() : navigation.navigate('SignIn')
	}

	return (
		<TouchableOpacity 
		activeOpacity={0.9} 
		style={styles.containerButton}
		onPress={handleNavigateButton}
		>
			<View>
				<MaterialIcons name='add' style={styles.text}/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	containerButton: {
		position: 'absolute',
		bottom: '5%',
		right: '6%',
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: '#21897E',

		width: 60,
		height: 60,
		borderRadius: 30,
	},
	text: {
		fontSize: 35,
		color: '#FFF',

	}
})