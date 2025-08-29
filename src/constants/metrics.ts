import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const METRICS = {
  screen: { width, height },
  radius: { lg: 24, md: 16, sm: 8, pill: 50 },
  spacing: { xl: 48, lg: 32, md: 16, sm: 8, xs: 4 },
  shadow: Platform.select({
    ios: { color: '#000', opacity: 0.25, radius: 20, offset: { width: 0, height: 10 } },
    android: { elevation: 6 },
  }),
};
