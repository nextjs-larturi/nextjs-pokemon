import {FC} from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
    children: JSX.Element;
    title?: string;
}

export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'} </title>
            <meta name='author' content='Leandro Arturi' />
            <meta name='description' content={`Información sobre el Pokemon ${title}`} />
            <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        </Head>

        <Navbar />

        <main style={{
            padding: '0 20px',
        }}>
            {children}
        </main>
    </>
  )
}
