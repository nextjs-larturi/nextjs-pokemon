import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';
import {getPokemonInfo} from '../../utils';

interface Props {
    pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({pokemonId}) => {

   const router = useRouter();

   const onFavoriteClicked = () => {
     const pokemon = getPokemonInfo(pokemonId.toString()).then(pokemon => {
        if (pokemon!.name) {
         router.push(`/pokemon/${pokemon!.name}`);
        } else {
         router.push('/');
        }
     });
   } 

   return (
      <Grid key={pokemonId} xs={6} sm={3} md={2} xl={1}>
         <Card
            hoverable
            clickable
            onClick={onFavoriteClicked}
            css={{
               padding: 10,
            }}
         >
            <Card.Body>
               <Card.Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg` || '/img/no-image.png'}
                  alt='pokemon'
                  width={'100%'}
                  height={140}
               />
            </Card.Body>
         </Card>
      </Grid>
   );
};
