import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Email: any;
  PhoneNumber: any;
};

export type AddCommentInput = {
  authorId: Scalars['ID'];
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type AddPostInput = {
  authorId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type AddUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  roles: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  id: Scalars['ID'];
  post: Post;
  text: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  eventType: Scalars['String'];
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addPost: Post;
  addUser: Scalars['ID'];
  login: Scalars['String'];
};


export type MutationAddCommentArgs = {
  addCommentInput?: InputMaybe<AddCommentInput>;
};


export type MutationAddPostArgs = {
  addPostInput: AddPostInput;
};


export type MutationAddUserArgs = {
  addUserInput: AddUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  comments: Array<Comment>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  getEvent: Event;
  getPosts: Array<Post>;
  getRandomNumbers: Array<Scalars['Int']>;
  getUsers: Array<User>;
  greet: Scalars['String'];
  helloworld?: Maybe<Scalars['String']>;
  recentPosts: Array<Post>;
  test: Scalars['String'];
  validationCheck?: Maybe<Scalars['String']>;
};


export type QueryGetCommentsArgs = {
  page: Scalars['Int'];
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};


export type QueryGreetArgs = {
  name: Scalars['String'];
};


export type QueryRecentPostsArgs = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};


export type QueryTestArgs = {
  bornAt?: InputMaybe<Scalars['DateTime']>;
  date?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['Email']>;
  phoneNumber: Scalars['PhoneNumber'];
};


export type QueryValidationCheckArgs = {
  email?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  totalPost: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', helloworld?: string | null };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: string, title: string, description?: string | null, comments: Array<{ __typename?: 'Comment', id: string, text: string, author: { __typename?: 'User', id: string, name: string } }>, author?: { __typename?: 'User', id: string, name: string } | null }> };


export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloworld
}
    `;

/**
 * __useHelloWorldQuery__
 *
 * To run a query within a React component, call `useHelloWorldQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloWorldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWorldQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloWorldQuery(baseOptions?: Apollo.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
      }
export function useHelloWorldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
        }
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<typeof useHelloWorldLazyQuery>;
export type HelloWorldQueryResult = Apollo.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;
export const GetPostsDocument = gql`
    query getPosts {
  getPosts {
    id
    title
    description
    comments {
      id
      text
      author {
        id
        name
      }
    }
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;