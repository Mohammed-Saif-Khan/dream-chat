// Builds the Electron/NSIS branding assets from the app's own logo so the
// desktop app icon and installer artwork stay in sync with the web favicon
// instead of drifting as separate, hand-maintained files.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default;

const root = path.join(__dirname, "..");
const outDir = path.join(root, "build-resources");
const sourceLogo = path.join(root, "src", "assets", "auth", "logo.png");

const SIDEBAR_BACKGROUND = { r: 0xff, g: 0xff, b: 0xff, alpha: 1 };
const ICON_SIZES = [16, 24, 32, 48, 64, 128, 256];
const SIDEBAR_WIDTH = 164;
const SIDEBAR_HEIGHT = 314;

function writeBmp(rgbaBuffer, width, height) {
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;
  const buf = Buffer.alloc(fileSize);

  buf.write("BM", 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(54, 10); // pixel data offset
  buf.writeUInt32LE(40, 14); // DIB header size
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(height, 22);
  buf.writeUInt16LE(1, 26); // planes
  buf.writeUInt16LE(24, 28); // bits per pixel
  buf.writeUInt32LE(0, 30); // no compression
  buf.writeUInt32LE(pixelArraySize, 34);

  // BMP rows are stored bottom-to-top, BGR order, padded to 4 bytes.
  for (let y = 0; y < height; y++) {
    const srcRow = height - 1 - y;
    const rowOffset = 54 + y * rowSize;
    for (let x = 0; x < width; x++) {
      const srcIdx = (srcRow * width + x) * 4;
      const dstIdx = rowOffset + x * 3;
      buf[dstIdx] = rgbaBuffer[srcIdx + 2]; // B
      buf[dstIdx + 1] = rgbaBuffer[srcIdx + 1]; // G
      buf[dstIdx + 2] = rgbaBuffer[srcIdx]; // R
    }
  }

  return buf;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const squareSize = 512;
  const squareLogo = await sharp(sourceLogo)
    .resize(Math.round(squareSize * 0.82), Math.round(squareSize * 0.82), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: Math.round(squareSize * 0.09),
      bottom: Math.round(squareSize * 0.09),
      left: Math.round(squareSize * 0.09),
      right: Math.round(squareSize * 0.09),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const pngBuffers = await Promise.all(
    ICON_SIZES.map((size) => sharp(squareLogo).resize(size, size).png().toBuffer())
  );
  const icoBuffer = await pngToIco(pngBuffers);
  fs.writeFileSync(path.join(outDir, "icon.ico"), icoBuffer);

  const sidebarRgba = await sharp({
    create: {
      width: SIDEBAR_WIDTH,
      height: SIDEBAR_HEIGHT,
      channels: 4,
      background: SIDEBAR_BACKGROUND,
    },
  })
    .composite([
      {
        input: await sharp(squareLogo).resize(120, 120).png().toBuffer(),
        top: Math.round((SIDEBAR_HEIGHT - 120) / 2),
        left: Math.round((SIDEBAR_WIDTH - 120) / 2),
      },
    ])
    .ensureAlpha()
    .raw()
    .toBuffer();

  const sidebarBmp = writeBmp(sidebarRgba, SIDEBAR_WIDTH, SIDEBAR_HEIGHT);
  fs.writeFileSync(path.join(outDir, "installerSidebar.bmp"), sidebarBmp);
  fs.writeFileSync(path.join(outDir, "uninstallerSidebar.bmp"), sidebarBmp);

  console.log("Generated build-resources/icon.ico and installer sidebar images");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
