import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CatalogScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.tx}>Catalog</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  tx: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
