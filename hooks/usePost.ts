import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const POSTS_QUERY = gql`
    query PostsQuery {
        posts(first: 3, orderBy: { createdAt: desc }) {
            id
            createdAt
            updatedAt
            title
            content
            author {
                id
                username
            }
            community {
                id
                name
            }
        }
    }
`

const MORE_POSTS_QUERY = gql`
    query PostsQuery($after: PostWhereUniqueInput) {
        posts(first: 3, after: $after, orderBy: { createdAt: desc }) {
            id
            createdAt
            updatedAt
            title
            content
            author {
                id
                username
            }
            community {
                id
                name
            }
        }
    }
`

export const usePost = () => {
    const { loading, data, fetchMore } = useQuery(POSTS_QUERY);
    return {
        loading,
        posts: data?.posts,
        getMorePosts: (after) => {
            fetchMore({
                query: MORE_POSTS_QUERY,
                variables: { after },
                updateQuery: (prev, { fetchMoreResult }) => {
                    const prevPosts = prev?.posts ?? [];
                    const newPosts = fetchMoreResult?.posts ?? [];

                    return {
                        posts: [...prevPosts, ...newPosts]
                    }
                }
            })
        }
    }
}