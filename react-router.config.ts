import type { Config } from "@react-router/dev/config";

export default {
  buildDirectory: "dist",
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    return ["/", "/home2", "/galeria", "/sobre", "/contato"];
  },
} satisfies Config;
