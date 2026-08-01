const { app, BrowserWindow } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const http = require("http");

let mainWindow;
let serverProcess;

const isDev = !app.isPackaged;

// Fixed to match the dev port: the backend's CORS is locked to a single
// origin with credentials enabled (see dream-chat-server/src/app.ts), so the
// packaged app's origin must be identical to the one used in `npm run dev`
// or the browser will refuse to send/accept the auth cookie on login.
const SERVER_PORT = 3000;

function waitForServer(port) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 30000;
    const tryOnce = () => {
      const req = http.get({ host: "localhost", port, path: "/" }, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() > deadline) {
          reject(new Error("Timed out waiting for Next.js server to start"));
        } else {
          setTimeout(tryOnce, 300);
        }
      });
    };
    tryOnce();
  });
}

async function startNextServer() {
  const serverEntry = path.join(process.resourcesPath, "app", "server.js");

  serverProcess = fork(serverEntry, [], {
    cwd: path.dirname(serverEntry),
    env: {
      ...process.env,
      PORT: String(SERVER_PORT),
      HOSTNAME: "localhost",
      NODE_ENV: "production",
    },
    stdio: "inherit",
  });

  await waitForServer(SERVER_PORT);
  return `http://localhost:${SERVER_PORT}`;
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    // In packaged builds the icon is already embedded in the .exe via the
    // electron-builder "win.icon" config; this only matters for `npm run dev`,
    // where build-resources/ sits next to the project instead of the packaged app.
    ...(isDev && {
      icon: path.join(__dirname, "..", "build-resources", "icon.ico"),
    }),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const url = isDev
    ? process.env.ELECTRON_START_URL || "http://localhost:3000"
    : await startNextServer();

  mainWindow.loadURL(url);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
