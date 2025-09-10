import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  ListRenderItemInfo,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';

import AppHeader from '../components/AppHeader';
import HeroCarousel from '../components/HeroCarousel';
import CategoryChips, { Category } from '../components/CategoryChips';
import CarCard, { Car } from '../components/CarCard';

import { Api } from '../api';
import { RootStackParamList } from '../../App';

const FOOTER_SPACE = 110;

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hero, setHero] = useState<{ id: string; src: any }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const [h, c, cs] = await Promise.all([
        Api.getHero(),
        Api.getCategories(),
        Api.getCars(),
      ]);
      setHero(h);
      setCategories(c);
      setCars(cs);
    } catch (e: any) {
      const msg = e?.message || 'Failed to load data (network?)';
      setError(msg);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, [fetchAll]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  }, [fetchAll]);

  const handleCarPress = useCallback(
    (id: string) => {
      const car = cars.find(c => c.id === id);
      if (car) navigation.navigate('CarDetails', { car });
    },
    [cars, navigation]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Car>) => (
      <CarCard item={item} onPress={handleCarPress} />
    ),
    [handleCarPress]
  );

  const keyExtractor = useCallback((i: Car) => i.id, []);

  const listHeader = useMemo(
    () => (
      <View>
        <AppHeader title="Car from USA" onActionPress={() => {}} />
        <View style={{ paddingHorizontal: METRICS.spacing.lg }}>
          <HeroCarousel items={hero} />
        </View>
        <CategoryChips items={categories} onPress={() => {}} />
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={fetchAll} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        )}
      </View>
    ),
    [hero, categories, error, fetchAll]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.muted}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={cars}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          contentContainerStyle={{ paddingBottom: FOOTER_SPACE }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !error ? (
              <View style={styles.empty}>
                <Text style={styles.muted}>No cars found</Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  list: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  muted: { color: '#9aa0a6', marginTop: 8 },
  empty: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    marginHorizontal: METRICS.spacing.lg,
    marginTop: METRICS.spacing.md,
    padding: METRICS.spacing.md,
    borderRadius: 10,
    backgroundColor: '#3b1d1d',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#a94a4a',
    gap: 8,
  },
  errorText: { color: '#ffb4b4' },
  retryBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#a94a4a',
  },
  retryText: { color: 'white', fontWeight: '600' },
});
