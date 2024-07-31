import { getPokemonByID } from "@/app/src/actions/pokemons";


describe('app/src/actions/pokemons', () => {
    test('getPokemonById should return a pokemon name', async () => { 
        
        //Arrange
        const pokemonId = 1;


        //Act
        const pokemon = await getPokemonByID(pokemonId);
        

        //Assert
        expect(pokemon.name).toBe('bulbasaur');
    });

    test('getPokemonById should throw an error if pokemon does not exist', async () => {
        //Arrange
        const pokemonId = 9999;

        //Act
        await expect(getPokemonByID(pokemonId)).rejects.toThrow(`Error getting pokemon by id ${pokemonId}`);
    });
});