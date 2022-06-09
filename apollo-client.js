import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://sakassou.stepzen.net/api/pugnacious-numbat/__graphql',
    header: {
        Authorization: `APIKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;
