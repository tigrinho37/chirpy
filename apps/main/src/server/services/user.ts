import { Profile as AuthProfile } from 'next-auth';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { UpdateUserByPkDocument } from '@chirpy/server-graphql/generated/user';

export async function fillUserFields(
  user: User,
  profile?: GitHubProfile,
  provider?: Provider,
): Promise<void> {
  if ((user.username && user.bio && user.website && user.twitterUserName) || !provider) {
    return;
  }
  try {
    const fields = translatorMap[provider]?.(profile);
    if (!fields) {
      return;
    }
    const client = getAdminGqlClient();
    await client
      .mutation(UpdateUserByPkDocument, {
        id: user.id,
        ...fields,
      })
      .toPromise();
    return;
  } catch (error) {
    console.log('fill user fields failed', error);
    return;
  }
}

const translatorMap: Record<Provider, typeof translateGithubProfile> = {
  github: translateGithubProfile,
};

function translateGithubProfile(profile?: GitHubProfile) {
  if (!profile || (!profile.login && !profile.bio && !profile.blog && !profile.twitter_username)) {
    return null;
  }
  return {
    username: profile.login,
    website: profile.blog,
    bio: profile.bio,
    twitterUserName: profile.twitter_username,
  };
}

type User = {
  name: string;
  username: string;
  image: string;
  email: string | null;
  emailVerified: boolean | null;
  id: string;
  bio: string;
  website: string;
  twitterUserName: string;
};

interface GitHubProfile extends AuthProfile {
  login: string;
  blog: string;
  bio: string;
  twitter_username: string;
}

type Provider = 'github';
