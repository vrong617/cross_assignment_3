import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

type Props = {
  title: string;
  onActionPress?: () => void; // e.g., search button
};

export default function AppHeader({ title, onActionPress }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.action} onPress={onActionPress} accessibilityRole="button">
        <Text style={styles.actionText}>⌕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: METRICS.spacing.lg,
    paddingTop: METRICS.spacing.lg,
    paddingBottom: METRICS.spacing.md,
  },
  title: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  action: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  actionText: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
});
