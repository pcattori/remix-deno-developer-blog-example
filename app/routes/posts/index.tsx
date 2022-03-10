import { React } from "../../deps.ts"
import { Link, useLoaderData } from "https://esm.sh/@remix-run/react?pin=v68";
import { json } from "https://esm.sh/@remix-run/server-runtime?pin=v68";

import { getPosts } from "../../post.ts"
import type { Post } from "../../post.ts";

export const loader = async () => {
  return json(await getPosts())
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}