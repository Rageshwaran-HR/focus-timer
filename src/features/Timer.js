import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timeing } from './Timeing';
import { spacing } from '../utils/size';
import { colors } from '../utils/colors';
import { useKeepAwake } from 'expo-keep-awake';
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];
export const Timer = ({ focusSubject, clearSubject,onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStared] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  
  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStared(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <ProgressBar
          progress={progress}
          color={colors.blue}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timmingWrapper}>
        <Timeing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStared(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStared(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timmingWrapper: {
    flex: 0.1,
    padding: spacing.xxl,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
