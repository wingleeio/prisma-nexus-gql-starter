import Head from 'next/head'
import { useMe } from '../hooks/useMe';
import { usePost } from '../hooks/usePost';
import { Button } from 'antd';

export default function Home() {
    const { user } = useMe();
    const { posts, getMorePosts } = usePost();

    return (
        <div>
            <Head>
                <title>Communities</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Button onClick={() => { getMorePosts({ id: posts?.[0]?.id }) }}>Load More</Button>
            </main>
        </div>
    )
}
