import {create} from 'zustand';

interface PokemonStore {
  seenPokemons: number[];
  addSeenPokemon: (id: number) => void;
}

const useStore = create<PokemonStore>((set) => ({
  seenPokemons: [],
  addSeenPokemon: (id: number) => set((state) => ({
    seenPokemons: [...state.seenPokemons, id]
  })),
}));

export default useStore;