import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

export type Category = { id: string; title: string; icon?: any };
type Props = { items: Category[]; onPress?: (id: string) => void; onSeeAll?: () => void };

export default function CategoryChips({ items, onPress, onSeeAll }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity onPress={onSeeAll}><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chip} onPress={() => onPress?.(item.id)}>
            {item.icon ? <Image source={item.icon} style={styles.icon} /> : null}
            <Text style={styles.chipText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: METRICS.spacing.lg }}
      />
    </View>
  );
}

const CHIP_H = 72;

const styles = StyleSheet.create({
  wrap: { marginTop: METRICS.spacing.lg },
  row: {
    paddingHorizontal: METRICS.spacing.lg,
    marginBottom: METRICS.spacing.md,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  seeAll: { color: COLORS.textMuted, fontSize: 14, fontWeight: '600' },
  chip: {
    height: CHIP_H, minWidth: 72, paddingHorizontal: 12,
    backgroundColor: COLORS.chip, borderRadius: METRICS.radius.pill,
    alignItems: 'center', justifyContent: 'center',
  },
  chipText: { color: COLORS.text, fontSize: 12, marginTop: 6 },
  icon: { width: 28, height: 28, resizeMode: 'contain' },
});
