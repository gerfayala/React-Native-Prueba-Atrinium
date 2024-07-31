import { pokeApi } from '../../config/api/pokeApi';
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokeApi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';


export const getPokemonsByTypes = async (type: string) => {
  try {
    const url = `type/${type}`;
    const { data } = await pokeApi.get(url);

    // Obtener detalles de los Pokémon
    const filteredPokemons = await Promise.all(
      //mostrar solamente los primeros 15, como es prueba, evitar hacer muchas peticiones
      data.pokemon.slice(0, 15).map(async (info: { pokemon: { name: string; }; }) => {
        const pokemonDetailUrl = `pokemon/${info.pokemon.name}`;
        const response = await pokeApi.get<PokeAPIPokemon>(pokemonDetailUrl);
        return PokemonMapper.pokeApiPokemonToEntity(response.data);
      })
    );

    return filteredPokemons;
  } catch (error) {
    console.error('Error fetching Pokémon by types:', error);
    throw error;
  }
};