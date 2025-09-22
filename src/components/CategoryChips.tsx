import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { METRICS } from '../constants/metrics';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

export type Category = { id: string; title: string; icon?: any; iconScale?: number };

type Props = {
  items: Category[];
  onPress?: (id: string) => void;
  onSeeAll?: () => void;
  circleSize?: number;
  iconRatio?: number;
};

export default function CategoryChips({
  items,
  onPress,
  onSeeAll,
  circleSize = 65,
  iconRatio = 0.7,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const ICON = Math.round(circleSize * iconRatio);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.title}>Categories</Text>
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        horizontal
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        contentContainerStyle={{ paddingHorizontal: METRICS.spacing.lg }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.chipWrap, { width: circleSize + 8 }]}
            onPress={() => onPress?.(item.id)}
            hitSlop={8}
          >
            <View
              style={[
                styles.circle,
                { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
              ]}
            >
              {!!item.icon && (
                <Image
                  source={item.icon}
                  style={[
                    styles.icon,
                    { width: ICON, height: ICON },
                    item.iconScale ? { transform: [{ scale: item.iconScale }] } : null,
                  ]}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.chipLabel} numberOfLines={1}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    wrap: { marginTop: METRICS.spacing.lg },
    row: {
      paddingHorizontal: METRICS.spacing.lg,
      marginBottom: METRICS.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: { color: c.onSurface, fontSize: 18, fontWeight: '800' },
    seeAll: { color: c.primary, fontSize: 14, fontWeight: '600' },

    chipWrap: { alignItems: 'center', marginBottom: METRICS.spacing.lg },
    circle: {
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: METRICS.spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },
    icon: {},
    chipLabel: { color: c.onSurface, fontSize: 12, textAlign: 'center', fontWeight: '600' },
  });
