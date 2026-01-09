import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("home2", "routes/home2.tsx"),
  route("galeria", "routes/galeria.tsx"),
  route("sobre", "routes/sobre.tsx"),
  route("contato", "routes/contato.tsx"),
] satisfies RouteConfig;
