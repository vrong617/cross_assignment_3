import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View, Text, FlatList, SafeAreaView, StatusBar,
  ActivityIndicator, RefreshControl, StyleSheet, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppHeader from '../components/AppHeader';
import CarCard, { Car } from '../components/CarCard';
import { METRICS } from '../constants/metrics';
import { Api } from '../api';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';
import { useAppSelector } from '../store';
import type { RootStackParamList } from '../../App';

const FOOTER_SPACE = 110;

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = useMemo(() => makeStyles(colors, theme), [colors, theme]);

  const listRef = useRef<FlatList<Car>>(null);

  const favIds = useAppSelector((s) => s.favorites.ids);

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const fetchCars = useCallback(async () => {
    setError(null);
    try {
      const cs = await Api.getCars();
      setCars(cs);
    } catch (e: any) {
      setError(e?.message || 'Failed to load favorites');
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchCars();
      setLoading(false);
    })();
  }, [fetchCars]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCars();
    setRefreshing(false);
  }, [fetchCars]);

  const favItems = useMemo(() => cars.filter((c) => favIds.includes(c.id)), [cars, favIds]);
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return favItems;
    return favItems.filter((c) => {
      const bag = `${c.title} ${c.year} ${c.engine} ${c.transmission}`.toLowerCase();
      return bag.includes(s);
    });
  }, [q, favItems]);

  const openDetails = useCallback(
    (id: string) => {
      const car = items.find((c) => c.id === id);
      if (car) navigation.navigate('CarDetails', { car });
    },
    [items, navigation]
  );

  const goCatalog = useCallback(() => {
    navigation.navigate('Tabs', { screen: 'Catalog' } as any);
  }, [navigation]);

  const keyExtractor = useCallback((i: Car) => i.id, []);

  const listHeader = useMemo(
    () => (
      <View>
        <AppHeader
          title="Favorites"
          searchable
          searchPlaceholder="Search favorites..."
          searchValue={q}
          onSearchChange={setQ}
          onSearchSubmit={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
        />
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={fetchCars} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        )}
        <Text style={styles.header}>{`Favorite cars (${items.length})`}</Text>
      </View>
    ),
    [q, items.length, error, fetchCars, styles]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.muted}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!favItems.length && !error) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={styles.emptyTitle}>No favorites yet.</Text>
          <Text style={styles.emptyText}>Add a car to your favorites from the catalog.</Text>
          <Pressable onPress={goCatalog} style={styles.emptyBtn}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Go to catalog</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
      <FlatList
        ref={listRef}
        data={items}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <CarCard item={item} onPress={openDetails} />}
        ListHeaderComponent={listHeader}
        contentContainerStyle={{ paddingBottom: FOOTER_SPACE }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Text style={styles.muted}>{q ? `No favorites for “${q}”` : 'No favorites'}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors, theme: 'dark' | 'light') =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
    muted: { color: c.onSurface, opacity: 0.6, marginTop: 8 },

    header: {
      color: c.onSurface,
      fontSize: 18,
      fontWeight: '800',
      marginHorizontal: METRICS.spacing.lg,
      marginTop: METRICS.spacing.md,
      marginBottom: METRICS.spacing.sm,
    },

    emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: METRICS.spacing.lg },
    emptyIcon: { fontSize: 40, marginBottom: 10 },
    emptyTitle: { color: c.onSurface, fontSize: 18, fontWeight: '800', marginBottom: 6 },
    emptyText: { color: c.onSurface, opacity: 0.75, textAlign: 'center', marginBottom: 16 },
    emptyBtn: {
      backgroundColor: c.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: METRICS.radius.md,
    },

    errorBox: {
      marginHorizontal: METRICS.spacing.lg,
      marginTop: METRICS.spacing.md,
      padding: METRICS.spacing.md,
      borderRadius: 10,
      backgroundColor: theme === 'dark' ? '#3b1d1d' : '#fde7e7',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme === 'dark' ? '#a94a4a' : '#f19999',
      gap: 8,
    },
    errorText: { color: theme === 'dark' ? '#ffb4b4' : '#8a1a1a' },
    retryBtn: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: theme === 'dark' ? '#a94a4a' : '#d9534f',
    },
    retryText: { color: '#fff', fontWeight: '600' },
  });
