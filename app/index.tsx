import { View,StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getPokemons } from './src/actions/pokemons'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import PokeballBg from './src/components/ActivityIndicator/ui/PokeballBg'
import { globlalTheme } from './src/theme/global-theme'
import PokemonCard from './src/components/ActivityIndicator/ui/PokemonCard'
import { FAB, Text } from 'react-native-paper'
import { Link } from 'expo-router'
import useStore from './src/presentation/hooks/useStore'
import { Pokemon } from './src/core/entities/pokemon'
import Loader from './src/components/ActivityIndicator/Loader'


const index = () => {

  const queryClient = useQueryClient();

  const { top } = useSafeAreaInsets();

  // Zustand
  const seenPokemons = useStore((state) => state.seenPokemons);

  // infinite scroll

  const {isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      try {
        const pokemonData = await getPokemons(params.pageParam);
        pokemonData.forEach(pokemon => {
          queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
        });
        return pokemonData;
      } catch (error) {
        throw new Error('Error getting pokemons');
      }
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, //60 minutes
    
  })


  const renderItem = ({ item }: { item: Pokemon }) => {
    const isSeen = seenPokemons.includes(item.id);
    return (
     
        <PokemonCard pokemon={item} isSeen={isSeen} />
   
    );
  };

 


  return (
    


      <View  style={globlalTheme.globalMargin}>
        {isLoading && <Loader />}
        <PokeballBg style={styles.imgPosition} />
        <FlatList 
          data={data?.pages.flat() ?? []}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style= {{marginTop: top + 20}}
          ListHeaderComponent={() => (
            <Text style={{fontSize: 30}}>German PokeApp</Text>
          )}
          renderItem={renderItem}
          onEndReachedThreshold={0.6}
          onEndReached={ () => fetchNextPage() }
        />

        <Link 
           href = {{
            pathname: `/SearchScreen`,
        }} 
        asChild
        >
            <FAB 
              icon = 'database-search'
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
              }}
              mode='elevated'
            />
        </Link>
      </View>
  )
}


const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }

})

export default index
