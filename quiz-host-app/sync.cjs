// nodejs
var execSync = require("child_process").execSync;
const packageInfo = require("./package.json");

try {
  const name_package = packageInfo.author
    ? `${packageInfo.author}-${packageInfo.name}`
    : packageInfo.name;

  console.log("Sync content");
  execSync(`aws s3 sync dist s3://${name_package}`);
} catch (err) {
  console.error("Error syncing code.");
  console.error(err);
}

console.log("Everything done");
