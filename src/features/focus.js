import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import {spacing} from '../utils/size'
export const Focus = ({addSubject}) => {
  const[subject, setSubject] = useState(null);
  console.log(subject);
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          label="what wold you like to focus on?"
        />
        <View style={styles.button}>
          <RoundedButton size={50} title="+" onPress={()=>addSubject(subject)}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    padding: spacing.lg,
    justyfyContent: 'top',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  button: {
    justifyContent: 'center',
  },
});
