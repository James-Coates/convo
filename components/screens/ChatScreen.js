/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Header } from 'react-navigation-stack';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../utils/fixtimerbug';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';
import CustomActions from '../ui-components/CustomActions';

const firebase = require('firebase');
require('firebase/firestore');

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.referenceMessages = firebase.firestore().collection('messages');
    this.imageStore = firebase.storage();
    this.state = {
      messages: [],
      online: '',
    };
  }

  // Set init message
  componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('name');
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ online: true });
        // get messages from db
        this.unsubscribe = this.referenceMessages.onSnapshot(
          this.onCollectionUpdate,
        );
        this.storeMessage({ text: `${user} has entered the chat` }, true);
      } else {
        this.setState({ online: false });
        this.getLocalMessages();
      }
    });
  }

  componentWillUnmount() {
    const { online } = this.state;
    if (online) this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      messages.push({
        _id: doc.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        system: data.system,
        image: data.image,
        location: data.location,
      });
    });
    const sortedMessages = messages.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    this.setState({
      messages: sortedMessages,
    });
  };

  // retrieve locally stored messages
  getLocalMessages = async () => {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (err) {
      console.log('error in get local messages');
    }
  };

  // store messages locally
  saveLocalMessages = async messages => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (err) {
      console.log('error in get local messages');
    }
  };

  // add message to db - message object, system check
  storeMessage = (message, system = false) => {
    const { text, image, location } = message;
    const { navigation } = this.props;
    this.referenceMessages.add({
      text: text || null,
      createdAt: new Date(),
      user: {
        _id: navigation.getParam('uid'),
        name: navigation.getParam('name'),
      },
      system,
      image: image || null,
      location: location || null,
    });
  };

  // append sent messages to state
  onSend = async (message = []) => {
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
    this.storeMessage({ text: message[0].text });
    const { messages } = this.state;
    this.saveLocalMessages(messages);
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(err => console.log(err));
      if (!image.cancelled) {
        this.getImageURL(image.uri)
          .then(imageURL => this.storeMessage({ image: imageURL }))
          .catch(err => console.log(err));
      }
    }
  };

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA,
    );
    if (status === 'granted') {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(err => console.log(err));
      if (!image.cancelled) {
        this.getImageURL(image.uri)
          .then(imageURL => this.storeMessage({ image: imageURL }))
          .catch(err => console.log(err));
      }
    }
  };

  sendLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({}).catch(err =>
        console.log(err),
      );
      if (!location.cancelled) {
        this.storeMessage({ location: location.coords });
      }
    }
  };

  getImageURL = async imageUri => {
    const blob = await this.createBlob(imageUri);
    return this.storeImage(blob);
  };

  createBlob = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = e => {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob;
  };

  storeImage = async blob => {
    const { navigation } = this.props;
    const imageId = `${navigation.getParam('name')}-${moment().format(
      'MMM-DD-hh-mm',
    )}`;
    const ref = this.imageStore.ref().child(imageId);
    await ref.put(blob);
    blob.close();
    const imageUrl = await this.imageStore.ref(imageId).getDownloadURL();
    return imageUrl;
  };

  // disable input when offline
  renderInputToolbar = props => {
    const { online } = this.state;
    if (online === false) return null;
    return <InputToolbar {...props} />;
  };

  renderCustomActions = props => {
    return (
      <CustomActions
        {...props}
        pickImage={this.pickImage}
        takePhoto={this.takePhoto}
        sendLocation={this.sendLocation}
      />
    );
  };

  // customise bubble color
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#757083',
          },
        }}
      />
    );
  };

  renderCustomView = props => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  render() {
    const { navigation } = this.props;
    const { messages } = this.state;
    const uid = navigation.getParam('uid');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: navigation.getParam('color'),
        }}
      >
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Header.HEIGHT + 22}
            style={{ flex: 1 }}
          >
            <GiftedChat
              messages={messages}
              renderBubble={this.renderBubble}
              renderInputToolbar={this.renderInputToolbar}
              renderActions={this.renderCustomActions}
              renderCustomView={this.renderCustomView}
              onSend={updatedMessages => this.onSend(updatedMessages)}
              user={{ _id: uid }}
            />
          </KeyboardAvoidingView>
        ) : (
          <GiftedChat
            messages={messages}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            onSend={updatedMessages => this.onSend(updatedMessages)}
            user={{ _id: uid }}
          />
        )}
      </View>
    );
  }
}

ChatScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
