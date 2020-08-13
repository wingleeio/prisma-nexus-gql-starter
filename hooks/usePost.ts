import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const POSTS_QUERY = gql`
    query PostsQuery {
        posts(last: 3) {
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
    query PostsQuery($before: PostWhereUniqueInput) {
        posts(last: 3, before: $before) {
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
        getMorePosts: (before) => {
            fetchMore({
                query: MORE_POSTS_QUERY,
                variables: { before },
                updateQuery: (prev, { fetchMoreResult }) => {
                    const prevPosts = prev?.posts ?? [];
                    const newPosts = fetchMoreResult?.posts ?? [];

                    return {
                        posts: [...newPosts, ...prevPosts]
                    }
                }
            })
        }
    }
}