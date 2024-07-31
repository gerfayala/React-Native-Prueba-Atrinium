import { FlatList, View,  } from 'react-native'
import React, { useMemo, useState } from 'react'
import { globlalTheme } from './src/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput} from 'react-native-paper';
import Loader from './src/components/ActivityIndicator/Loader';
import PokemonCard from './src/components/ActivityIndicator/ui/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByTypes} from './src/actions/pokemons';
import { getPokemonsByIds,  } from './src/actions/pokemons/get-pokemons-by-ids';
import { useDebouncedValue } from './src/presentation/hooks/useDebouncedValue';
import useStore from './src/presentation/hooks/useStore';
import { Pokemon } from './src/core/entities/pokemon';

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const debouncedValue = useDebouncedValue(term);

   // Zustand
  const seenPokemons = useStore((state) => state.seenPokemons);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  const isTypeSearch = useMemo(() => {
    // Lista de tipos de Pokémon conocidos
    const pokemonTypes = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
    return pokemonTypes.includes(debouncedValue.toLowerCase());
  }, [debouncedValue]);

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue));
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length === 0) return [];
    if (debouncedValue.length < 3 && !isTypeSearch) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLocaleLowerCase())
    );
  }, [debouncedValue, pokemonNameList, isTypeSearch]);

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', isTypeSearch ? debouncedValue : pokemonNameIdList],
    queryFn: () =>
      isTypeSearch
        ? getPokemonsByTypes(debouncedValue.toLowerCase())
        : getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }: { item: Pokemon }) => {
    const isSeen = seenPokemons.includes(item.id);
    return (
     
        <PokemonCard pokemon={item} isSeen={isSeen} />
   
    );
  };

  return (
    <View style={[globlalTheme.globalMargin, { paddingTop: top + 20 }]}>
      <TextInput
        placeholder="Search Pokémon by Name or Type"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
        style={{ backgroundColor: 'transparent', marginBottom: 30 }}
      />

      {isLoadingPokemons && <Loader />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </View>
  );
};

export default SearchScreen;