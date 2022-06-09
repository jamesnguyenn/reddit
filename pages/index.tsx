import PostBox from '../components/PostBox';
import Head from '../node_modules/next/head';

export default function Home() {
    return (
        <div className="max-w-5xl my-7 mx-auto">
            <Head>
                <title>Reddit Clone</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* PostBox */}
            <PostBox />

            <div>{/* Feed */}</div>
        </div>
    );
}
