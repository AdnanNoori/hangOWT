import React, { useState } from "react";
import { Image, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, ScrollView, Button } from "react-native";

var screenSize = Dimensions.get('window');

const EventDetailModal = ({eventDetailModal, setEventDetailModal, event}) => {

  return (
    <View>
      <Modal
        transparent={true}
        visible={eventDetailModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEventDetailModal(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setEventDetailModal(false)
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={{fontWeight:'bold', margin: 10, fontSize: 30}}>{event.title}</Text>
            <Text style={{textDecorationLine: 'underline'}}>Date/Time</Text>
            <Text style={{margin: 5}}>{event.date}</Text>
            <Text style={{textDecorationLine: 'underline'}}>Location</Text>
            <Text style={{margin: 5}}>{event.address}</Text>
            {
              event.inviteList.map((item) => {
                return (
                  <View
                    style={ styles.friend }
                    key={item.id}
                  >
                    <Image
                      source={require('../assets/defaultUser.png')}
                      style={{width: screenSize.width * .1, height: screenSize.height * .04, borderRadius: 50, marginRight: 20}}
                    ></Image>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>

      </Modal>
    </View>
  )
}

export default EventDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: screenSize.width * .8,
    height: screenSize.height * .65
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  button: {
    borderRadius: 30,
    padding: 2,
    elevation: 2,
    height: 25,
    width: 25,
    bottom: screenSize.height * .03,
    left: screenSize.width * .35
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  friend: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: screenSize.width * .6,
    height: screenSize.height * .06,
  },
});