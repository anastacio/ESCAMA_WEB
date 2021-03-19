const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

aws.config.setPromisesDependency();

aws.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

module.exports = s3;
