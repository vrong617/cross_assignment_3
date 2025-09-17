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

import { METRICS } from '../constants/metrics';
import AppHeader from '../components/AppHeader';
import HeroCarousel from '../components/HeroCarousel';
import CategoryChips, { Category } from '../components/CategoryChips';
import CarCard, { Car } from '../components/CarCard';

import { Api } from '../api';
import { RootStackParamList } from '../../App';
import { useTheme } from '../theme/ThemeContext';

const FOOTER_SPACE = 110;

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const styles = useMemo(() => makeStyles(colors, theme), [colors, theme]);

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
    [hero, categories, error, fetchAll, styles]
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
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

const makeStyles = (c: ReturnType<typeof useTheme>['colors'], theme: 'dark' | 'light') =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    list: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
    muted: { color: c.onSurface, opacity: 0.6, marginTop: 8 },
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
