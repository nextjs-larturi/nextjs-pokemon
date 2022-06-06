import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { MainLayout } from "../../components/layouts";
import { NoFavorites, Favorites } from "../../components/ui";
import { getPokemonInfo, pokemons } from '../../utils';

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(pokemons)
  }, []);

  return (
      <MainLayout title='Favoritos'>
        {
          favoritePokemons.length == 0 ? 
          <NoFavorites /> : 
          <Favorites pokemons={favoritePokemons} />
        }
      </MainLayout>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  console.log(43);

  // const { id } = params as { id: string };

  const pokemon = await getPokemonInfo('1');

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      pokemon
    },
    revalidate: 86400, //60 * 60 * 24 (24 hours)
  }
}



export default FavoritesPage;
