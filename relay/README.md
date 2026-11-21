# Photo relay (Cloudflare Worker + R2)

Passes one photo from the phone capture page to the PC page.

- `PUT /s/{session}` — phone uploads a JPEG/PNG/WebP (max 25 MB).
- `GET /s/{session}` — PC polls; `204` until the photo arrives, then `200` with the photo, which is deleted at once.
- Photos older than 15 minutes are discarded; an R2 lifecycle rule removes anything left after 1 day.
- Only requests from `ALLOWED_ORIGIN` are accepted. Session ids are random (≥ 22 characters).

## Setup (dashboard)
1. R2 → enable R2 (a payment method may be requested; usage here stays within the free tier).
2. R2 → Create bucket `tool-holder-relay` → Settings → Object lifecycle rules → Add rule: delete objects 1 day after upload.
3. Workers & Pages → Create → Worker → name `tool-holder-relay` → Deploy → Edit code → paste `worker.js` → Deploy.
4. Worker → Settings → Bindings → Add → R2 bucket: variable name `RELAY`, bucket `tool-holder-relay`.
5. Worker → Settings → Variables and Secrets → Add text variable `ALLOWED_ORIGIN` = `https://shaunadachi.github.io`.
6. Open `https://tool-holder-relay.<your-subdomain>.workers.dev/health` → should show `ok`.

`wrangler.toml` is included for CLI deploys (`npx wrangler deploy`).
