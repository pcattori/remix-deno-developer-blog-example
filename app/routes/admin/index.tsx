import { React } from '../../deps.ts'
import { Link } from "https://esm.sh/@remix-run/react?pin=v68";

export default function AdminIndex() {
  return (
    <p>
      <Link to="new">Create a New Post</Link>
    </p>
  );
}