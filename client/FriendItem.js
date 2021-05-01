import React, { useState } from "react";
import { Image, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions } from "react-native";

var screenSize = Dimensions.get('window');

const FriendItem = ({item, updateEventList}) => {

  const [friendSelected, setFriendSelected] = useState(false);

  return(
    <Pressable
    onPress={() => {
      setFriendSelected(!friendSelected)
      updateEventList(item)
    }}
  >
    <View
      style={ friendSelected? styles.selected : styles.friend }
    >
      <Image
        source={require('../assets/defaultUser.png')}
        style={{width: screenSize.width * .1, height: screenSize.height * .04, borderRadius: 50, marginRight: 20}}
      ></Image>
      <Text style={styles.title}>{item.username}</Text>
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