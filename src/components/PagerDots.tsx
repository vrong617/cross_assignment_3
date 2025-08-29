import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  total: number;
  active: number;
};

export default function PagerDots({ total, active }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === active ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const DOT = 8;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignSelf: 'center', marginTop: 8 },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
  dotActive: { backgroundColor: COLORS.yellow },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.35)' },
});
