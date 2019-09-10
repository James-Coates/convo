import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';

const firebase = require('firebase');
require('firebase/firestore');

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.referenceMessages = firebase.firestore().collection('messages');
    this.state = {
      messages: [],
    };
  }

  // Set init message
  componentDidMount() {
    const { navigation } = this.props;
    // get messages from db
    this.unsubscribe = this.referenceMessages.onSnapshot(
      this.onCollectionUpdate,
    );
    this.addMessage(
      `${navigation.getParam('name')} has entered the chat`,
      true,
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
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
  onSend = async (messages = []) => {
    const { stateMessages } = this.state;
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    this.addMessage(stateMessages[0]);
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
              onSend={updatedMessages => this.onSend(updatedMessages)}
              user={{ _id: uid }}
            />
          </KeyboardAvoidingView>
        ) : (
          <GiftedChat
            messages={messages}
            renderBubble={this.renderBubble}
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
