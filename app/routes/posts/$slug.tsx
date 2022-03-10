import { React } from '../../deps.ts'
import { useLoaderData } from "https://esm.sh/@remix-run/react?pin=v68";
import { json } from "https://esm.sh/@remix-run/server-runtime?pin=v68";
import type { LoaderFunction } from "https://esm.sh/@remix-run/server-runtime?pin=v68";
import invariant from "https://esm.sh/tiny-invariant";
import { getPost } from '../../post.ts'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return json(await getPost(params.slug));
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <main dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}