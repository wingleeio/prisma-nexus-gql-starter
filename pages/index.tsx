import Head from 'next/head'
import { useMe } from '../hooks/useMe';

type FormData = {
  title: string;
}

export default function Home() {
  const { user } = useMe();

  return (
    <div>
      <Head>
        <title>Communities</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      </main>
    </div>
  )
}
