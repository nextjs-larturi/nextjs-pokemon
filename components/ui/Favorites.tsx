import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from '../pokemon';

interface Props {
    pokemons: number[];
}

export const Favorites: FC<Props> = ({ pokemons }) => {
   return (
      <Grid.Container gap={2} direction='row' justify='flex-start'>
         {pokemons.map((pokemonId: number) => (
            <FavoriteCardPokemon pokemonId={pokemonId} key={pokemonId}/>
         ))}
      </Grid.Container>
   );
};
