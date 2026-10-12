// Adds the Android permissions the beacon needs (location, foreground service, mic, notifications).
const fs = require("fs");
const path = "android/app/src/main/AndroidManifest.xml";
let xml = fs.readFileSync(path, "utf8");

const perms = [
  "android.permission.INTERNET",
  "android.permission.ACCESS_NETWORK_STATE",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_LOCATION",
  "android.permission.FOREGROUND_SERVICE_MICROPHONE",
  "android.permission.RECORD_AUDIO",
  "android.permission.MODIFY_AUDIO_SETTINGS",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.WAKE_LOCK"
];

const missing = perms.filter(p => !xml.includes(`android:name="${p}"`));
const lines = missing.map(p => `    <uses-permission android:name="${p}" />`).join("\n");

if (lines) {
  xml = xml.replace("</manifest>", lines + "\n</manifest>");
  fs.writeFileSync(path, xml);
}
console.log("Added permissions:", missing.length ? missing.join(", ") : "none (already present)");
