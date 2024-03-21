import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function ChatRoom() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Text>image</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.userName}>Name</Text>
        <Text style={styles.preview}>This is placeholder for the preview of the chat</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenDimensions.width,
    height: screenDimensions.height * 0.12,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10
  },
  imgContainer: {
    width: '14%',
    height: '14%',
    minWidth: 56,
    minHeight: 56,
    borderRadius: 56/2,
    borderWidth: 1,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  content: {
    width: screenDimensions.width * 0.66,
    height: screenDimensions.height * 0.12,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  }, 
  userName : {
    fontSize: 15, 
    fontWeight: 'bold'
  },
  preview: {
    fontSize: 10,
  }

})