import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PaperProvider, MD3DarkTheme,MD3LightTheme, adaptNavigationTheme} from 'react-native-paper'
import { useColorScheme } from 'react-native'
import { Colors } from '../app/src/theme/colors/Colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";


const queryClient = new QueryClient() 

const PrincipalLayout = () => {

  const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
  
  const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
  
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedLightTheme = merge(LightTheme, customLightTheme);
  
  const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);


  const colorScheme = useColorScheme();

  const paperTheme =
      colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  


  return (

    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Stack >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[pokemonID]" options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default PrincipalLayout;