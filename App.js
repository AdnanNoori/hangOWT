import React, {useState, useEffect} from 'react';
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
function MyDrawer({friendsList, eventList, setEventList}) {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} friendsList={friendsList} eventList={eventList}/>}>
      <Drawer.Screen  name="Feed">
        {props => <HomeScreen friendsList={friendsList} eventList={eventList} setEventList={setEventList}/>}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  const [friendsList, setFriendsList] = useState([]);

  const [eventList, setEventList] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Map">
          {props => <MyDrawer {...props} eventList={eventList} friendsList={friendsList} setEventList={setEventList}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}