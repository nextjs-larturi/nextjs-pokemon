import pokeAPI from '../api/pokeAPI';
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {

    const { data } = await pokeAPI.get<Pokemon>(`pokemon/${nameOrId}`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
    }
}