import { useState, useEffect } from 'react';
import { MainLayout } from "../../components/layouts";
import { NoFavorites, Favorites } from "../../components/ui";
import { pokemons } from '../../utils';

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

export default FavoritesPage;
