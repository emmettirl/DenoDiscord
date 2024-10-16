export function startRedirectServer() {

    Deno.serve(async (req) => {
        console.log("Method:", req.method);

        const url = new URL(req.url);
        console.log("Path:", url.pathname);
        console.log("Query parameters:", url.searchParams);
        console.log("Code parameter:", url.searchParams.get("code"));

        console.log("Headers:", req.headers);

        if (req.body) {
            const body = await req.text();
            console.log("Body:", body);
        }

        return new Response("Thanks for logging in, you can now use DenoDiscord with youtube", {
            status: 200,
            headers: {
                "content-type": "text/plain; charset=utf-8",
            },
        });
    });
}