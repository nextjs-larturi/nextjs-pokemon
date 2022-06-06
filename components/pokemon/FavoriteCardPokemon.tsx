/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';
import {getPokemonInfo} from '../../utils';

interface Props {
    pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({pokemonId}) => {

   const router = useRouter();

   const [hasImage, setHasImage] = useState(true);

   useEffect(() => {
      checkIfFavoriteHasImage();
   }, []);
   

   const onFavoriteClicked = () => {
     const pokemon = getPokemonInfo(pokemonId.toString()).then(pokemon => {
        if (pokemon!.name) {
         router.push(`/pokemon/${pokemon!.name}`);
        } else {
         router.push('/');
        }
     });
   }

   const checkIfFavoriteHasImage = () => {
       const pokemon = getPokemonInfo(pokemonId.toString()).then(pokemon => {
         if (pokemon?.sprites.other?.dream_world?.front_default) {
            setHasImage(true);
            return true;
         }
         setHasImage(false);
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
                  src={ hasImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg` : '/img/no-image.png'}
                  alt='pokemon'
                  width={'100%'}
                  height={140}
               />
            </Card.Body>
         </Card>
      </Grid>
   );
};
