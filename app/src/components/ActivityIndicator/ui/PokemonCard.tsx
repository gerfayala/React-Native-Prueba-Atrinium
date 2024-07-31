import {Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Pokemon } from '../../../core/entities/pokemon';
import { Card, Text } from 'react-native-paper';
import { FadeInImage } from './FadeInImage';
import { Link } from 'expo-router';
import useStore from '@/app/src/presentation/hooks/useStore';
import { useTheme } from '@react-navigation/native';


interface Props {
    pokemon: Pokemon;
    isSeen?: boolean;   
}

const PokemonCard = ({pokemon, isSeen}: Props) => {

  const theme = useTheme();
  const defaultColor = theme.colors.primary;

   // Zustand state update
  const addSeenPokemon = useStore((state) => state.addSeenPokemon);

   const handlePress = (id: number) => {
    addSeenPokemon(id);
  };

  return (

    


    <Link
      href = {{
          pathname: `/[pokemonID]`,
          params: { pokemonID: pokemon.id }
      }} 
      asChild
    >
    <Pressable style={{flex: 1}} onPress={() => handlePress(pokemon.id)}>
    
      <Card style ={[styles.cardContainer, {backgroundColor: isSeen ? '#d3d3d3' : defaultColor,}]}>
          <Text style = {styles.name} variant='bodyLarge' lineBreakMode='middle'>
              {pokemon.name}
              {'\n#' + pokemon.id}
          </Text>

      
      {/**PokeBall background image*/}

      <View style = {styles.pokeballContainer}>
          <Image 
              style={styles.pokeball}
              source={require('../../../../../assets/images/pokeball-light.png')}

          />
      </View>


      <FadeInImage 
          uri={ pokemon.avatar}
          style={styles.pokemonImage}
      />
       {/**Types */}
      <Text style = {[styles.name, {marginTop: 35}]}>{pokemon.types[0]}</Text>
      </Card>
    </Pressable>
    </Link>
  )
}


const styles = StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      height: 120,
      flex: 1,
      marginBottom: 25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 3,
    },
    name: {
      color: 'white',
      top: 10,
      left: 10,
    },
    pokeball: {
      width: 100,
      height: 100,
      right: -25,
      top: -25,
      opacity: 0.4,
    },
    pokemonImage: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: -15,
      top: -30,
    },
  
    pokeballContainer: {
      alignItems: 'flex-end',
      width: '100%',
      position: 'absolute',
  
      overflow: 'hidden',
      opacity: 0.5,
    },
  });

export default PokemonCard