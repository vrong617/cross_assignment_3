import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { METRICS } from '../constants/metrics';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  showBack?: boolean | 'auto';
  onBackPress?: () => void;
  onActionPress?: () => void;
};

const BTN = 36;
const HITSLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export default function AppHeader({
  title,
  showBack = 'auto',
  onBackPress,
  onActionPress,
}: Props) {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: METRICS.spacing.lg,
          paddingTop: METRICS.spacing.lg,
          paddingBottom: METRICS.spacing.md,
          backgroundColor: colors.bg,
        },
        title: {
          flex: 1,
          color: colors.onSurface,
          fontSize: 22,
          fontWeight: '800',
          textAlign: 'center',
        },
        slot: { width: BTN, height: BTN },
        iconBtn: {
          width: BTN,
          height: BTN,
          borderRadius: BTN / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
        },
        iconText: {
          color: colors.onSurface,
          fontSize: 28,
          fontWeight: '700',
          lineHeight: 28,
        },
        actionText: {
          color: colors.onSurface,
          fontSize: 20,
          fontWeight: '800',
          lineHeight: 20,
        },
      }),
    [colors]
  );

  const canGoBack = navigation?.canGoBack?.() ?? false;
  const shouldShowBack = showBack === 'auto' ? canGoBack : !!showBack;

  const handleBack = () => {
    if (onBackPress) return onBackPress();
    if (canGoBack) navigation.goBack();
    else navigation.navigate('Home');
  };

  return (
    <View style={styles.wrap}>
      {shouldShowBack ? (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={HITSLOP}
        >
          <Text style={styles.iconText}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.slot} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {onActionPress ? (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onActionPress}
          accessibilityRole="button"
          accessibilityLabel="Search"
          hitSlop={HITSLOP}
        >
          <Text style={styles.actionText}>⌕</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.slot} />
      )}
    </View>
  );
}
