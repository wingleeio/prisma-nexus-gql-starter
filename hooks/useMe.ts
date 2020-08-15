import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const ME_QUERY = gql`
    query MeQuery{
        me {
            id
            username
            email
            joined
            role
        }
    }
`

export const useMe = () => {
    const { loading, data } = useQuery(ME_QUERY);

    return {
        user: data?.me,
        loggedIn: Boolean(data?.me?.id),
        loading
    }
}