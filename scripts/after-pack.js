// electron-builder's own icon-embedding step (rcedit via signAndEditExecutable)
// requires downloading and extracting the "winCodeSign" vendor package, which
// on Windows needs symlink privileges (Developer Mode or an elevated shell).
// To avoid that requirement entirely, we set signAndEditExecutable: false in
// package.json's "build" config and do the icon embedding ourselves here with
// resedit — a pure-JS PE resource editor with no native binaries or special
// privileges involved.
const fs = require("fs");
const path = require("path");
const ResEdit = require("resedit");

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== "win32") {
    return;
  }

  const exePath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.exe`);
  const iconPath = path.join(__dirname, "..", "build-resources", "icon.ico");

  const exeData = fs.readFileSync(exePath);
  const exe = ResEdit.NtExecutable.from(exeData);
  const res = ResEdit.NtExecutableResource.from(exe);

  const iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(iconPath));
  const iconGroups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
  for (const group of iconGroups) {
    ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
      res.entries,
      group.id,
      group.lang,
      iconFile.icons.map((icon) => icon.data)
    );
  }

  const versionInfoList = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
  const appInfo = context.packager.appInfo;
  for (const versionInfo of versionInfoList) {
    versionInfo.setStringValues(
      { lang: 1033, codepage: 1200 },
      {
        ProductName: appInfo.productName,
        FileDescription: appInfo.productName,
        CompanyName: appInfo.companyName || appInfo.productName,
        LegalCopyright: appInfo.copyright,
      }
    );
    versionInfo.outputToResourceEntries(res.entries);
  }

  res.outputResource(exe);
  fs.writeFileSync(exePath, Buffer.from(exe.generate()));

  console.log(`afterPack: embedded custom icon into ${exePath}`);
};
