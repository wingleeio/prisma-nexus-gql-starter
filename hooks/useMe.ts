import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ME_QUERY = gql`
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
        loading
    }
}