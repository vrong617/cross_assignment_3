import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants/colors';
import { METRICS } from '../constants/metrics';
import AppHeader from '../components/AppHeader';
import HeroCarousel from '../components/HeroCarousel';
import CategoryChips, { Category } from '../components/CategoryChips';
import CarCard, { Car } from '../components/CarCard';
import FloatingFooter, { TabKey } from '../components/FloatingFooter';

const hero = [
  { id: '1', src: require('../assets/img/home1.png') },
  { id: '2', src: require('../assets/img/home2.png') },
  { id: '3', src: require('../assets/img/home3.png') },
];

const categories: Category[] = [
  { id: 'bmw', title: 'BMW', icon: require('../assets/img/brands/bmw.png') },
  { id: 'audi', title: 'AUDI', icon: require('../assets/img/brands/audi.png') },
  { id: 'vw', title: 'VW', icon: require('../assets/img/brands/vw.png') },
  { id: 'toyota', title: 'TOYOTA', icon: require('../assets/img/brands/toyota.png') },
  { id: 'ford', title: 'FORD', icon: require('../assets/img/brands/ford.png') },
];

const cars: Car[] = [
  {
    id: 'car1',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Gas 2.4',
    transmission: 'Automat',
    image: require('../assets/img/cars/tiguan.jpg'),
  },
  {
    id: 'car2',
    title: 'Volkswagen Tiguan 2020',
    price: '$29 000',
    year: '2020',
    mileage: '24000',
    engine: 'Gas 2.4',
    transmission: 'Automat',
    image: require('../assets/img/cars/tiguan.jpg'),
  },
];

const FOOTER_SPACE = 110;

export default function HomeScreen({ navigation }: any) {
  const onTabPress = (key: TabKey) => {
    // if (key === 'Catalog') navigation?.navigate?.('Catalog');
    // if (key === 'Profile') navigation?.navigate?.('Profile');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          ListHeaderComponent={
            <View>
              <AppHeader title="Turnkey car from America" />
              <View style={{ paddingHorizontal: METRICS.spacing.lg }}>
                <HeroCarousel items={hero} />
              </View>
              <CategoryChips items={categories} onPress={(id) => {  }} />
            </View>
          }
          data={cars}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <CarCard item={item} onPress={(id) => {  }} />
          )}
          contentContainerStyle={{ paddingBottom: FOOTER_SPACE }}
          showsVerticalScrollIndicator={false}
        />
        <FloatingFooter active="Home" onPress={onTabPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  list: { flex: 1 },
});
