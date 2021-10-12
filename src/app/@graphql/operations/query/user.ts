import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/result-info';
import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';

export const LOGIN_QUERY = gql`
    query getLogin($email: String!, $password: String!, $include: Boolean!){
        login(email: $email, password: $password){
            status
            message
            token
            user{
                ...UserObject
            }
        }
    }
    ${USER_FRAGMENT}
`;

export const USERS_LIST_QUERY = gql`
    query userList($include: Boolean!, $page: Int, $itemsPage: Int){
        users (page: $page, itemsPage: $itemsPage){
            info{
                ...ResultInfoObject
            }
            status
            message
            users{
                ...UserObject
            }
        }
    }
    ${USER_FRAGMENT}
    ${RESULT_INFO_FRAGMENT}
`;


export const ME_DATA_QUERY = gql`
    query meData($include: Boolean!){
        me{
            status
            message
            user{
                ...UserObject
            }
        }
    }
    ${USER_FRAGMENT}
`;
