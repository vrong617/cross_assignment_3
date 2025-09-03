import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CarDetailsScreen, { CarDetailsParams } from './src/screens/CarDetailsScreen';

import FloatingFooter, { TabKey } from './src/components/FloatingFooter';

export type RootTabParamList = {
  Home: undefined;
  Catalog: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  CarDetails: CarDetailsParams;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const active = state.routeNames[state.index] as TabKey;
  const onPress = (key: TabKey) => navigation.navigate(key as never);
  return <FloatingFooter active={active} onPress={onPress} />;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
