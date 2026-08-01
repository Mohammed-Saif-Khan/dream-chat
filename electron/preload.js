// Intentionally empty: renderer runs the normal Next.js client bundle
// with no need for privileged Node/Electron APIs today. Kept as the
// designated bridge file so future contextBridge.exposeInMainWorld
// calls have a home without touching main.js's webPreferences.
