import type { Route } from "./+types/callback";

export async function loader({ request, context }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state"); // This is our site_id

    if (!code) {
        return new Response("Missing code", { status: 400 });
    }

    // Access environment variables
    // In React Router v7 on Cloudflare, env is typically in context.cloudflare.env
    const env = (context as any).cloudflare?.env || (globalThis as any);
    const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        return new Response("GitHub App not configured on server", { status: 500 });
    }

    // Exchange code for access token
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code,
        }),
    });

    const data: any = await response.json();

    if (data.error) {
        return new Response(data.error_description || data.error, { status: 400 });
    }

    const accessToken = data.access_token;
    const provider = "github";

    // The CMS expects a script that calls window.opener.postMessage with the result
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Authenticating...</title>
    </head>
    <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Receiving message:", e.data);
            if (e.data === "authorizing:${provider}") {
              window.opener.postMessage(
                "authorization:${provider}:success:${JSON.stringify({
        token: "${accessToken}",
        provider: "${provider}"
    })}",
                e.origin
              );
            }
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:${provider}", "*");
        })()
      </script>
    </body>
    </html>
  `;

    return new Response(content, {
        headers: { "Content-Type": "text/html" },
    });
}
