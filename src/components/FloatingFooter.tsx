import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

export type TabKey = 'Home' | 'Catalog' | 'Favorite' | 'Profile';

type Props = {
  active: TabKey;
  onPress: (key: TabKey) => void;
};

const R = 28;

const emojiMap: Record<TabKey, string> = {
  Home: '🏠',
  Catalog: '🚗',
  Favorite: '❤️',
  Profile: '👤',
};

export default function FloatingFooter({ active, onPress }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={styles.bar}>
        {(['Home', 'Catalog', 'Favorite', 'Profile'] as TabKey[]).map((key) => {
          const focused = active === key;
          const emoji = emojiMap[key];

          return (
            <Pressable key={key} onPress={() => onPress(key)} style={styles.item}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Text style={[styles.emoji, focused ? styles.emojiActive : styles.emojiInactive]}>
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

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    bar: {
      width: '100%',
      backgroundColor: c.surface,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.border,
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
      width: R * 2,
      height: R * 2,
      borderRadius: R,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconWrapActive: { backgroundColor: c.bg, borderWidth: StyleSheet.hairlineWidth, borderColor: c.border },
    emoji: { fontSize: 22, fontWeight: '600' },
    emojiActive: { color: c.primary },
    emojiInactive: { color: c.onSurface, opacity: 0.8 },
    label: { fontSize: 14, fontWeight: '700' },
    labelActive: { color: c.onSurface },
    labelInactive: { color: c.onSurface, opacity: 0.55 },
  });
