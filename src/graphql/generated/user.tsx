import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CurrentUserQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CurrentUserQuery = { __typename?: 'query_root', userByPk?: { __typename?: 'User', id: string, email?: string | null | undefined, username?: string | null | undefined, name?: string | null | undefined, avatar?: string | null | undefined, bio?: string | null | undefined, website?: string | null | undefined, twitterUserName?: string | null | undefined } | null | undefined };

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  bio?: Types.InputMaybe<Types.Scalars['String']>;
  name: Types.Scalars['String'];
  twitterUserName?: Types.InputMaybe<Types.Scalars['String']>;
  website?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateUserByPkMutation = { __typename?: 'mutation_root', updateUserByPk?: { __typename?: 'User', id: string } | null | undefined };

export type UpdateUserFieldsMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  email: Types.Scalars['String'];
  name: Types.Scalars['String'];
  username: Types.Scalars['String'];
}>;


export type UpdateUserFieldsMutation = { __typename?: 'mutation_root', updateUserByPk?: { __typename?: 'User', id: string } | null | undefined };

export type UserDashboardProjectsQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type UserDashboardProjectsQuery = { __typename?: 'query_root', userByPk?: { __typename?: 'User', id: string, projects: Array<{ __typename?: 'Project', id: string, name: string, domain: string, createdAt: string, pages: Array<{ __typename?: 'Page', id: string, title?: string | null | undefined, url: string }> }> } | null | undefined };


export const CurrentUserDocument = gql`
    query currentUser($id: uuid!) {
  userByPk(id: $id) {
    id
    email
    username
    name
    avatar
    bio
    website
    twitterUserName
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const UpdateUserByPkDocument = gql`
    mutation updateUserByPk($id: uuid!, $bio: String, $name: String!, $twitterUserName: String, $website: String) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {bio: $bio, name: $name, twitterUserName: $twitterUserName, website: $website}
  ) {
    id
  }
}
    `;
export type UpdateUserByPkMutationFn = Apollo.MutationFunction<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>;

/**
 * __useUpdateUserByPkMutation__
 *
 * To run a mutation, you first call `useUpdateUserByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByPkMutation, { data, loading, error }] = useUpdateUserByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bio: // value for 'bio'
 *      name: // value for 'name'
 *      twitterUserName: // value for 'twitterUserName'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useUpdateUserByPkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>(UpdateUserByPkDocument, options);
      }
export type UpdateUserByPkMutationHookResult = ReturnType<typeof useUpdateUserByPkMutation>;
export type UpdateUserByPkMutationResult = Apollo.MutationResult<UpdateUserByPkMutation>;
export type UpdateUserByPkMutationOptions = Apollo.BaseMutationOptions<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>;
export const UpdateUserFieldsDocument = gql`
    mutation updateUserFields($id: uuid!, $email: String!, $name: String!, $username: String!) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {email: $email, name: $name, username: $username}
  ) {
    id
  }
}
    `;
export type UpdateUserFieldsMutationFn = Apollo.MutationFunction<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>;

/**
 * __useUpdateUserFieldsMutation__
 *
 * To run a mutation, you first call `useUpdateUserFieldsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserFieldsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserFieldsMutation, { data, loading, error }] = useUpdateUserFieldsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserFieldsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>(UpdateUserFieldsDocument, options);
      }
export type UpdateUserFieldsMutationHookResult = ReturnType<typeof useUpdateUserFieldsMutation>;
export type UpdateUserFieldsMutationResult = Apollo.MutationResult<UpdateUserFieldsMutation>;
export type UpdateUserFieldsMutationOptions = Apollo.BaseMutationOptions<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>;
export const UserDashboardProjectsDocument = gql`
    query userDashboardProjects($id: uuid!) {
  userByPk(id: $id) {
    id
    projects {
      id
      name
      domain
      createdAt
      pages {
        id
        title
        url
      }
    }
  }
}
    `;

/**
 * __useUserDashboardProjectsQuery__
 *
 * To run a query within a React component, call `useUserDashboardProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDashboardProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDashboardProjectsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserDashboardProjectsQuery(baseOptions: Apollo.QueryHookOptions<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>(UserDashboardProjectsDocument, options);
      }
export function useUserDashboardProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>(UserDashboardProjectsDocument, options);
        }
export type UserDashboardProjectsQueryHookResult = ReturnType<typeof useUserDashboardProjectsQuery>;
export type UserDashboardProjectsLazyQueryHookResult = ReturnType<typeof useUserDashboardProjectsLazyQuery>;
export type UserDashboardProjectsQueryResult = Apollo.QueryResult<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>;