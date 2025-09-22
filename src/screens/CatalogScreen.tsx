import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CarCard, { Car } from '../components/CarCard';
import { METRICS } from '../constants/metrics';
import AppHeader from '../components/AppHeader';
import { RootStackParamList } from '../../App';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';
import { Api } from '../api';

const FOOTER_SPACE = 100;

export default function CatalogScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [q, setQ] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setError(null);
    try {
      const cs = await Api.getCars();
      setCars(cs);
    } catch (e: any) {
      setError(e?.message || 'Failed to load cars');
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

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? cars.filter(i => i.title.toLowerCase().includes(s)) : cars;
  }, [q, cars]);

  const onCardPress = useCallback(
    (id: string) => {
      const car = items.find(i => i.id === id);
      if (!car) return;
      navigation.navigate('CarDetails', { car });
    },
    [items, navigation]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <ActivityIndicator color={colors.primary} />
          <Text style={{ color: colors.onSurface, opacity: 0.6 }}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
      <AppHeader title="All cars" showBack onActionPress={() => {}} />

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={fetchCars} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

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
        renderItem={({ item }) => <CarCard item={item} onPress={onCardPress} />}
        ListEmptyComponent={<Text style={styles.empty}>Nothing found</Text>}
        ListFooterComponent={<View style={{ height: FOOTER_SPACE }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.search}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Volkswagen"
        placeholderTextColor={colors.onSurface + '66'}
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

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: c.bg },
    listContent: {
      paddingTop: METRICS.spacing.lg,
      paddingBottom: FOOTER_SPACE + METRICS.spacing.lg,
    },

    hint: {
      color: c.onSurface,
      opacity: 0.6,
      fontSize: 14,
      marginHorizontal: METRICS.spacing.lg,
      marginBottom: METRICS.spacing.sm,
    },

    search: {
      position: 'relative',
      marginHorizontal: METRICS.spacing.lg,
      marginBottom: METRICS.spacing.md,
      borderRadius: METRICS.radius.md,
      backgroundColor: c.surface,
      paddingLeft: METRICS.spacing.md,
      paddingRight: 44,
      paddingVertical: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },
    searchInput: {
      color: c.onSurface,
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
    clearTx: { color: c.onSurface, opacity: 0.6, fontSize: 16 },

    sectionTitle: {
      color: c.onSurface,
      fontSize: 16,
      fontWeight: '800',
      marginHorizontal: METRICS.spacing.lg,
      marginBottom: METRICS.spacing.sm,
      marginTop: 4,
    },

    empty: {
      color: c.onSurface,
      opacity: 0.7,
      textAlign: 'center',
      marginTop: 32,
    },
    errorBox: {
      marginHorizontal: METRICS.spacing.lg,
      marginTop: METRICS.spacing.md,
      padding: METRICS.spacing.md,
      borderRadius: 10,
      backgroundColor: '#fde7e7',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#f19999',
      gap: 8,
    },
    errorText: { color: '#8a1a1a' },
    retryBtn: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: '#d9534f',
    },
    retryText: { color: '#fff', fontWeight: '600' },
  });
