import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from './Complete';
import Ing from './Ing';
import {View, Text} from 'react-native';

const Stack = createNativeStackNavigator();

function Delivery() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
