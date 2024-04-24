import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-timezone';


export const Message = ({ item, index, isMyMessage }) => {  
  const containerStyle = isMyMessage ? styles.myMessage : styles.otherMessage;
  const messageStyle = isMyMessage ? styles.contentMyMessage : styles.contentOtherMessage;

  const convertUtcToEst = (utcDate) => {
    return moment(utcDate).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });
  };

  return (
    <View style={[styles.messageTimeContainer, messageStyle]}>
      {isMyMessage && <Text>{formatTime(item.timestamp)}</Text>}
      <View key={index} style={[styles.messageContainer, containerStyle]}>
        <View style={[styles.messageContent, messageStyle]}>
          <Text>{item.message}</Text>
        </View>
      </View>
      {!isMyMessage && <Text>{formatTime(convertUtcToEst(item.timestamp))}</Text>}          
    </View>
  )
};

const styles = StyleSheet.create({
    messageContent: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    contentMyMessage: {
      justifyContent: 'flex-end', 
    },
    contentOtherMessage: {
      justifyContent: 'flex-start', 
    },
    messageContainer: {
      padding: 10,
      margin: 5,
      borderRadius: 10,
      maxWidth: '75%',
    },
    messageTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#daf8cb',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f0f0f0',
    },
    isReadStyle: {
      fontSize: 12,
      color: '#373F51'
    },
    r_mg: {
      marginRight: 5
    },
    l_mg: {
      marginLeft: 5
    }
})
