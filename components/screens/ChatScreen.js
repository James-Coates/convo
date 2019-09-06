import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

class ChatScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    };
  };

  // Set init message
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: `${this.props.navigation.getParam('name')} has entered the chat`,
          createdAt: new Date(),
          system: true,
         },
      ],
    });
  };

  // append sent messages to state
  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
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

  render() {
    const { navigation } = this.props;

    return (
      <View style={{flex: 1}}>
        {
          Platform.OS === 'android' ?
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Header.HEIGHT + 30} style={{flex: 1}}>
              <GiftedChat
                renderBubble={this.renderBubble}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{ _id: 1 }}
              />
            </KeyboardAvoidingView> :
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{ _id: 1 }}
          />
        }
      </View>
    );
  };
};

export default ChatScreen;