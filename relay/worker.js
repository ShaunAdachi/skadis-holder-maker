// Tool Holder Maker — photo relay (Cloudflare Worker + R2)
// The phone uploads one photo under a random session id; the PC page polls the same id,
// downloads the photo once, and the object is deleted. Nothing is kept longer than TTL_MIN.
//
// Bindings (Workers dashboard → Settings → Bindings / Variables):
//   RELAY           R2 bucket binding
//   ALLOWED_ORIGIN  e.g. "https://shaunadachi.github.io"  (comma-separated list allowed)

const TTL_MIN = 15;                       // uploads older than this are discarded
const MAX_BYTES = 25 * 1024 * 1024;       // 25 MB per photo
const SID = /^[A-Za-z0-9_-]{22,64}$/;     // random, unguessable session ids only
const TYPES = ["image/jpeg", "image/png", "image/webp"];

function cors(req, env) {
  const allowed = (env.ALLOWED_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
  const origin = req.headers.get("Origin") || "";
  const ok = allowed.includes(origin);
  return {
    ok,
    headers: ok ? {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "600",
      "Vary": "Origin",
    } : { "Vary": "Origin" },
  };
}
const reply = (status, body, headers = {}) => new Response(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const c = cors(req, env);
    if (req.method === "OPTIONS") return reply(c.ok ? 204 : 403, null, c.headers);
    if (url.pathname === "/health") return reply(200, "ok", { ...c.headers, "Content-Type": "text/plain" });
    if (!c.ok) return reply(403, "origin not allowed", c.headers);

    const m = url.pathname.match(/^\/s\/([^/]+)$/);
    if (!m || !SID.test(m[1])) return reply(404, "not found", c.headers);
    const key = "s/" + m[1];

    if (req.method === "PUT") {
      const type = (req.headers.get("Content-Type") || "").split(";")[0].trim();
      if (!TYPES.includes(type)) return reply(415, "image/jpeg, image/png or image/webp only", c.headers);
      const len = +req.headers.get("Content-Length") || 0;
      if (len > MAX_BYTES) return reply(413, "too large", c.headers);
      const buf = await req.arrayBuffer();
      if (buf.byteLength === 0) return reply(400, "empty", c.headers);
      if (buf.byteLength > MAX_BYTES) return reply(413, "too large", c.headers);
      await env.RELAY.put(key, buf, { httpMetadata: { contentType: type }, customMetadata: { ts: String(Date.now()) } });
      return reply(201, "stored", c.headers);
    }

    if (req.method === "GET") {
      const obj = await env.RELAY.get(key);
      if (!obj) return reply(204, null, c.headers);                       // nothing yet: keep polling
      const age = Date.now() - Number(obj.customMetadata?.ts || 0);
      if (age > TTL_MIN * 60 * 1000) { await env.RELAY.delete(key); return reply(410, "expired", c.headers); }
      const body = await obj.arrayBuffer();
      await env.RELAY.delete(key);                                         // one-time pickup
      return reply(200, body, { ...c.headers, "Content-Type": obj.httpMetadata?.contentType || "image/jpeg" });
    }
    return reply(405, "method not allowed", c.headers);
  },
};
