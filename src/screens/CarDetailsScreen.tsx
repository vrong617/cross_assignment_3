import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, Pressable } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import IconLabel from '../components/IconLabel';
import { Car } from '../components/CarCard';
import { METRICS } from '../constants/metrics';
import { RootStackParamList } from '../../App';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/palette';

import { useAppDispatch, useAppSelector } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';

export type CarDetailsParams = { car: Car };
type CarDetailsRoute = RouteProp<RootStackParamList, 'CarDetails'>;

const IMG_H = 240;

export default function CarDetailsScreen() {
  const route = useRoute<CarDetailsRoute>();
  const car = route.params?.car;

  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!car) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
        <AppHeader title="Car details" showBack="auto" />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>No car data provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.ids.includes(car.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
      <AppHeader title={car.title} showBack="auto" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ position: 'relative' }}>
          <Image source={car.image} style={styles.img} resizeMode="cover" />
          <View style={styles.favWrap}>
            <Pressable
              onPress={() => dispatch(toggleFavorite(car.id))}
              hitSlop={8}
              style={[styles.favBtn, isFav && styles.favBtnActive]}
            >
              <Text style={[styles.favIcon, isFav ? styles.favIconActive : styles.favIconInactive]}>
                {isFav ? '★' : '☆'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>{car.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{car.price}</Text>
            <View style={styles.priceSpacer} />
            <View style={[styles.favPill, isFav ? styles.favPillActive : styles.favPillInactive]}>
              <Text style={[styles.favPillText, isFav ? styles.favPillTextActive : styles.favPillTextInactive]}></Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <IconLabel icon="📅" text={`${car.year} y.`} />
            <IconLabel icon="🛞" text={`${car.mileage} km`} />
          </View>
          <View style={[styles.row, { marginTop: 8 }]}>
            <IconLabel icon="⛽️" text={car.engine} />
            <IconLabel icon="⚙️" text={car.transmission} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    content: { paddingBottom: 24 },
    img: { width: '100%', height: IMG_H },
    favWrap: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
    },
    favBtn: {
      backgroundColor: c.surface,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    favBtnActive: {
      backgroundColor: c.primary + '22',
      borderColor: c.primary,
    },
    favIcon: { fontSize: 20, lineHeight: 22 },
    favIconInactive: { color: c.onSurface },
    favIconActive: { color: c.primary },

    card: {
      backgroundColor: c.surface,
      margin: METRICS.spacing.lg,
      padding: METRICS.spacing.md,
      borderRadius: METRICS.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.border,
    },

    title: { color: c.onSurface, fontSize: 18, fontWeight: '800', marginBottom: 6 },

    priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    price: { color: c.primary, fontSize: 18, fontWeight: '800' },
    priceSpacer: { flex: 1 },
    favPill: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
    },
    favPillInactive: {
      backgroundColor: c.surface,
      borderColor: c.border,
    },
    favPillActive: {
      backgroundColor: c.primary + '22',
      borderColor: c.primary,
    },
    favPillText: { fontSize: 12, fontWeight: '700' },
    favPillTextInactive: { color: c.onSurface, opacity: 0.8 },
    favPillTextActive: { color: c.primary },

    divider: { height: 1, backgroundColor: c.border, marginVertical: 8, marginBottom: 16 },

    row: { flexDirection: 'row', justifyContent: 'space-between' },

    fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: METRICS.spacing.lg },
    fallbackText: { color: c.onSurface, opacity: 0.7, fontSize: 16, textAlign: 'center' },
  });
