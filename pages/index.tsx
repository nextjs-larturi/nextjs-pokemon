import { GetStaticProps, NextPage } from 'next'
import { Card, Grid, Text, Row } from '@nextui-org/react';
import pokeAPI from '../api/pokeAPI';
import { MainLayout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
      <MainLayout title='Lista de Pokemon'>
        <Grid.Container gap={2} justify='flex-start'>
          {
            pokemons.map(pokemon => (
              <Grid  
                key={pokemon.id}
                xs={6} sm={3} md={2} xl={1}
              >
                <Card hoverable clickable>
                  <Card.Body css={{ p: 1 }}>
                    <Card.Image 
                      style={{ paddingTop: '15px' }}
                      src={pokemon.img}
                      width='100%'
                      height={140}
                      alt={pokemon.name}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Row justify='space-between'>
                      <Text transform='capitalize'>{[pokemon.name]}</Text>
                      <Text>#{[pokemon.id]}</Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
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
