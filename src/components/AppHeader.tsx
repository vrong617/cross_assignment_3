import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { METRICS } from '../constants/metrics';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  showBack?: boolean | 'auto';
  onBackPress?: () => void;
  onActionPress?: () => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (q: string) => void;
  onSearchSubmit?: (q: string) => void;
  onSearchToggle?: (active: boolean) => void;
  initiallyActive?: boolean;
};

const BTN = 36;
const HITSLOP = { top: 8, bottom: 8, left: 8, right: 8 };

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AppHeader({
  title,
  showBack = 'auto',
  onBackPress,
  onActionPress,
  searchable = false,
  searchPlaceholder = 'Search…',
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchToggle,
  initiallyActive = false,
}: Props) {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [active, setActive] = React.useState(!!initiallyActive);
  const [localQ, setLocalQ] = React.useState(searchValue ?? '');
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (searchValue !== undefined) setLocalQ(searchValue);
  }, [searchValue]);

  const canGoBack = navigation?.canGoBack?.() ?? false;
  const shouldShowBack = showBack === 'auto' ? canGoBack : !!showBack;

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
          gap: 8,
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
        searchWrap: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 10,
          height: BTN,
        },
        searchInput: {
          flex: 1,
          color: colors.onSurface,
          fontSize: 16,
          fontWeight: '600',
          paddingVertical: 0,
        },
        searchClear: {
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        searchClearTx: { color: colors.onSurface, opacity: 0.6, fontSize: 16 },

        titleWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      }),
    [colors]
  );

  const enterSearch = React.useCallback(() => {
    if (!searchable) {
      onActionPress?.();
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(true);
    onSearchToggle?.(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onActionPress, onSearchToggle, searchable]);

  const exitSearch = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(false);
    onSearchToggle?.(false);
  }, [onSearchToggle]);

  const handleBack = React.useCallback(() => {
    if (active) {
      exitSearch();
      return;
    }
    if (onBackPress) return onBackPress();
    if (canGoBack) navigation.goBack();
    else navigation.navigate('Home');
  }, [active, exitSearch, onBackPress, canGoBack, navigation]);

  const handleChange = React.useCallback(
    (t: string) => {
      setLocalQ(t);
      onSearchChange?.(t);
    },
    [onSearchChange]
  );

  const handleSubmit = React.useCallback(() => {
    onSearchSubmit?.(localQ);
  }, [localQ, onSearchSubmit]);

  const handleClear = React.useCallback(() => {
    handleChange('');
    inputRef.current?.focus();
  }, [handleChange]);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel={active ? 'Close search' : 'Go back'}
        hitSlop={HITSLOP}
      >
        <Text style={styles.iconText}>{active ? '×' : '‹'}</Text>
      </TouchableOpacity>
      {active ? (
        <View style={styles.searchWrap}>
          <TextInput
            ref={inputRef}
            value={localQ}
            onChangeText={handleChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.onSurface + '66'}
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSubmit}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!!localQ && (
            <TouchableOpacity onPress={handleClear} style={styles.searchClear} hitSlop={HITSLOP}>
              <Text style={styles.searchClearTx}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}
      {searchable ? (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={enterSearch}
          accessibilityRole="button"
          accessibilityLabel="Search"
          hitSlop={HITSLOP}
        >
          <Text style={styles.actionText}>⌕</Text>
        </TouchableOpacity>
      ) : onActionPress ? (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onActionPress}
          accessibilityRole="button"
          accessibilityLabel="Action"
          hitSlop={HITSLOP}
        >
          <Text style={styles.actionText}>⋯</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: BTN, height: BTN }} />
      )}
    </View>
  );
}
