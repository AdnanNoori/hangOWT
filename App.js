import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './client/HomeScreen.js';
import SideMenu from './client/SideMenu.js';
import LoginScreen from './client/LoginScreen.js';

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen name="Feed" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {

  // const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  // const findUserLocation = () => {
  //   getUserLocation((locations) => {
  //     setUserLocation({latitude: locations[0].latitude, longitude: locations[0].longitude})
  //     console.log('1');
  //   })
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}