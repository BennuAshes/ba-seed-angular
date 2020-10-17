import { gql } from 'apollo-angular';

export const todoQuery = gql`
    query Query {
        todos {
            id
            name
            description
            isCompleted
            isEditMode @client
        }
    }
`;