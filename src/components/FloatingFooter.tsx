import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

export type TabKey = 'Home' | 'Catalog' | 'Profile';

type Props = {
  active: TabKey;
  onPress: (key: TabKey) => void;
};

export default function FloatingFooter({ active, onPress }: Props) {
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={styles.bar}>
        {(['Home','Catalog','Profile'] as TabKey[]).map((key) => {
          const focused = active === key;
          const emoji = key === 'Home' ? '🏠' : key === 'Catalog' ? '🚗' : '👤';

          return (
            <Pressable key={key} onPress={() => onPress(key)} style={styles.item}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Text style={[styles.emoji, focused ? { color: COLORS.yellow } : { color: COLORS.bg }]}>
                  {emoji}
                </Text>
              </View>
              <Text style={[styles.label, focused ? styles.labelActive : styles.labelInactive]}>
                {key}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const R = 28;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0, right: 0, bottom: -40,
  },
  bar: {
    width: '100%',
    backgroundColor: COLORS.text,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 45,

    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 8 },
    }),
  },
  item: { flex: 1, alignItems: 'center', gap: 6, paddingTop: 6 },
  iconWrap: {
    width: R * 2, height: R * 2, borderRadius: R,
    backgroundColor: 'transparent',
    alignItems: 'center', justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: COLORS.bg },
  emoji: { fontSize: 22, fontWeight: '600' },
  label: { fontSize: 14, fontWeight: '700' },
  labelActive: { color: COLORS.bg },
  labelInactive: { color: 'rgba(0,0,0,0.35)' },
});
