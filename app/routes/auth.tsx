import type { Route } from "./+types/auth";
import { redirect } from "react-router";

export async function loader({ request, context }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const provider = url.searchParams.get("provider");
    const siteId = url.searchParams.get("site_id");
    const scope = (url.searchParams.get("scope") || "repo,user").replace(",use", ",user"); // Fix common typo

    if (provider !== "github") {
        return new Response("Unsupported provider", { status: 400 });
    }

    // Use current site URL as base for callback if not provided
    const baseUrl = new URL(request.url).origin;
    const redirectUri = `${baseUrl}/callback`;

    // We need to pass the site_id through the OAuth flow using the 'state' parameter
    const state = siteId || "";

    // Access environment variables from Cloudflare context
    const env = (context as any).cloudflare?.env || (globalThis as any);
    const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;

    if (!GITHUB_CLIENT_ID) {
        return new Response("GITHUB_CLIENT_ID not configured", { status: 500 });
    }

    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", GITHUB_CLIENT_ID || "");
    githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
    githubAuthUrl.searchParams.set("scope", scope);
    githubAuthUrl.searchParams.set("state", state);

    return redirect(githubAuthUrl.toString());
}
