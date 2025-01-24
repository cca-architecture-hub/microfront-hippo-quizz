// nodejs
var execSync = require("child_process").execSync;
const packageInfo = require("./package.json");
const fs = require("node:fs");
try {
  const name_package = packageInfo.author
    ? `${packageInfo.author}-${packageInfo.name}`
    : packageInfo.name;
  console.log(`Creating bucket ${name_package}`);
  execSync(
    `aws s3api create-bucket --bucket ${name_package} --region eu-west-3 --create-bucket-configuration LocationConstraint=eu-west-3 --output text`
  );
  console.log("Activating website bucket");
  execSync(
    `aws s3 website s3://${name_package} --index-document index.html --error-document index.html`
  );
  execSync(
    `aws s3api put-public-access-block --bucket ${name_package}  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false`
  );

  const content = `{
    "Version":"2012-10-17",
    "Statement":[{
        "Sid":"PublicReadGetObject",
        "Effect":"Allow",
        "Principal":"*",
        "Action":["s3:GetObject"],
        "Resource":["arn:aws:s3:::${name_package}/*"]
    }]
}`;
  try {
    console.log("Creating bucket policy");
    fs.writeFileSync("policy.json", content);
    execSync(
      `aws s3api put-bucket-policy --bucket ${name_package}  --policy file://policy.json`
    );
  } catch (err) {
    console.error("Error creating custom policy.json");
    console.error(err);
  }
  console.log("Sync content");
  execSync(`aws s3 sync dist s3://${name_package}`);
} catch (err) {
  console.error("Error creating executing code.");
  console.error(err);
}

console.log("Everything done");
