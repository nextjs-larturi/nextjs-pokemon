import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { MainLayout } from '../../components/layouts'
import pokeAPI from '../../api/pokeAPI';
import { Pokemon } from '../../interfaces/pokemon-full';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <MainLayout
        title='Pokemon'
    >
        <Grid.Container css={{ marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={pokemon.name} 
                  width={'100%'}
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>
                <Button
                  color='gradient'
                  ghost
                >
                  <Text transform='uppercase' size={14}>Guardar en favoritos</Text>
                </Button>
              </Card.Header>

              <Card.Body>
                <Text size={25}>Sprites</Text>

                <Container direction='row' display='flex'>
                  <Image 
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </MainLayout>
  )
};


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const allPokemons = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({ params: { id } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };
  const { data } = await pokeAPI.get<Pokemon>(`pokemon/${id}`);
  
  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage;