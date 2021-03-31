import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text>Friends</Text>
      <Text>Events</Text>
      <Text>Add Friend</Text>
      <Text>Notifications</Text>
    </DrawerContentScrollView>
  );
}

export default SideMenu;