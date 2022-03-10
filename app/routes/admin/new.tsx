import { React } from '../../deps.ts'
import { Form, useActionData, useTransition } from "https://esm.sh/@remix-run/react?pin=v68";
import { json, redirect } from "https://esm.sh/@remix-run/server-runtime?pin=v68";
import type { ActionFunction } from "https://esm.sh/@remix-run/server-runtime?pin=v68";
import invariant from "https://esm.sh/tiny-invariant";
import { createPost } from '../../post.ts'

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  // await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return json(errors);
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();
  return (
    <Form method="post">
      <p>
        Post Title:{" "}
        {errors?.title ? (
          <em>Title is required</em>
        ) : null}
        <input type="text" name="title" />
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? (
          <em>Markdown is required</em>
        ) : null}
        <br />
        <textarea id="markdown" rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission
            ? "Creating..."
            : "Create Post"}
        </button>
      </p>
    </Form>
  );
}