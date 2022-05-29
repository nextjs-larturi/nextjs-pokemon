import { GetStaticProps } from 'next'
import { NextPage } from 'next';
import pokeAPI from '../api/pokeAPI';
import { MainLayout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
      <MainLayout title='Lista de Pokemon'>
        <ul>
          {
            pokemons.map(pokemon => (
              <li key={pokemon.id}>
                #{pokemon.id} - {pokemon.name}
              </li>
            ))
          }
        </ul>
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
