import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { Heading, Text } from '../../components';
import { trpcClient } from '../../utilities';

export type SiteIndexProps = {
  id: string;
};

export function SiteIndex({ id }: SiteIndexProps): JSX.Element {
  const { data } = trpcClient.site.byId.useQuery(id);
  return (
    <SiteLayout title={`Posts for site ${data?.name}`}>
      <div>
        <Heading as="h1">{`Posts for site ${data?.name}`}</Heading>
        <Text>{data?.subdomain}</Text>
      </div>
      <section>
        <ul>
          {data?.posts.length || 0 > 0 ? (
            data?.posts.map((post) => (
              <li key={post.id}>
                <a href={`${data?.subdomain}/post/${post.slug}`}>
                  {post.title}
                </a>
              </li>
            ))
          ) : (
            <div>No posts yet</div>
          )}
        </ul>
      </section>
    </SiteLayout>
  );
}
