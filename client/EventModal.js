import React, { useState } from "react";
import { Image, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, ScrollView, Button } from "react-native";
import DatePicker from 'react-native-date-picker';
import FriendItem from './FriendItem.js'

var screenSize = Dimensions.get('window');

const EventModal = ({ eventModalVisible, setEventModalVisible, potentialEventAddress, addNewEvent, setPotentialEvent, currentView }) => {

  const [eventTitle, onChangeEventTitle] = React.useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventInviteList, setEventInviteList] = useState({});

  const DATA = [
    {
      id: '1',
      title: 'Andy',
    },
    {
      id: '2',
      title: 'Jessica',
    },
    // {
    //   id: '3',
    //   title: 'Carl',
    // },
    // {
    //   id: '4',
    //   title: 'Jasmine',
    // },
    // {
    //   id: '5',
    //   title: 'Fred',
    // },
    // {
    //   id: '6',
    //   title: 'Alex',
    // },
  ];

  return (
    <View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={eventModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEventModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setEventModalVisible(!eventModalVisible)
                onChangeEventTitle('');
                setEventDate(new Date());
                setEventInviteList({});
                setPotentialEvent(false);
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEventTitle}
              placeholder="Event Title"
              value={eventTitle}
            />
            <DatePicker
              date={eventDate}
              onDateChange={setEventDate}
            />
            <ScrollView>
              {
                DATA.map((item) => {
                  return <FriendItem
                    eventInviteList={eventInviteList}
                    setEventInviteList={setEventInviteList}
                    key={item.id}
                    item={item}
                  />
                })
              }
            </ScrollView>
            <Button title={'create'} onPress={() => {
                addNewEvent({
                  title: eventTitle,
                  address: potentialEventAddress,
                  inviteList: eventInviteList,
                  date: eventDate,
                  coordinates: currentView
                })
                setEventModalVisible(!eventModalVisible);
                onChangeEventTitle('');
                setEventDate(new Date());
                setEventInviteList({});
                setPotentialEvent(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    bottom: screenSize.height * .03,
    left: screenSize.width * .35
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: screenSize.width * .7
  },
});

export default EventModal;