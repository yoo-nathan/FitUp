import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { markAsRead } from '../service/chatService';

export const Message = ({ item, fromId, toId }) => {
  
  const isMyMessage = item.from_id === fromId;
  const messageId = item.id;

  const messageStyle = isMyMessage ? styles.contentMyMessage : styles.contentOtherMessage;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const markMsgAsRead = async () => {
      try {
        const update = await markAsRead(messageId, toId);
        if (!update) {
          console.error('Failed to mark message as read');
        }
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
    markMsgAsRead();
  }, [])
  
  return (
    <View style={[styles.messageContent, messageStyle]}>
      <Text>{item.message}</Text>
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

})
