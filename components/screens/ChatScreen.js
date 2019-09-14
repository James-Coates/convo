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
import '../utils/fixtimerbug';
import CustomActions from '../ui-components/CustomActions';

const firebase = require('firebase');
require('firebase/firestore');

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.referenceMessages = firebase.firestore().collection('messages');
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
        console.log('online');
        this.setState({ online: true });
        // get messages from db
        this.unsubscribe = this.referenceMessages.onSnapshot(
          this.onCollectionUpdate,
        );
        this.addMessage(`${user} has entered the chat`, true);
      } else {
        console.log('offline');
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
      });
    });
    const sortedMessages = messages.sort((a, b) => {
      const dateA = a.createdAt;
      const dateB = b.createdAt;
      return dateB - dateA;
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
  storeMessages = async messages => {
    try {
      console.log('store messages reached');
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (err) {
      console.log('error in get local messages');
    }
  };

  // delete local messages
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  };

  // add message to db
  addMessage = (message, system = false) => {
    const { navigation } = this.props;
    if (system) {
      this.referenceMessages.add({
        text: message,
        createdAt: new Date(),
        system,
      });
    } else {
      this.referenceMessages.add({
        text: message.text,
        createdAt: new Date(),
        user: {
          _id: navigation.getParam('uid'),
          name: navigation.getParam('name'),
        },
      });
    }
  };

  // append sent messages to state
  onSend = async (message = []) => {
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
    console.log(message);
    this.addMessage(message[0]);
    const { messages } = this.state;
    this.storeMessages(messages);
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

  // disable input when offline
  renderInputToolbar = props => {
    const { online } = this.state;
    console.log(online);
    if (online === false) return null;
    return <InputToolbar {...props} />;
  };

  renderCustomActions = props => {
    return <CustomActions {...props} />;
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
