
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const AlphabetNavigator = ({ contacts, scrollToLetter }) => {
    const [lettersList, setLettersList] = useState([]);

    useEffect(() => {
      // Extract unique first letters from contacts' names
      const letters = [...new Set(contacts.map(contact => contact.nom.charAt(0)))];
      setLettersList(letters);
    }, [contacts]);
  return (
    <View style={styles.container}>
      {lettersList.map(letter => (
        <TouchableWithoutFeedback key={letter} onPress={() => scrollToLetter(letter)}>
          <Text style={styles.letter}>{letter}</Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position:'absolute',
    right:0,
    height:'100%',
    paddingTop:30,
    paddingRight:5
  },
  letter: {
    fontSize: 16,
    paddingVertical: 2,
  }
});

export default AlphabetNavigator;
