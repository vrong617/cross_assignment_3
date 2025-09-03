import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CarCard, { Car } from '../components/CarCard';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';
import AppHeader from '../components/AppHeader';
import { RootStackParamList } from '../../App';

const FOOTER_SPACE = 100;

const DATA: Car[] = [
  {
    id: '1',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Gas 2.4',
    transmission: 'Automat',
    image: require('../assets/img/home2.png'),
  },
  {
    id: '2',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Бензин 2.4',
    transmission: 'Automat',
    image: require('../assets/img/home2.png'),
  },
  {
    id: '3',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Gas 2.4',
    transmission: 'Automat',
    image: require('../assets/img/home2.png'),
  },
];

export default function CatalogScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [q, setQ] = useState('Volkswagen');

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? DATA.filter(i => i.title.toLowerCase().includes(s)) : DATA;
  }, [q]);

  const onCardPress = useCallback((id: string) => {
    const car = items.find(i => i.id === id);
    if (!car) return;
    navigation.navigate('CarDetails', { car });
  }, [items, navigation]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader
        title="All cars"
        showBack
        onActionPress={() => {}}
      />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.hint}>Search results by product name …</Text>
            <SearchBar value={q} onChangeText={setQ} onClear={() => setQ('')} />
            <Text style={styles.sectionTitle}>Search result</Text>
          </>
        }
        renderItem={({ item }) => (
          <CarCard item={item} onPress={onCardPress} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nothing found</Text>
        }
        ListFooterComponent={<View style={{ height: FOOTER_SPACE }} />}
      />
    </SafeAreaView>
  );
}

function SearchBar({
  value,
  onChangeText,
  onClear,
}: {
  value: string;
  onChangeText: (t: string) => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.search}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Volkswagen"
        placeholderTextColor="#9FB3C2"
        style={styles.searchInput}
      />
      {!!value && (
        <Pressable onPress={onClear} style={styles.clear}>
          <Text style={styles.clearTx}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  listContent: {
    paddingTop: METRICS.spacing.lg,
    paddingBottom: FOOTER_SPACE + METRICS.spacing.lg,
  },

  hint: {
    color: '#9FB3C2',
    fontSize: 14,
    marginHorizontal: METRICS.spacing.lg,
    marginBottom: METRICS.spacing.sm,
  },

  search: {
    position: 'relative',
    marginHorizontal: METRICS.spacing.lg,
    marginBottom: METRICS.spacing.md,
    borderRadius: METRICS.radius.md,
    backgroundColor: COLORS.card,
    paddingLeft: METRICS.spacing.md,
    paddingRight: 44,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.stroke ?? COLORS.divider,
  },
  searchInput: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  clear: {
    position: 'absolute',
    right: 8,
    top: 8,
    bottom: 8,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  clearTx: { color: '#9FB3C2', fontSize: 16 },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: METRICS.spacing.lg,
    marginBottom: METRICS.spacing.sm,
    marginTop: 4,
  },

  empty: {
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 32,
  },
});
