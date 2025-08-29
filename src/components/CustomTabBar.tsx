import React from 'react';
import {
  View, Text, Pressable, StyleSheet, Platform,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(inset.bottom, 8) }]}>
      {state.routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === idx;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        let emoji = '🏠';
        if (route.name.includes('Catalog')) { emoji = '🚗'; }
        if (route.name.includes('Profile')) { emoji = '👤'; }

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
              <Text style={[styles.emoji, isFocused ? { color: COLORS.yellow } : { color: COLORS.bg }]}>
                {emoji}
              </Text>
            </View>
            <Text style={[styles.label, isFocused ? styles.labelActive : styles.labelInactive]}>
              {label.replace('Tab', '')}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const R = 28;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: METRICS.spacing.lg,
    right: METRICS.spacing.lg,
    bottom: METRICS.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.text,
    borderRadius: 28,
    paddingVertical: 10,

    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 8 },
    }),
  },
  item: { flex: 1, alignItems: 'center', gap: 6 },
  iconWrap: {
    width: R * 2, height: R * 2, borderRadius: R,
    backgroundColor: 'transparent',
    alignItems: 'center', justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: COLORS.bg,
  },
  emoji: { fontSize: 22, fontWeight: '600' },
  label: { fontSize: 14, fontWeight: '700' },
  labelActive: { color: COLORS.bg },
  labelInactive: { color: 'rgba(0,0,0,0.35)' },
});
