import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Add Palette',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BarcodeScanner"
        options={{
          title: 'Barcode Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'barcode' : 'barcode-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ShowPalletsScreen"
        options={{
          title: 'Pallets',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'reader' : 'reader-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
