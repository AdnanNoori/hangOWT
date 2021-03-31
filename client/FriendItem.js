import React, { useState } from "react";
import { Image, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions } from "react-native";

var screenSize = Dimensions.get('window');

const FriendItem = ({item, eventInviteList, setEventInviteList}) => {

  const [friendSelected, setFriendSelected] = useState(false);

  updateEventList = () => {
    if (eventInviteList[item.id]) {
      console.log(item.title);
      delete eventInviteList[item.id];
      setEventInviteList(eventInviteList);
    } else {
      console.log(item.title);
      eventInviteList[item.id] = item.title
      setEventInviteList(eventInviteList);
    }
  }

  return(
    <Pressable
    onPress={() => {
      setFriendSelected(!friendSelected)
      updateEventList()
    }}
  >
    <View
      style={ friendSelected? styles.selected : styles.friend }
    >
      <Image
        source={require('../assets/defaultUser.png')}
        style={{width: screenSize.width * .1, height: screenSize.height * .04, borderRadius: 50, marginRight: 20}}
      ></Image>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  friend: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: screenSize.width * .6,
    height: screenSize.height * .06,
  },
  title: {
    fontSize: 20,
  },
  selected : {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: screenSize.width * .6,
    height: screenSize.height * .06,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'blue'
  }
});

export default FriendItem;