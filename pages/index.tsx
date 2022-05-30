import { GetStaticProps, NextPage } from 'next'
import {Grid } from '@nextui-org/react';
import pokeAPI from '../api/pokeAPI';
import { MainLayout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
      <MainLayout title='Lista de Pokemon'>
        <Grid.Container gap={2} justify='flex-start'>
          {
            pokemons.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </Grid.Container>
      </MainLayout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeAPI.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage;
