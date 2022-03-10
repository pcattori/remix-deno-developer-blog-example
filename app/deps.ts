/*
 * Singletons like `react` will cause errors if more than one copy is present.
 * To ensure only one copy of each singleton is loaded, use `deps.ts` (https://deno.land/manual@v1.19.3/examples/manage_dependencies).
*/
export { default as React } from "https://esm.sh/react@17.0.2?pin=v68";
export { default as ReactDOM } from "https://esm.sh/react-dom@17.0.2?pin=v68";
export { default as ReactDOMServer } from "https://esm.sh/react-dom@17.0.2/server?pin=v68";