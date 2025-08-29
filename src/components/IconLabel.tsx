import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = { icon: string; text: string };

export default function IconLabel({ icon, text }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.ic}>{icon}</Text>
      <Text style={styles.tx}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ic: { color: COLORS.text, fontSize: 14 },
  tx: { color: COLORS.text, opacity: 0.85, fontSize: 14 },
});
