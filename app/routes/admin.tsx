import type { Route } from "./+types/admin";

export function loader() {
  // Redireciona para o index.html do admin
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/admin/index.html",
    },
  });
}

export default function Admin() {
  return null;
}
