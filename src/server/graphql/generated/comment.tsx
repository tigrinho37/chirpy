import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from './types';

export type CommentContentFragment = {
  __typename?: 'Comment';
  id: string;
  content: any;
  createdAt: string;
  deletedAt?: string | null | undefined;
  parentId?: string | null | undefined;
  pageId: string;
  user: {
    __typename?: 'User';
    id: string;
    name?: string | null | undefined;
    avatar?: string | null | undefined;
  };
  likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
};

export type CommentsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CommentsQuery = {
  __typename?: 'query_root';
  comments: Array<{ __typename?: 'Comment'; id: string }>;
};

export type CommentListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CommentListQuery = {
  __typename?: 'query_root';
  comments: Array<{
    __typename?: 'Comment';
    id: string;
    content: any;
    createdAt: string;
    deletedAt?: string | null | undefined;
    parentId?: string | null | undefined;
    pageId: string;
    replies: Array<{
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null | undefined;
      parentId?: string | null | undefined;
      pageId: string;
      replies: Array<{
        __typename?: 'Comment';
        id: string;
        content: any;
        createdAt: string;
        deletedAt?: string | null | undefined;
        parentId?: string | null | undefined;
        pageId: string;
        user: {
          __typename?: 'User';
          id: string;
          name?: string | null | undefined;
          avatar?: string | null | undefined;
        };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      }>;
      user: {
        __typename?: 'User';
        id: string;
        name?: string | null | undefined;
        avatar?: string | null | undefined;
      };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null | undefined;
      avatar?: string | null | undefined;
    };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  }>;
};

export const CommentContentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'commentContent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pageId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'likes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CommentContentFragment, unknown>;
export const CommentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'comments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const CommentListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'commentList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'commentContent' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'likes_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'count' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'commentContent' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'likes_aggregate' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'count' },
                                        value: { kind: 'EnumValue', value: 'desc' },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'createdAt' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'commentContent' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...CommentContentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CommentListQuery, CommentListQueryVariables>;
