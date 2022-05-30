import { useRouter } from 'next/router';
import { MainLayout } from '../../components/layouts'

const PokemonPage = () => {

  const router = useRouter();
  console.log(router.query);

  return (
    <MainLayout
        title='Pokemon'
    >
        <h1>Hola</h1>
    </MainLayout>
  )
}

export default PokemonPage;