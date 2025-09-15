import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

type Props = { icon: string; text: string };

export default function IconLabel({ icon, text }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <Text style={styles.ic}>{icon}</Text>
      <Text style={styles.tx}>{text}</Text>
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    ic: { color: c.onSurface, fontSize: 14 },
    tx: { color: c.onSurface, opacity: 0.9, fontSize: 14 },
  });
