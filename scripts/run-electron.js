// Some shells (notably terminals spawned by Electron-based tooling, e.g. VS Code
// extensions) leak ELECTRON_RUN_AS_NODE into the environment. If that variable is
// merely *present* — even set to an empty string — Electron boots as plain Node
// instead of launching the app, and `require("electron")` in main.js resolves to
// a path string rather than the { app, BrowserWindow } module. Deleting the key
// (not just blanking it) before spawning is the only reliable fix.
const { spawn } = require("child_process");
const electronPath = require("electron");

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronPath, ["."], { stdio: "inherit", env });

child.on("exit", (code) => process.exit(code ?? 0));
