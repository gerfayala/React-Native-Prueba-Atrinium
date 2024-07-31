import { getPokemonByID } from '.';
import { Pokemon } from '../../core/entities/pokemon'; 




export const getPokemonsByIds = async(ids: number[]): Promise<Pokemon[]> => {

  try {
    
    const pokemonPromises: Promise<Pokemon>[] = ids.map( id => {
      return getPokemonByID(id);
    } )

    return Promise.all( pokemonPromises );


  } catch (error) {
    throw new Error(`Error getting pokemons by ids: ${ids}`);
  }



}