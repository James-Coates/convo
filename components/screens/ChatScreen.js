import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import QueryString from 'qs';

const firebase = require('firebase');
require('firebase/firestore');

class ChatScreen extends Component {

  constructor(props) {
    super(props);
    this.referenceMessages = firebase.firestore().collection('messages');
    this.state = {
      messages: []
    }
  };

  // Set init message
  componentDidMount() {
    // get messages from db
    this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
    this.addMessage(`${this.props.navigation.getParam('name')} has entered the chat`, true);
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        _id: doc.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        system: data.system,
      });
    });
    const sortedMessages = messages.sort(function (a, b) {
      const dateA = a.createdAt;
      const dateB = b.createdAt;
      return  dateB - dateA;
    });
    this.setState({
      messages: sortedMessages,
    });
    console.log(this.state.messages);
  }

  addMessage = (message, system = false) => {
    if (system) {
      this.referenceMessages.add({
        text: message,
        createdAt: new Date(),
        system
      })
    } else {
    this.referenceMessages.add({
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: this.props.navigation.getParam('uid'),
        name: this.props.navigation.getParam('name')
      }
    })}
  }

  // append sent messages to state
  onSend = async (messages = []) => {
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.addMessage(this.state.messages[0]);
  };

  // customise bubble color
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#757083'
          },
        }}
      />
    );
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { navigation } = this.props;
    const uid = navigation.getParam('uid');
    return (
      <View style={{flex: 1, backgroundColor: navigation.getParam('color')}}>
        { Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Header.HEIGHT + 22} style={{flex: 1}}>
            <GiftedChat
              renderBubble={this.renderBubble}
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{ _id: uid }}
            />
          </KeyboardAvoidingView> ) : (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{ _id: uid }}
          />)
        }
      </View>
    );
  };
};

export default ChatScreen;