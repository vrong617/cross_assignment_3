import 'react-native-gesture-handler';
import * as React from 'react';
import { useMemo } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CarDetailsScreen, { CarDetailsParams } from './src/screens/CarDetailsScreen';

import FloatingFooter, { TabKey } from './src/components/FloatingFooter';

import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

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

function AppInner() {
  const { theme, colors } = useTheme();
  const navTheme: NavTheme = useMemo(() => {
    const base = theme === 'dark' ? NavDarkTheme : NavDefaultTheme;
    return {
      ...base,
      dark: theme === 'dark',
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.bg,
        card: colors.surface,
        text: colors.onSurface,
        border: colors.border,
        notification: colors.primary,
      },
    };
  }, [theme, colors]);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
