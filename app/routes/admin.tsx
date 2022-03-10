import { React } from "../deps.ts"
import { Link, Outlet, useLoaderData } from "https://esm.sh/@remix-run/react?pin=v68";
import { json } from "https://esm.sh/@remix-run/server-runtime?pin=v68";

import { getPosts } from "../post.ts";
import type { Post } from "../post.ts";
import adminStyles from "../styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async () => {
  return json(await getPosts());
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}