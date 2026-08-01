// Next.js "standalone" output does not include the /public folder or
// .next/static assets — copy them in so the bundled server can serve them.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standaloneDir = path.join(root, ".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  console.error('.next/standalone not found. Run "next build" first.');
  process.exit(1);
}

fs.cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), {
  recursive: true,
});

fs.cpSync(
  path.join(root, ".next", "static"),
  path.join(standaloneDir, ".next", "static"),
  { recursive: true }
);

console.log("Copied public/ and .next/static into .next/standalone");
