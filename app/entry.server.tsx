import { React, ReactDOMServer } from "./deps.ts";
import { RemixServer } from "https://esm.sh/@remix-run/react?pin=v68";
import type { EntryContext } from "https://esm.sh/@remix-run/server-runtime?pin=v68";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
