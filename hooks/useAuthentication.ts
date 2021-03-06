import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useEffect } from 'react';
import { ME_QUERY } from './useMe';

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username password: $password) {
            token
        }
    }
`

const update = (_, { data, }) => {
    localStorage.setItem('communitiesToken', data?.login?.token ?? data?.register?.token)
}

export const useAuthentication = () => {
    const [login, { loading: loading1 }] = useMutation(LOGIN_USER, { update });
    const [register, { loading: loading2 }] = useMutation(REGISTER_USER, { update });

    return {
        login: variables => {
            login({ variables, refetchQueries: [{ query: ME_QUERY }] })
        },
        register: variables => {
            register({ variables, refetchQueries: [{ query: ME_QUERY }] })
        },
        loading: loading1 || loading2
    }
}