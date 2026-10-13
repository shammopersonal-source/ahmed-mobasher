// Review screenshots through Chrome's DevTools protocol (no dependencies).
// usage: node scripts/shoot.mjs <url> <out.png> <width> <height> <dpr> [--mobile] [--reduced-motion] [--no-js] [--scroll=0.5] [--to=elementId] [--by=px] [--wait=ms] [--clip=x,y,w,h]
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, width, height, dpr, ...flags] = process.argv.slice(2);
const flag = (name) => flags.find((f) => f === `--${name}` || f.startsWith(`--${name}=`))?.split("=")[1] ?? (flags.includes(`--${name}`) ? true : undefined);
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "shoot-"))}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  target = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).then((t) => t.find((x) => x.type === "page")).catch(() => undefined);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result ?? msg.error);
};
const send = (method, params = {}) => new Promise((r) => (pending.set(++id, r), ws.send(JSON.stringify({ id, method, params }))));

await send("Emulation.setDeviceMetricsOverride", { width: +width, height: +height, deviceScaleFactor: +dpr, mobile: !!flag("mobile") });
if (flag("mobile")) await send("Emulation.setTouchEmulationEnabled", { enabled: true });
if (flag("reduced-motion")) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
if (flag("no-js")) await send("Emulation.setScriptExecutionDisabled", { value: true });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(+(flag("wait") ?? 3500));
if (flag("scroll")) {
  await send("Runtime.evaluate", { expression: `window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*${+flag("scroll")},behavior:"instant"})` });
  await sleep(+(flag("settle") ?? 500));
}
if (flag("to")) {
  await send("Runtime.evaluate", { expression: `document.getElementById(${JSON.stringify(flag("to"))}).scrollIntoView({behavior:"instant",block:"start"}); window.scrollBy({top:${+(flag("by") ?? 0)},behavior:"instant"})` });
  await sleep(+(flag("settle") ?? 500));
}
const clip = flag("clip")?.split(",").map(Number);
const shot = await send("Page.captureScreenshot", { format: "png", ...(clip ? { clip: { x: clip[0], y: clip[1], width: clip[2], height: clip[3], scale: 1 } } : {}) });
writeFileSync(out, Buffer.from(shot.data, "base64"));
ws.close();
chrome.kill();
console.log("wrote", out);
