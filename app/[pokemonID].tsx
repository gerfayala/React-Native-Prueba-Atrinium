import { View, FlatList, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getPokemonByID } from './src/actions/pokemons';
import Loader from './src/components/ActivityIndicator/Loader';
import { Chip, Text } from 'react-native-paper';
import { FadeInImage } from './src/components/ActivityIndicator/ui/FadeInImage';
import { Formatter } from './src/config/helpers/Formatter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const pokemonID = ({}) => {


  const {top} = useSafeAreaInsets();

  const pokeballImg = require('../assets/images/pokeball-light.png');



  const {pokemonID} = useLocalSearchParams();

  const pokemonId = Number(pokemonID)


  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonID],
    queryFn: () => getPokemonByID(pokemonId),
    staleTime: 1000 * 60 * 60, //60 minutes
  
  })


  if(!pokemon) {
    return (
        <Loader />
    )
}



  return (
    <ScrollView
      style={ { flex: 1,} }
      bounces={ false }
      showsVerticalScrollIndicator={ false }>
    {/* Header Container */ }
    <View style={ styles.headerContainer }>
      {/* Nombre del Pokemon */ }
      <Text
        style={ {
          ...styles.pokemonName,
          top: top + 5,
        } }>
        { Formatter.capitalize( pokemon.name ) + '\n' }#{ pokemon.id }
      </Text>
  
      {/* Pokeball */ }
      <Image source={ pokeballImg } style={ styles.pokeball } />
  
      <FadeInImage uri={ pokemon.avatar } style={ styles.pokemonImage } />
    </View>
  
    {/* Types */ }
    <View
      style={ { flexDirection: 'row', marginHorizontal: 20, marginTop: 10 } }>
      { pokemon.types.map( type => (
        <Chip
          key={ type }
          mode="outlined"
          style={ { marginLeft: 10 } }>
          { type }
        </Chip>
      ) ) }
    </View>
  
    {/* Sprites */ }
    <FlatList
      data={ pokemon.sprites }
      horizontal
      keyExtractor={ item => item }
      showsHorizontalScrollIndicator={ false }
      centerContent
      style={ {
        marginTop: 20,
        height: 100,
      } }
      renderItem={ ( { item } ) => (
        <FadeInImage
          uri={ item }
          style={ { width: 100, height: 100, marginHorizontal: 5 } }
        />
      ) }
    />

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip style={{marginHorizontal: 6}} >{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>

      <FlatList
        data={pokemon.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip style={{marginHorizontal: 6}}>{Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={{height: 100}} />
  
  
    <View style={ { height: 100 } } />
  </ScrollView>
  )
}


const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 1000,
      borderBottomLeftRadius: 1000,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20,
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.7,
    },
    pokemonImage: {
      width: 240,
      height: 240,
      position: 'absolute',
      bottom: -40,
    },
    loadingIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginVertical: 20,
    },
    statsContainer: {
      flexDirection: 'column',
      marginHorizontal: 20,
      alignItems: 'center',
    },

    })

export default pokemonID;