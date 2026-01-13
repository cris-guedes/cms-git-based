export interface Env {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    ASSETS: any;
}

export default {
    async fetch(request: any, env: any): Promise<Response> {
        const url = new URL(request.url);

        // 1. Handle OAuth Initiation
        if (url.pathname === "/auth") {
            const provider = url.searchParams.get("provider");
            const siteId = url.searchParams.get("site_id");
            const scope = (url.searchParams.get("scope") || "repo,user").replace(",use", ",user");

            if (provider !== "github") {
                return new Response("Unsupported provider", { status: 400 });
            }

            const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
            if (!GITHUB_CLIENT_ID) {
                return new Response("GITHUB_CLIENT_ID not configured", { status: 500 });
            }

            const redirectUri = `${url.origin}/callback`;
            const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
            githubAuthUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
            githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
            githubAuthUrl.searchParams.set("scope", scope);
            githubAuthUrl.searchParams.set("state", siteId || "");

            return Response.redirect(githubAuthUrl.toString(), 302);
        }

        // 2. Handle OAuth Callback
        if (url.pathname === "/callback") {
            const code = url.searchParams.get("code");
            const state = url.searchParams.get("state");

            if (!code) {
                return new Response("Missing code", { status: 400 });
            }

            const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
            const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

            if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
                return new Response("GitHub App not configured on server", { status: 500 });
            }

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

            const content = `
        <!DOCTYPE html>
        <html>
        <head><title>Authenticating...</title></head>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                if (e.data === "authorizing:${provider}") {
                  window.opener.postMessage(
                    "authorization:${provider}:success:${JSON.stringify({
                token: accessToken,
                provider: provider
            }).replace(/"/g, '\\"')}",
                    e.origin
                  );
                }
              }
              const accessToken = "${accessToken}";
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

        // 3. Serve Static Assets for everything else
        // Fetch from assets binding if available, otherwise return 404
        return env.ASSETS.fetch(request);
    },
};
