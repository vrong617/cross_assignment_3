import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const scale = (n: number) => Math.round(n * (width / 390));

export const TYPO = {
  h1: { size: scale(34), lineHeight: scale(40), weight: '800' as const, letterSpacing: -0.3 },
  body: { size: scale(14), lineHeight: scale(20) },
  cta: { size: scale(17), weight: '700' as const },
};
